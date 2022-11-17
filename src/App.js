import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Table from './Table';


function App() {

  const [mode, setMode] = useState('static');
  const [autoAdjustment, setAutoAdjustment] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    console.log('tableRef',tableRef.current );
  }, [tableRef]);

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
      <Table mode={mode} ref={tableRef} />

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