import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import {
  Cursor,
  Line,
  SectionContainer,
  SectionElm,
  SectionHandle,
  SectionHandleItem,
} from "./styled";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DataContext } from "../Grid";
import Col from "../Col";
import Plus from "../../../icons/Plus";
import DragHandle from "../../../icons/DragHandle";
import { getRowId, useController } from "../hooks";

function Section({ widths, isBeforeDragging, index, row, breakpoint }) {
  const sectionRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState(null);
  const [height, setHeight] = useState("initial");
  const columnHeight = useRef(null);
  const resizing = useRef(false);
  const { colOver, data, setData, sectionId, maxCols, cell, editing } =
    useContext(DataContext);
  const { addRow, removeRow } = useController(data, setData, maxCols);

  // function setWidths(widthsData) {
  //   row.columns = row.columns.map((col, index) => {
  //     col.width = widthsData[index];
  //     return col;
  //   });
  //   const newData = [...data];

  //   setData(newData);
  // }

  useEffect(() => {
    setInitialHeight(sectionRef.current.offsetHeight);
  }, [data]);

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

  // useEffect(() => {
  // function debounce(func, wait) {
  //   let timeout;
  //   return function executedFunction(...args) {
  //     const later = () => {
  //       clearTimeout(timeout);
  //       func(...args);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //   };
  // }

  // function updateFlexFactors() {
  //   if (sectionRef.current) {
  //     const initialWidths = widths.map(() => 1 / widths.length);
  //     setWidths(initialWidths);
  //   }
  // }

  // const debouncedCalculateWidths = debounce(updateFlexFactors, 300);
  // debouncedCalculateWidths();

  // window.addEventListener("resize", debouncedCalculateWidths);

  // return () => {
  // window.removeEventListener("resize", debouncedCalculateWidths);
  // };
  // }, [row]);

  useEffect(() => {
    const rowElement = sectionRef.current;

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

  const draggableId = "draggable_" + row.rowId;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(draggableProvided) => {
        return (
          <SectionContainer
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
          >
            <Droppable
              droppableId={"section_" + row.rowId}
              type="col"
              direction={"horizontal"}
            >
              {(droppableProvided) => {
                return (
                  <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    style={{ height: height }}
                  >
                    <SectionElm
                      id={"section_" + row.rowId}
                      ref={sectionRef}
                      style={{ position: "relative" }}
                      breakpoint={breakpoint}
                      beingDragged={
                        sectionId === draggableId || sectionId === null
                      }
                      editing={editing}
                    >
                      {row.columns.map((column, colIndex) => {
                        return (
                          <Col
                            key={column.columnId}
                            index={colIndex}
                            columnId={column.columnId}
                            width={column.width}
                            data={column.data}
                            rowId={row.rowId}
                            sectionRef={sectionRef}
                            breakpoint={breakpoint}
                          >
                            {row.rowId != getRowId(sectionId) &&
                              colOver &&
                              colOver.droppableId == "section_" + row.rowId &&
                              colOver.index == colIndex && <Line />}

                            {row.rowId != getRowId(sectionId) &&
                              colOver &&
                              colOver.droppableId == "section_" + row.rowId &&
                              colOver.index == row.columns.length &&
                              colIndex + 1 == row.columns.length && (
                                <Line right />
                              )}

                            {column.data.map((data, index) => {
                              return cell(data, {
                                marginBottom:
                                  column.data.length > 1 &&
                                  index != column.data.length - 1
                                    ? 10
                                    : 0,
                              });
                            })}
                          </Col>
                        );
                      })}
                      {editing && (
                        <SectionHandle>
                          <SectionHandleItem
                            {...draggableProvided.dragHandleProps}
                          >
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
                      )}
                    </SectionElm>
                    {droppableProvided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </SectionContainer>
        );
      }}
    </Draggable>
  );
}

export default Section;
