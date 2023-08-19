import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
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
import { Dimensions, compute, getRowId, useController } from "../hooks";
import Resizable from "../Resizable";
import { cloneDeep } from "lodash";

function Section({
  widths,
  isBeforeDragging,
  index,
  row,
  breakpoint,
  leftGap,
  mobile,
  rulers,
}) {
  const sectionRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState(null);
  const [height, setHeight] = useState("initial");
  const columnHeight = useRef(null);
  const resizing = useRef(false);
  const {
    colOver,
    data,
    setData,
    sectionId,
    maxCols,
    cell,
    editing,
    setResizing,
    minWidth,
    totalWidth,
    isResizing,
  } = useContext(DataContext);
  const [factors, setFactors] = useState(widths);
  const { addRow, removeRow } = useController(data, setData, maxCols);

  useEffect(() => {
    setFactors(widths);
  }, [widths]);

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

  function snap(changedX) {
    const range = 25;

    for (let sp = 0; sp < rulers.length; sp++) {
      const nextValue = rulers[sp];
      if (changedX > nextValue - range && changedX < nextValue + range) {
        return nextValue;
      }
    }

    return changedX;
  }

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
                          <Resizable
                            key={colIndex}
                            resizing={isResizing}
                            onResizeStart={() => {
                              setResizing(true);
                            }}
                            totalWidth={totalWidth}
                            onResizeEnd={(width, x) => {
                              setResizing(false);

                              const diff = x - snap(x);

                              const result = compute(
                                new Dimensions(
                                  factors,
                                  colIndex,
                                  { width: width - diff },
                                  minWidth,
                                  totalWidth
                                )
                              );

                              // update global state with new widths
                              const clone = cloneDeep(data);

                              clone[index].columns = clone[index].columns.map(
                                (col, index) => {
                                  col.width = result[index];
                                  return col;
                                }
                              );

                              setData(clone);
                              setFactors([...result]);
                            }}
                            onResize={(width, x) => {
                              const result = compute(
                                new Dimensions(
                                  factors,
                                  colIndex,
                                  { width: width },
                                  minWidth,
                                  totalWidth
                                )
                              );

                              setFactors([...result]);
                            }}
                            leftGap={leftGap}
                            enabled={
                              row.columns.length - 1 != colIndex && !mobile
                            }
                            snapPoints={rulers}
                          >
                            <Col
                              key={column.columnId}
                              index={colIndex}
                              columnId={column.columnId}
                              width={factors[colIndex]}
                              data={column.data}
                              rowId={row.rowId}
                              sectionRef={sectionRef}
                              breakpoint={breakpoint}
                              totalWidth={totalWidth}
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
                                return (
                                  <div key={index}>
                                    {cell(data, {
                                      marginBottom:
                                        column.data.length > 1 &&
                                        index != column.data.length - 1
                                          ? 10
                                          : 0,
                                    })}
                                  </div>
                                );
                              })}
                            </Col>
                          </Resizable>
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
