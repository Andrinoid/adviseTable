import React, {
  createContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Section from "../Section";
import { useController } from "../hooks";
import Resizer from "../Resizer";
import { getInitialX as getHandlersX, shouldStop } from "../Resizer/helpers";
import styled from "styled-components";

export const DataContext = createContext(null);

function Grid(
  { layout, onChange, maxCols = 10, minWidth = 100, breakpoint = 768 },
  ref
) {
  const [originalData, setData] = useState(layout);

  const data = useMemo(() => originalData, [originalData]);
  const [sectionId, setSectionId] = useState(null);
  const [colId, setColId] = useState(null);
  const [colOver, setColOver] = useState(null);
  const [resizing, setResizing] = useState(false);
  const containerRef = useRef(null);
  const [xPosition, setXPosition] = useState([]);
  const [leftGap, setLeftGap] = useState(0);
  const { addRow } = useController(data, setData, maxCols);

  useImperativeHandle(ref, () => ({
    addRow,
  }));

  useEffect(() => {
    if (colId === null) {
      setSectionId(null);
    }
  }, [colId]);

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

      return result;
    }

    const sourceIndex = index(result, id(source));
    const destIndex = index(result, id(destination));
    const [removed] = result[sourceIndex].columns.splice(source.index, 1);

    result[destIndex].columns.splice(destination.index, 0, removed);

    if (result[sourceIndex].columns.length === 0) {
      result.splice(sourceIndex, 1);
    }

    return recomputeWidths(result);
  };

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data]);

  const handleResizerPositions = useMemo(
    () => () => {
      const position = getHandlersX(
        data,
        containerRef.current ? containerRef.current.offsetWidth : 0
      );

      setXPosition([...position]);
    },
    [data, containerRef.current]
  );

  useLayoutEffect(() => {
    handleResizerPositions();
  }, [resizing]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      const { left } = el.getBoundingClientRect();
      setLeftGap(left);
    }
  }, [data]);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (data) {
        handleResizerPositions(data);
      }
    }, 350);

    window.addEventListener("resize", handleResizerPositions);

    return () => {
      window.removeEventListener("resize", handleResizerPositions);
    };
  }, []);

  const isMobileSize = useMemo(() => {
    return window.innerWidth <= breakpoint;
  }, [breakpoint, window.innerWidth]);

  return (
    <Container ref={containerRef} resizing={resizing}>
      <DataContext.Provider
        value={{
          data,
          setData,
          sectionId,
          colId,
          maxCols,
          minWidth,
          setColId,
          colOver,
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
              setData(reorder(data, source, destination, "col"));

              return;
            }

            const reordered = reorder(data, source, destination);

            setData([...reordered]);
          }}
        >
          <Droppable droppableId={"grid"}>
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {data.map((row, rowIndex) => (
                  <div style={{ position: "relative" }}>
                    <Section
                      key={row.rowId}
                      row={row}
                      isBeforeDragging={colId !== null}
                      widths={row.columns.map((col) => col.width)}
                      index={rowIndex}
                      breakpoint={breakpoint}
                    />
                    {!isMobileSize &&
                      xPosition.length > 0 &&
                      xPosition[rowIndex].slice(0, -1).map((x, colIndex) => {
                        function setWidths(widthsData) {
                          const row = data[rowIndex];
                          row.columns = row.columns.map((col, index) => {
                            col.width = widthsData[index];
                            return col;
                          });
                          const newData = [...data];

                          setData(newData);
                        }

                        const actualWidths = row.columns.map(
                          (col) =>
                            col.width * containerRef.current.offsetWidth || 0
                        );

                        return (
                          <Resizer
                            key={colIndex}
                            x={x}
                            resizing={resizing}
                            setResizing={setResizing}
                            leftGap={leftGap}
                            widths={row.columns.map((col) => col.width)}
                            colIndex={colIndex}
                            minWidth={minWidth}
                            row={data[rowIndex]}
                            totalWidth={containerRef.current.offsetWidth || 0}
                            setWidths={setWidths}
                            positionXs={xPosition}
                            rowIndex={rowIndex}
                            handleResizerPositions={handleResizerPositions}
                            shouldStop={shouldStop(
                              actualWidths,
                              colIndex,
                              minWidth
                            )}
                            data={data}
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
  cursor: ${({ resizing }) => (resizing ? "col-resize" : "default")};
`;

export default forwardRef(Grid);
