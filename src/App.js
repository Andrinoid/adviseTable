import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import Table from './Table';


function App() {

  const [mode, setMode] = useState('static');


  return (
    <div className="App">
      <div>
        {/* button that toggles setMode from static to edit */}
        <button onClick={() => setMode(mode === 'static' ? 'edit' : 'static')}>Toggle Mode</button>
      </div>    
      <p>{mode}</p>
      <Table mode={mode} />
    </div>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import Table from './Table';
// import Table2 from './Table2';
// import DragTest from './draganddrop';

// function App() {
//   return (
//     <div className="App">
//       <DragTest />
//      <Table></Table>

//     <Table2></Table2>
//     </div>
//   );
// }

// export default App;
