import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ExampleSimple from './ExampleSimple';
import { RootStyle } from './global.style';
// import SortExample from './SortExample';
// import App from './components/Grid/App';
import { createRoot } from 'react-dom/client';
// import App from "./components/ContextMenu/App";
// import App from './components/Layout/App';

const Application = () => (
  <>
    {/* <RootStyle /> */}
    <App />
  </>
);
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
