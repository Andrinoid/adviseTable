import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditOutlined, VerticalAlignBottomOutlined, ClearOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";
import styled from "styled-components";
import DragHandle from "./icons/DragHandle";

import { Table, Row, Col } from "./Table";
import { view, ui_prefs } from "./data/example2";
import { default as mo } from "./data/months";
import Plus from './icons/Plus';

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
  }
  }
`;

function Example({
  theme,
  draggable,
  autoAdjustTrigger,
  selectionMode,
  footerVissible,
  headerOffset,
  showGrid,
}) {
  const [viewData, setViewData] = useState(view);
  const [expandedIds, setExpandedIds] = useState([]);
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

  let months = mo.map((m) => m.system);
  // select range of months based on selectedMonths
  let monthRange = months.slice(ui_prefs.months[0] - 1, ui_prefs.months[1]);

  const header = [
    { title: "" },
    { title: "Jan" },
    { title: "Feb" },
    { title: "Mar" },
    { title: "Apr" },
    { title: "May" },
    { title: "Jun" },
    { title: "Jul" },
    { title: "Aug" },
    { title: "Sep" },
    { title: "Oct" },
    { title: "Nov" },
    { title: "Dec" },
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
        <MenuItem {...dragHandleProps} style={{ cursor: 'grab' }}>
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
    )
  };

  return (
    <div className="App">
      <Table
        headerData={header}
        theme={theme}
        showGrid={showGrid}
        selectionMode={selectionMode}
        tableId={"bigTable"}
        footer={footerVissible}
        headerStickyTopOffset={headerOffset}
        lasColumnRisizeable={true}
        onSelection={(selectedReport) => {
          // console.log("selectedReport", selectedReport);
        }}
      >
        {(tableProvided) => {
          return (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
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
                                  <Col key={i}>{row[month]}</Col>
                                ))}

                                <Col>34567</Col>
                              </Row>

                              {
                                expandedIds.includes(row.id) && (
                                  // The motion divs are optional and just an example of how to animate the conditional rendered rows
                                  // it shows how dynamic the table can be
                                  // Optional animation starts
                                  <motion.div
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                      open: {
                                        height: "auto",
                                        transition: {
                                          when: "beforeChildren",
                                          duration: 0.3,
                                        },
                                      },
                                      collapsed: {
                                        height: 0,
                                        transition: { when: "afterChildren" },
                                      },
                                    }}
                                  >
                                    <motion.div
                                      variants={{
                                        open: {
                                          opacity: 1,
                                        },
                                        collapsed: {
                                          opacity: 0,
                                        },
                                      }}
                                    >
                                      {/* Optional animation ends */}

                                      <Row
                                        selectable={false}
                                        {...tableProvided.rowProps}
                                        type={"secondary"}
                                      >
                                        <Col horizontalAlign="left">
                                          lykill 1004
                                        </Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                      </Row>
                                      <Row
                                        selectable={false}
                                        {...tableProvided.rowProps}
                                        type={"secondary"}
                                      >
                                        <Col horizontalAlign="left">
                                          lykill 1006
                                        </Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                        <Col>34567</Col>
                                      </Row>
                                      {/* Optional animation starts */}
                                    </motion.div>
                                  </motion.div>
                                )
                                // Optional animation ends
                              }
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
          );
        }}
      </Table>

    
    </div>
  );
}

export default Example;
