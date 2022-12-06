import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragHandle from './icons/DragHandle';
import Plus from './icons/Plus';


import './App.css';
import { Table, Row, Col } from './Table';
import { view, ui_prefs } from './data/example2';
import { default as mo } from './data/months';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  cursor: ${({ cursor }) => cursor || 'default'};
 `

const createNewObject = () => ({});
function useForceUpdate() {
  const [, setValue] = useState(createNewObject);
  return useCallback(() => {
    setValue(createNewObject());
  }, []);
}

function App() {

  const [mode, setMode] = useState('static');
  const [expandedIds, setExpandedIds] = useState([]);
  const forceUpdate = useForceUpdate();
  const tableRef = useRef(null);
  const tableRef3 = useRef(null);


  let months = mo.map((m) => m.system);
  // select range of months based on selectedMonths
  let monthRange = months.slice(ui_prefs.months[0] - 1, ui_prefs.months[1]);

  const header = [
    { title: 'Label' },
    { title: 'Jan' },
    { title: 'Feb' },
    { title: 'Mar' },
    { title: 'Apr' },
    { title: 'May' },
    { title: 'Jun' },
    { title: 'Jul' },
    { title: 'Aug' },
    { title: 'Sep' },
    { title: 'Oct' },
    { title: 'Nov' },
    { title: 'Dec' },
    { title: 'Total' },
  ];

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    // const items = Array.from(viewd);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // updateview(items);
  }

  const toolBoxContent = (dragHandleProps, rowId) => {
    return (
      <Flex>
        {mode === 'edit' && <Flex {...dragHandleProps}><DragHandle /></Flex>}
        <Flex
          cursor={'pointer'}
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
    )
  }

  return (
    <div className="App">
      <div>
        {/* button that toggles setMode from static to edit */}
        <button onClick={() => setMode(mode === 'static' ? 'edit' : 'static')}>Toggle Mode</button>
      </div>
      <div>
        <button onClick={() => tableRef.current.autoAdjust()}>Auto adjust</button>
      </div>
      <p>{mode}</p>

      <Table mode={mode} ref={tableRef} headerData={header} theme="default">
        {(tableProvided) => {
          return (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters" >
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>

                    {
                      view.map((row, i) => {
                        return (
                          <Draggable
                            isDragDisabled={mode === 'static'}
                            draggableId={'id-' + row.id}
                            key={'id-' + row.id}
                            index={i}
                          >
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps}>
                                <Row
                                  key={i}
                                  toolBoxContent={toolBoxContent(provided.dragHandleProps, row.id)}
                                  {...tableProvided.rowProps}
                                >

                                  <Col horizontalAlign="left">
                                    {row.name}
                                  </Col>

                                  {monthRange.map((month, i) => <Col key={i}>{row[month]}</Col>)}

                                  <Col>
                                    34567
                                  </Col>

                                </Row>

                                {expandedIds.includes(row.id) &&
                                  // <div>
                                  //   <h1>hello</h1>
                                  // </div>
                                  <>
                                    <Row {...tableProvided.rowProps} type={'secondary'}>
                                      <Col horizontalAlign="left">
                                        lykill 1004
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                    </Row>
                                    <Row {...tableProvided.rowProps} type={'secondary'}>
                                      <Col horizontalAlign="left">
                                        lykill 1006
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                      <Col>
                                        34567
                                      </Col>
                                    </Row>
                                  </>
                                }

                              </div>
                            )}
                          </Draggable>
                        )
                      })
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )
        }}
      </Table>
      <hr />



      <p>problems</p>
      <ul>
        <li>table resizer is overflowing</li>
        <li>rename label and total through all components</li>
      </ul>

      <div>
        <button onClick={() => tableRef3.current.autoAdjust()}>Auto adjust</button>
      </div>
      {/* <Table 
        mode={mode} 
        ref={tableRef3} 
        headerData={[{title: 'foo'}, {title: 'bar'}, {title: 'baz'}]}
        theme={'dark'}
      >
        {(tableProvided) => (
          <div>
          <Row  {...tableProvided.rowProps} index={0} toolBoxContent={<div>
            <button>+</button>
            <button>bar</button>
          </div>}>
            <Col horizontalAlign="left">
              foo
            </Col>
            <Col>
              bar
            </Col>
            <Col>
              baz
            </Col>
          </Row>

          <Row  {...tableProvided.rowProps} index={1}>
            <Col horizontalAlign="left">
              foo
            </Col>
            <Col>
              bar
            </Col>
            <Col>
              baz
            </Col>
          </Row>

          <Row  {...tableProvided.rowProps} index={2}>
          <Col horizontalAlign="left">
            foo
          </Col>
          <Col>
            bar
          </Col>
         
          <Col>
            baz
          </Col>
        </Row>
        </div>
        )}
      </Table>
         */}



      <p>Todo</p>
      <ul>
        <li>Control styles</li>
        <li>Hightlight rows aka selection mode</li>
        <li>Min and max size on cols</li>
        <li>overflow ellips on label cols</li>
        <li>pinned columns</li>
      </ul>
    </div>
  );
}

export default App;