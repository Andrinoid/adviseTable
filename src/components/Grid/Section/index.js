import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import { Cursor, SectionElm, SectionHandle, SectionHandleItem } from "./styled";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DataContext } from "../Grid";
import Col from "../Col";
import DummyWidget from "../DummyWidget";
import Plus from "../../../icons/Plus";
import DragHandle from "../../../icons/DragHandle";
import { useSectionCRUD } from "./hooks";

function Section({
  widths,
  isBeforeDragging,
  isDragging,
  index,
  row,
  breakpoint,
}) {
  // Define a ref to store a reference to the section element.
  const sectionRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState(null);
  const [height, setHeight] = useState("initial");
  const { data, setData, droppableRowId, minWidth } = useContext(DataContext);
  const { addRow, removeRow } = useSectionCRUD(data, setData);
  // Define a state variable to store the flex factors of each column based on the number of columns
  // const [widths, updateWidths] = useState(() => initialWidths);

  function setWidths(widthsData) {
    // const row = data[index];
    row.columns = row.columns.map((col, index) => {
      col.width = widthsData[index];
      return col;
    });
    const newData = [...data];

    setData(newData);
  }

  // useLayoutEffect(() => {
  //   if (sectionRef.current) {
  //     setInitialHeight(sectionRef.current.offsetHeight);
  //   }
  // }, []);

  useLayoutEffect(() => {
    if (isBeforeDragging) {
      if (initialHeight) {
        setHeight(initialHeight);
      }
    } else {
      setHeight("initial");
      if (sectionRef.current) {
        setInitialHeight(sectionRef.current.offsetHeight);
      }
    }
  }, [isBeforeDragging]);

  // Initialize widths on component mount
  useEffect(() => {
    // Debounce function
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // If the sectionRef is defined (i.e., the component has mounted),
    // calculate the initial flex factors for each column
    function calculateWidths() {
      if (sectionRef.current) {
        const initialWidths = widths.map(() => 1 / widths.length);
        // Update the state with the new flex factors
        setWidths(initialWidths);
      }
    }

    const debouncedCalculateWidths = debounce(calculateWidths, 300);

    debouncedCalculateWidths();

    window.addEventListener("resize", debouncedCalculateWidths);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", debouncedCalculateWidths);
    };
  }, [row]);

  const onResize = (index, event, { size }) => {
    // Ensure the index is not out of range (i.e., not the last column)
    if (index < widths.length - 1) {
      // Define the minimum width of the next column as a flex factor,
      // by converting the minimum pixel width to a percentage of the section's width
      const minWidthOfNextColumn = minWidth / sectionRef.current.offsetWidth;

      // Calculate the maximum width the current column can take without forcing the next column below its minimum width
      // The calculation is based on the current combined width of this column and the next, minus the minimum width of the next column
      const maxWidth = widths[index] + widths[index + 1] - minWidthOfNextColumn;

      // Check if the new width respects this maximum width
      // Convert the new pixel width to a flex factor by dividing by the section's width
      if (size.width / sectionRef.current.offsetWidth <= maxWidth) {
        // Create a copy of the current flex factors
        const newWidths = [...widths];

        // Update the flex factor of the current column based on its new size
        newWidths[index] = size.width / sectionRef.current.offsetWidth;

        // Update the flex factor of the next column so that the sum of all flex factors always equals 1
        newWidths[index + 1] =
          widths[index] +
          widths[index + 1] -
          size.width / sectionRef.current.offsetWidth;

        // Update the state with the new flex factors
        setWidths(newWidths);
      }
    }
  };

  const columnHeight = useRef(null);
  const resizing = useRef(false);

  // the resizeable is used because we have to detect changes in the height of the row
  // that are trigged by a change in the height of the columns children provided
  // by the user(aka dumby widget)
  useEffect(() => {
    const rowElement = document.querySelector("#section-" + row.rowId);
    if (rowElement) {
      columnHeight.current = rowElement.clientHeight;

      let timeout;

      const resizeObserver = new ResizeObserver((entries) => {
        if (window) {
          const computedStyle = window.getComputedStyle(rowElement);

          const currentHeight = parseFloat(computedStyle.height);

          if (currentHeight !== columnHeight.current) {
            if (!resizing.current) {
              resizing.current = true;

              if (timeout) clearTimeout(timeout);

              timeout = setTimeout(() => {
                // setInitialHeight(currentHeight + 13);// what is the +13 for?
                setInitialHeight(currentHeight);
                resizing.current = false;
              }, 100);
            }
          }
        }
      });

      resizeObserver.observe(rowElement);
    }
  }, []);

  return (
    <Draggable draggableId={"draggable_" + row.rowId} index={index}>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
        >
          <Droppable
            droppableId={"col_" + row.rowId}
            type="col"
            direction={"horizontal"}
          >
            {(droppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                style={{ height: height }}
              >
                <SectionElm
                  id={"section-" + row.rowId}
                  ref={sectionRef}
                  style={{ position: "relative" }}
                  breakpoint={breakpoint}
                  beingDragged={
                    droppableRowId === row.rowId || droppableRowId === null
                  }
                >
                  {row.columns.map((column, colIndex) => (
                    <Col
                      key={column.columnId}
                      index={colIndex}
                      columnId={column.columnId}
                      width={column.width}
                      data={column.data}
                      rowId={row.rowId}
                      onResize={onResize}
                      sectionRef={sectionRef}
                      isLast={colIndex === row.columns.length - 1}
                      breakpoint={breakpoint}
                    >
                      {column.data.map((data, index) => {
                        const Component = data.component;
                        return Component ? <Component key={index} /> : null;
                      })}
                    </Col>
                  ))}
                  <SectionHandle>
                    <SectionHandleItem {...draggableProvided.dragHandleProps}>
                      <DragHandle />
                    </SectionHandleItem>
                    <Cursor type="pointer">
                      <SectionHandleItem
                        onClick={() => {
                          addRow(row.rowId);
                        }}
                      >
                        <Plus />
                      </SectionHandleItem>
                    </Cursor>
                    <Cursor type="pointer">
                      <SectionHandleItem
                        onClick={() => {
                          removeRow(row.rowId);
                        }}
                      >
                        <Plus style={{ transform: "rotate(45deg)" }} />
                      </SectionHandleItem>
                    </Cursor>
                  </SectionHandle>
                </SectionElm>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Section;
