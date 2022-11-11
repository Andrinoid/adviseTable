import React, { useState } from 'react';
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