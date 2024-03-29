import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  Cursor,
  Line,
  SectionContainer,
  SectionElm,
  SectionHandle,
  SectionHandleItem,
} from './styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DataContext } from '../Grid';
import Col from '../Col';
import Plus from '../../../icons/Plus';
import DragHandle from '../../../icons/DragHandle';
import { Dimensions, compute, getRowId, useController } from '../hooks';
import Resizable from '../Resizable';
import { cloneDeep } from 'lodash';
import produce from 'immer';

function Section({
  widths,
  isBeforeDragging,
  index,
  row,
  breakpoint,
  mobile,
  rulers,
}) {
  const sectionRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState(null);
  const [height, setHeight] = useState('initial');
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
    allowBreak = false,
  } = useContext(DataContext);
  const [factors, setFactors] = useState(widths);
  const { addRow, removeRow } = useController(data, setData, maxCols);
  const { stacked } = useContext(DataContext);

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
      setHeight('initial');
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

  const draggableId = 'draggable_' + row.rowId;

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
            allowBreak={allowBreak}
          >
            <Droppable
              droppableId={'section_' + row.rowId}
              type="col"
              direction={'horizontal'}
            >
              {(droppableProvided) => {
                return (
                  <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    style={{ height: height }}
                  >
                    <SectionElm
                      id={'section_' + row.rowId}
                      ref={sectionRef}
                      style={{ position: 'relative' }}
                      breakpoint={breakpoint}
                      beingDragged={
                        sectionId === draggableId || sectionId === null
                      }
                      editing={editing}
                      className="advise-ui-grid-section"
                      stacked={stacked}
                    >
                      {row.columns.map((column, colIndex) => {
                        return (
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
                            onResizeStart={() => {
                              setResizing(true);
                            }}
                            onResizeEnd={(width, x) => {
                              setResizing(false);

                              const diff = x - snap(x);

                              const result = compute(
                                new Dimensions(
                                  factors,
                                  colIndex,
                                  { width: width - diff },
                                  minWidth,
                                  totalWidth,
                                ),
                              );

                              setData((data) => {
                                return produce(data, (draft) => {
                                  draft[index].columns = draft[
                                    index
                                  ].columns.map((col, index) => {
                                    col.width = result[index];
                                    return col;
                                  });
                                });
                              });
                              setFactors([...result]);
                            }}
                            onResize={(width, x) => {
                              const result = compute(
                                new Dimensions(
                                  factors,
                                  colIndex,
                                  { width: width },
                                  minWidth,
                                  totalWidth,
                                ),
                              );

                              setFactors([...result]);
                            }}
                            resizeable={
                              row.columns.length - 1 != colIndex &&
                              !mobile &&
                              editing
                            }
                          >
                            {row.rowId != getRowId(sectionId) &&
                              colOver &&
                              colOver.droppableId == 'section_' + row.rowId &&
                              colOver.index == colIndex && <Line />}

                            {row.rowId != getRowId(sectionId) &&
                              colOver &&
                              colOver.droppableId == 'section_' + row.rowId &&
                              colOver.index == row.columns.length &&
                              colIndex + 1 == row.columns.length && (
                                <Line right />
                              )}

                            {column.data.map((data, cellIndex) => {
                              return (
                                <div
                                  key={cellIndex}
                                  className={
                                    cellIndex == column.data.length - 1
                                      ? 'advise-ui-grid-cell advise-ui-grid-last-cell'
                                      : 'advise-ui-grid-cell'
                                  }
                                >
                                  {cell(data, index, colIndex, cellIndex)}
                                </div>
                              );
                            })}
                          </Col>
                        );
                      })}
                      <SectionHandle hidden={!editing}>
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
                            <Plus
                              style={{
                                transform: 'rotate(45deg)',
                              }}
                            />
                          </SectionHandleItem>
                        </Cursor>
                      </SectionHandle>
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
