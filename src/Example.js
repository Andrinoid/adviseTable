import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import styled from "styled-components";
import DragHandle from "./icons/DragHandle";
import Plus from "./icons/Plus";

import { Table, Row, Col } from "./Table";
import { view, ui_prefs } from "./data/example2";
import { default as mo } from "./data/months";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;

function Example({
  theme,
  draggable,
  autoAdjustTrigger,
  selectionMode,
  footerVissible,
  headerOffset,
}) {
  const [expandedIds, setExpandedIds] = useState([]);
  // const [selectionMode, setSelectionMode] = useState('row');
  const tableRef = useRef(null);
  const tableRef3 = useRef(null);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    tableRef.current.autoAdjust();
  }, [autoAdjustTrigger]);

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
    // const items = Array.from(viewd);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // updateview(items);
  };

  const toolBoxContent = (dragHandleProps, rowId) => {
    return (
      <Flex>
        {draggable && (
          <Flex {...dragHandleProps}>
            <DragHandle />
          </Flex>
        )}
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

  return (
    <div className="App">
      <Table
        ref={tableRef}
        headerData={header}
        theme={theme}
        selectionMode={selectionMode}
        expandedIds={expandedIds}
        tableId={"bigTable"}
        footer={footerVissible}
        headerStickyTopOffset={headerOffset}
      >
        {(tableProvided) => {
          // console.log(tableProvided);
          return (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {view.map((row, i) => {
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
                                toolBoxContent={toolBoxContent(
                                  provided.dragHandleProps,
                                  row.id
                                )}
                                {...tableProvided.rowProps}
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
      <hr />

      <p>problems</p>
      <ul>
        <li>rename label and total through all components</li>
      </ul>

      <div>
        <button onClick={() => tableRef3.current.autoAdjust()}>
          Auto adjust
        </button>
      </div>
      <Table
        ref={tableRef3}
        headerData={[{ title: "foo" }, { title: "bar" }, { title: "baz" }]}
        // theme={'dark'}
        tableId={"smallTable"}
        leftBrickWidth={0}
      >
        {(tableProvided) => (
          <div>
            <Row {...tableProvided.rowProps}>
              <Col horizontalAlign="left">foo</Col>
              <Col>bar</Col>
              <Col>baz</Col>
            </Row>

            <Row
              {...tableProvided.rowProps}
              label="Operating ratios and other key figures"
            >
              <Col horizontalAlign="left"> </Col>
              <Col horizontalAlign="left"> </Col>
              <Col horizontalAlign="left"> </Col>
            </Row>

            <Row {...tableProvided.rowProps}>
              <Col horizontalAlign="left">foo</Col>
              <Col>bar</Col>
              <Col>baz</Col>
            </Row>

            <Row {...tableProvided.rowProps}>
              <Col horizontalAlign="left">foo</Col>
              <Col>bar</Col>

              <Col>baz</Col>
            </Row>
          </div>
        )}
      </Table>

      <p>Todo</p>
      <ul>
        <li>Control styles</li>
        <li>throttle on table resize or streach out method</li>
        <li>Min and max size on cols</li>
        <li>pinned columns</li>
      </ul>
    </div>
  );
}

export default Example;
