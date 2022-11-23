import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';
import { Table, Row, Col } from './Table';
import { view, ui_prefs } from './data/example2';
import { default as mo } from './data/months';

function App() {

  const [mode, setMode] = useState('static');
  const tableRef = useRef(null);


  let months = mo.map((m) => m.system);
  // select range of months based on selectedMonths
  let monthRange = months.slice(ui_prefs.months[0] - 1, ui_prefs.months[1]);


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    // const items = Array.from(viewd);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // updateview(items);
  }

  const getTotal = () => {
    // let mappings = row.totals_mappings || [];
    // let mapping = mappings.find((mapping) => {
    //     return mapping.begin == selectedMonths[0] && mapping.end == selectedMonths[1];
    // });

    // // needs more work
    // if (mapping) {
    //     if (!hideTotal) {
    //         return mapping.total;
    //     }
    //     // else {
    //     //     return row[selectedMonths[selectedMonths.length - 1].system];
    //     // }
    // } else {
    //     return null;
    // }
}

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

      <Table mode={mode} ref={tableRef} header={header}>
        {(tableProvided) => (

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
                                row={row}
                                key={i}
                                index={i}
                                Handle={() => (<div {...provided.dragHandleProps}>...</div>)}
                                {...tableProvided.rowProps}
                              >

                                <Col horizontalAlign="left">
                                  {row.name}
                                </Col>

                                {monthRange.map((month, i) => <Col key={i}>{row[month]}</Col> )}

                                <Col>
                                  {/* {getTotal(row)}  */}
                                  34567
                                </Col>

                              </Row>
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
        )}
      </Table>



      <p>Todo</p>
      <ul>
        <li>Control styles</li>
        <li>expandable cols</li>
        <li>Hightlight rows</li>
        <li>Hide total option</li>
        <li>Min and max size on cols</li>
        <li>overflow ellips on label cols</li>
        <li>Decouple Row and Col</li>
        <li>pinned columns</li>
      </ul>
    </div>
  );
}

export default App;