import React, {
  createContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Section from "../Section";
import { useController } from "../hooks";
import styled from "styled-components";
import { produce } from "immer";
import { debounce } from "lodash";
import useAutoResize from "../../shared/useAutoResize";

export const DataContext = createContext(null);

function Grid(
  {
    children,
    layout,
    onChange,
    maxCols = 10,
    minWidth = 100,
    breakpoint = 768,
    editing = false,
  },
  ref
) {
  const [data, setData] = useState(layout);

  const [sectionId, setSectionId] = useState(null);
  const [colId, setColId] = useState(null);
  const [colOver, setColOver] = useState(null);
  const [resizing, setResizing] = useState(false);
  const containerRef = useRef(null);
  const [leftGap, setLeftGap] = useState(0);
  const [rulers, setRulers] = useState([]);
  const [totalWidth, setTotalWidth] = useState(0);
  const { addRow } = useController(data, setData, maxCols);

  useEffect(() => {
    if (containerRef.current) {
      setTotalWidth(containerRef.current.offsetWidth);
    }

    window.addEventListener("resize", () => {
      if (containerRef.current) {
        setTotalWidth(containerRef.current.offsetWidth);
      }
    });
  }, [containerRef.current]);

  useAutoResize(containerRef, setTotalWidth);

  useImperativeHandle(ref, () => ({
    addRow,
    calculateTotalWidth: () => {
      if (containerRef.current) {
        setTotalWidth(containerRef.current.offsetWidth);
      }
    },
  }));

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(layout)) {
      setData(produce(layout, (draft) => {}));
    }
  }, [layout]);

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data]);

  useEffect(() => {
    if (colId === null) {
      setSectionId(null);
    }
  }, [colId]);

  function updateRulers(total) {
    const result = [...Array(6).keys()]
      .slice(0, -1)
      .map((_, i) => (i + 1) * (total / 6));

    setRulers([result]);
  }

  useEffect(() => {
    updateRulers(totalWidth);
  }, [totalWidth]);

  function recomputeWidths(draft) {
    draft.forEach((row) => {
      row.columns.forEach((col) => {
        col.width = 1 / row.columns.length;
      });
    });
  }

  const reorder = (data, source, destination, type) => {
    return produce(data, (draft) => {
      if (type !== "col") {
        // exchanging section position
        const temp = draft[destination.index];

        draft[destination.index] = draft[source.index];
        draft[source.index] = temp;
      } else {
        // moving column to another section
        const sourceSectionId = source.droppableId.split("_")[1];
        const sourceSectionIndex = draft.findIndex(
          (s) => s.rowId == sourceSectionId
        );

        const destinationSectionId = destination.droppableId.split("_")[1];
        const destinationSectionIndex = draft.findIndex(
          (s) => s.rowId == destinationSectionId
        );

        const [removed] = draft[sourceSectionIndex].columns.splice(
          source.index,
          1
        );

        draft[destinationSectionIndex].columns.splice(
          destination.index,
          0,
          removed
        );

        if (draft[destinationSectionIndex].columns.length === 0) {
          draft.splice(sourceSectionIndex, 1);
        }

        recomputeWidths(draft);
      }
    });
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      const { left } = el.getBoundingClientRect();
      setLeftGap(left);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      updateRulers(containerRef.current.offsetWidth);
    }
  }, [sectionId, data]);

  const updateWidths = useCallback(() => {
    setData((prevData) => {
      return produce(prevData, (draftData) => {
        draftData.forEach((row) => {
          row.columns.forEach((col) => {
            if (!col.width) {
              col.width = 1 / row.columns.length;
            }
          });
        });
      });
    });
  }, [setData]);

  useEffect(() => {
    updateWidths();
  }, []);

  useEffect(() => {
    if (colId == null && colOver != null) {
      setColOver(null);
    }
  }, [colId, colOver]);

  const mobile = useMemo(() => {
    return window.innerWidth <= breakpoint;
  }, [breakpoint, window.innerWidth]);

  const handleOnDragEnd = useCallback(
    (e) => {
      setColOver(null);
      setColId(null);
      const { destination, source, type } = e;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "col") {
        setData((data) => {
          return reorder(data, source, destination, "col");
        });

        return;
      }

      setData((data) => {
        return reorder(data, source, destination);
      });
    },
    [setData]
  );

  const debouncedOnDragUpdate = debounce((e) => {
    if (e.type === "col" && e.destination) {
      setColOver(e.destination);
    }
  }, 500);
  return (
    <Container
      ref={containerRef}
      resizing={resizing}
      className="advise-ui-grid"
    >
      {rulers[0] &&
        rulers[0].map((r) => (
          <Ruler
            style={{ opacity: resizing ? 1 : 0, zIndex: 3 }}
            key={r}
            x={r || 0}
          />
        ))}
      <DataContext.Provider
        value={{
          data: data,
          setData,
          sectionId,
          colId,
          maxCols,
          minWidth,
          setColId,
          colOver,
          isResizing: resizing,
          setResizing,
          cell: children,
          editing,
          totalWidth,
          leftGap,
          snapPoints: rulers[0],
        }}
      >
        <DragDropContext
          onDragStart={(e) => {
            setSectionId(e.draggableId);

            if (e.type === "col") {
              // const id = e.draggableId.split("_")[0];
              // setDroppableRowId(e.draggableId);
              setColId(e.draggableId);
            }
          }}
          onBeforeDragStart={(e) => {
            setColId(e.draggableId);
          }}
          onDragUpdate={debouncedOnDragUpdate}
          onDragEnd={handleOnDragEnd}
        >
          <Droppable droppableId={"advise-grid"} type="advise-grid">
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {data.map((row, rowIndex) => {
                  return (
                    <div
                      style={{ position: "relative" }}
                      key={"sectioncontainer_" + row.rowId}
                    >
                      <Section
                        row={row}
                        isBeforeDragging={colId !== null}
                        widths={row.columns.map((col) => col.width)}
                        index={rowIndex}
                        breakpoint={breakpoint}
                        mobile={mobile}
                        rulers={rulers[0]}
                      />
                    </div>
                  );
                })}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DataContext.Provider>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  cursor: ${({ resizing }) => (resizing ? "col-resize" : "default")};
  /* overflow-x: hidden; */
`;

const Ruler = styled.div`
  position: absolute;
  top: 0;
  left: ${({ x }) => x}px;
  width: 0px;
  height: 100%;
  border-right: 1px solid #37a1f6;
`;

export default forwardRef(Grid);
