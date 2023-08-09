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
import Resizer from "../Resizer";
import { getInitialX as getHandlersX } from "../Resizer/helpers";
import styled from "styled-components";

export const DataContext = createContext(null);

function Grid(
  { layout, onChange, maxCols = 10, minWidth = 100, breakpoint = 768 },
  ref
) {
  const [originalData, setData] = useState(layout);

  const [sectionId, setSectionId] = useState(null);
  const [colId, setColId] = useState(null);
  const [colOver, setColOver] = useState(null);
  const [resizing, setResizing] = useState(false);
  const containerRef = useRef(null);
  const [xPosition, setXPosition] = useState([]);
  const [leftGap, setLeftGap] = useState(0);
  const [rulers, setRulers] = useState([]);
  const { addRow } = useController(originalData, setData, maxCols);

  useImperativeHandle(ref, () => ({
    addRow,
  }));

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
    if (containerRef.current) {
      updateRulers(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);

  function id(data) {
    return data.droppableId.split("_")[1];
  }

  function index(data, id) {
    return data.findIndex((row) => row.rowId === id);
  }

  function recomputeWidths(data) {
    return data.map((row) => {
      row.columns = row.columns.map((col) => {
        col.width = 1 / row.columns.length;
        return { ...col };
      });
      return { ...row };
    });
  }

  const reorder = (data, source, destination, type) => {
    const result = Array.from(data);

    if (type !== "col") {
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);

      return [...result];
    }

    const sourceIndex = index(result, id(source));
    const destIndex = index(result, id(destination));
    const [removed] = result[sourceIndex].columns.splice(source.index, 1);

    result[destIndex].columns.splice(destination.index, 0, removed);

    if (result[sourceIndex].columns.length === 0) {
      result.splice(sourceIndex, 1);
    }

    if (destIndex === sourceIndex) {
      return result;
    }

    return recomputeWidths(result);
  };

  useEffect(() => {
    if (onChange) {
      onChange(originalData);
    }
  }, [originalData]);

  const handleResizerPositions = useMemo(
    () => () => {
      const position = getHandlersX(
        originalData,
        containerRef.current ? containerRef.current.offsetWidth : 0
      );

      setXPosition([...position]);
    },
    [originalData, containerRef.current]
  );

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
    handleResizerPositions();
  }, [sectionId, originalData]);

  useLayoutEffect(() => {
    setTimeout(handleResizerPositions, 350);

    window.addEventListener("resize", handleResizerPositions);

    return () => {
      window.removeEventListener("resize", handleResizerPositions);
    };
  }, []);

  const isMobileSize = useMemo(() => {
    return window.innerWidth <= breakpoint;
  }, [breakpoint, window.innerWidth]);

  const setWidths = useCallback(
    (widthsData, rowIndex) => {
      const row = { ...originalData[rowIndex] };
      row.columns = row.columns.map((col, index) => {
        col.width = widthsData[index];
        return { ...col };
      });
      const newData = [...originalData];

      setData(newData);
    },
    [originalData]
  );

  return (
    <Container ref={containerRef} resizing={resizing}>
      {rulers[0] &&
        rulers[0].map((r) => (
          <Ruler style={{ opacity: resizing ? 1 : 0 }} key={r} x={r || 0} />
        ))}
      <DataContext.Provider
        value={{
          data: originalData,
          setData,
          sectionId,
          colId,
          maxCols,
          minWidth,
          setColId,
          colOver,
          isResizing: resizing,
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
          onDragUpdate={(e) => {
            if (e.type === "col") {
              setColOver(e.destination);
            }
          }}
          onDragEnd={(e) => {
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
              setData([...reorder(originalData, source, destination, "col")]);

              return;
            }

            const reordered = reorder(originalData, source, destination);
            setData([...reordered]);
          }}
        >
          <Droppable droppableId={"grid"}>
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {originalData.map((row, rowIndex) => (
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
                    />
                    {!isMobileSize &&
                      xPosition.length > 0 &&
                      xPosition[rowIndex] &&
                      xPosition[rowIndex].slice(0, -1).map((x, colIndex) => {
                        return (
                          <Resizer
                            key={"resizer_" + row.rowId + "_" + colIndex}
                            x={x || 0}
                            setResizing={setResizing}
                            leftGap={leftGap}
                            widths={row.columns.map((col) => col.width)}
                            colIndex={colIndex}
                            minWidth={minWidth}
                            totalWidth={containerRef.current.offsetWidth || 0}
                            setWidths={setWidths}
                            positionXs={xPosition}
                            rulers={rulers}
                            rowIndex={rowIndex}
                            onEnd={() => {
                              handleResizerPositions();
                            }}
                            setColId={setColId}
                            rowId={row.rowId}
                            colId={
                              row.columns[colIndex]
                                ? row.columns[colIndex].columnId
                                : null
                            }
                          />
                        );
                      })}
                  </div>
                ))}
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
  border-right: 2px dashed #37a1f6;
`;

export default forwardRef(Grid);
