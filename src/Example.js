import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FixedSizeList as List, VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { Virtuoso } from "react-virtuoso";
import {
  EditOutlined,
  VerticalAlignBottomOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import DragHandle from "./icons/DragHandle";

import { Table, Row, Col } from "./components";
import { view, ui_prefs } from "./data/example2";
import { default as mo } from "./data/months";
import Plus from "./icons/Plus";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  cursor: pointer;
  ${({ hover }) => {
    if (hover) {
      return `
      &:hover {
        background-color: #e6f4ff;
      }
    `;
    }
  }}
`;

function getTotal(index) {
  let result = "";

  for (let i = 0; i <= index; i++) {
    result += `${i}`;
  }

  return result;
}

function Example({
  theme,
  draggable,
  autoAdjustTrigger,
  selectionMode,
  footerVissible,
  headerOffset,
  showGrid,
  allowEdition,
}) {
  const [viewData, setViewData] = useState(view);
  const [subRows, setSubRows] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [items, setItems] = useState(Array.from(Array(20).keys()));
  // const [containerWidth, setContainerWidth] = useState(0);
  // const [selectionMode, setSelectionMode] = useState('row');
  // const tableRef = useRef(null);
  // const tableRef3 = useRef(null);

  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }
  //   tableRef.current.autoAdjust();
  // }, [autoAdjustTrigger]);

  // useEffect(() => {
  //   console.log('expanded ids', expandedIds);
  // }, [expandedIds]);

  let months = mo.map((m) => m.system);
  // select range of months based on selectedMonths
  let [monthRange, setMonthRange] = useState(
    months.slice(ui_prefs.months[0] - 1, ui_prefs.months[1])
  );

  const header = [
    { title: "" },
    ...monthRange.map((m) => {
      return { title: m };
    }),
    { title: "Total" },
  ];

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const cloneViewData = [...viewData];
    const [reorderedItem] = cloneViewData.splice(result.source.index, 1);
    cloneViewData.splice(result.destination.index, 0, reorderedItem);
    setViewData(cloneViewData);
  };

  const leftBrickContent = (dragHandleProps, rowId) => {
    return (
      <Flex>
        <Flex
          cursor={"pointer"}
          style={{ marginLeft: 4 }}
          onClick={() => {
            if (expandedIds.includes(rowId)) {
              setExpandedIds(expandedIds.filter((id) => id !== rowId));
            } else {
              setExpandedIds([...expandedIds, rowId]);
            }
          }}
        >
          <Plus />
        </Flex>
      </Flex>
    );
  };

  const rowMenuContent = (dragHandleProps) => {
    return (
      <>
        <MenuItem {...dragHandleProps} style={{ cursor: "grab" }}>
          <DragHandle />
        </MenuItem>
        <MenuItem hover>
          <EditOutlined />
        </MenuItem>
        <MenuItem hover>
          <ClearOutlined />
        </MenuItem>
        <MenuItem hover>
          <VerticalAlignBottomOutlined />
        </MenuItem>
      </>
    );
  };

  const Item = memo(({ monthRange, index, style, tableProvided }) => (
    <Row
      key={index}
      {...tableProvided.rowProps}
      type={"secondary"}
      style={{
        minHeight: 40,
        background: "#f7f7f7",
        ...style,
        transform: "translateZ(0)",
      }}
    >
      {[...monthRange, {}, {}].map((m, i) => {
        if (i == 0)
          return (
            <Col key={i} horizontalAlign="left">
              lykill {i}
            </Col>
          );
        return (
          <Col key={i} allowEdition={allowEdition}>
            34567
          </Col>
        );
      })}
    </Row>
  ));

  const SubRowList = useCallback(({ monthRange, tableProvided }) => {
    return (
      <Virtuoso
        data={items}
        overscan={50}
        endReached={() => {
          setItems(Array.from(Array(items.length + 20).keys()));
        }}
        itemContent={(index) => (
          <Item
            monthRange={monthRange}
            index={index}
            tableProvided={tableProvided}
          />
        )}
        style={{ height: "400px", background: "#f7f7f7" }}
      />
    );
    // <>
    //   {[1, 2, 3, 4].map((item, index) => (
    //     <Item index={index} key={index} tableProvided={tableProvided} />
    //   ))}
    // </>
    // );
  }, []);

  const table1Ref = useRef(null);
  const table2Ref = useRef(null);

  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault();

      if (table1Ref.current && table2Ref.current) {
        table1Ref.current.closeMenu();
        table2Ref.current.closeMenu();
      }
    }
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [table1Ref, table2Ref]);

  return (
    <div className="App" style={{ paddingBottom: 500 }}>
      <button
        onClick={() => {
          const result = {
            source: {
              index: 0,
            },
            destination: {
              index: Math.floor(Math.random() * 10),
            },
          };
          setMonthRange(
            months.slice(ui_prefs.months[0] - 1, result.destination.index)
          );

          const cloneViewData = [...viewData];
          const [reorderedItem] = cloneViewData.splice(result.source.index, 1);
          cloneViewData.splice(result.destination.index, 0, reorderedItem);
          setViewData(cloneViewData);
        }}
      >
        Update table columns amount
      </button>
      <Table
        ref={table1Ref}
        headerData={header}
        theme={theme}
        showGrid={true}
        selectionMode={selectionMode}
        tableId={"bigTable"}
        footer={footerVissible}
        headerStickyTopOffset={headerOffset}
        lasColumnRisizeable={true}
        hasTotalColumn={true}
        onSelection={(selectedReport) => {
          // console.log("selectedReport", selectedReport);
        }}
      >
        {(tableProvided) => {
          return (
            <>
              {/* <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                <Col colspan={"fullwidth"}>Some text</Col>
              </Row>
              <Row
                style={{ minHeight: 40 }}
                {...tableProvided.rowProps}
                type="secondary"
              >
                <Col colspan={"fullwidth"}>Some text</Col>
              </Row>
              <Row
                style={{ minHeight: 40 }}
                {...tableProvided.rowProps}
                type="secondary"
              >
                <Col allowEdition={allowEdition}></Col>
                {monthRange.map((month, index) => {
                  return <Col key={index} allowEdition={allowEdition}>Some text</Col>;
                })}
                <Col allowEdition={allowEdition}>123</Col>

              </Row>
              <Row
                style={{ minHeight: 40 }}
                {...tableProvided.rowProps}
                type="secondary"
              >
                <Col allowEdition={allowEdition}></Col>

                {monthRange.map((month, index) => {
                  return <Col key={index} allowEdition={allowEdition}>Some text</Col>;
                })}
                <Col allowEdition={allowEdition}>123</Col>

              </Row>
              <Row
                style={{ minHeight: 40 }}
                {...tableProvided.rowProps}
                type="secondary"
              >
                <Col allowEdition={allowEdition}></Col>

                {monthRange.map((month, index) => {
                  return <Col key={index} allowEdition={allowEdition}>Some text</Col>;
                })}

                <Col allowEdition={allowEdition}>123</Col>

              </Row>
              <Row
                style={{ minHeight: 40 }}
                {...tableProvided.rowProps}
                type="secondary"
              >
                <Col allowEdition={allowEdition}></Col>

                {monthRange.map((month, index) => {
                  return <Col key={index} allowEdition={allowEdition}>Some text</Col>;
                })}
                <Col allowEdition={allowEdition}>123</Col>

              </Row>
              <Row
                style={{ minHeight: 40 }}
                {...tableProvided.rowProps}
                type="secondary"
              >
                <Col allowEdition={allowEdition}></Col>
                {monthRange.map((month, index) => {
                  return <Col key={index} allowEdition={allowEdition}>Some text</Col>;
                })}
                <Col allowEdition={allowEdition}>123</Col>
              </Row> */}
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Row
                        style={{ minHeight: 40 }}
                        {...tableProvided.rowProps}
                        menuContent={rowMenuContent(provided.dragHandleProps)}
                      >
                        <Col
                          colspan={"fullwidth"}
                          spanSelection={false}
                          horizontalAlign={"left"}
                          style={{ minHeight: 40 }}
                        >
                          <span style={{ fontSize: "inherit" }}>Label</span>
                        </Col>
                      </Row>
                      {viewData.map((row, i) => {
                        return (
                          <Draggable
                            isDragDisabled={!draggable}
                            draggableId={"id-" + row.id}
                            key={"id-" + row.id}
                            index={i}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <Row
                                  key={i}
                                  style={{ minHeight: 40 }}
                                  leftBrickContent={leftBrickContent(
                                    provided.dragHandleProps,
                                    row.id
                                  )}
                                  {...tableProvided.rowProps}
                                  menuContent={rowMenuContent(
                                    provided.dragHandleProps
                                  )}
                                >
                                  <Col horizontalAlign="left">{row.name}</Col>

                                  {monthRange.map((month, i) => (
                                    <Col
                                      key={i}
                                      allowEdition={allowEdition}
                                      onSubmitCallback={() => {}}
                                      inputType={"number"}
                                    >
                                      {row[month]}
                                    </Col>
                                  ))}

                                  <Col allowEdition={allowEdition}>
                                    {getTotal(i)}
                                  </Col>
                                </Row>

                                {expandedIds.includes(row.id) && (
                                  <SubRowList
                                    monthRange={monthRange}
                                    tableProvided={tableProvided}
                                  />
                                )}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          );
        }}
      </Table>
    </div>
  );
}

export default Example;
