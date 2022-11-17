import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';
import { Table, Row } from './Table';
import { view, ui_prefs } from './data/example2';


function App() {

  const [mode, setMode] = useState('static');
  const [autoAdjustment, setAutoAdjustment] = useState(false);
  const tableRef = useRef(null);

  // useEffect(() => {
  //   console.log('tableRef', tableRef.current);
  // }, [tableRef]);


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    // const items = Array.from(viewd);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // updateview(items);
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

      <Table mode={mode} ref={tableRef} months={ui_prefs.months}>
        {(tableProvided) => 

          (



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
                              Handle={()=> (<div {...provided.dragHandleProps}>...</div>)}
                              {...tableProvided.rowProps}
                       
                              />
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