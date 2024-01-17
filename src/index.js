import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ExampleSimple from "./ExampleSimple";
import { RootStyle } from "./global.style";
// import App from "./components/Grid/App";
// import App from "./components/ContextMenu/App";
// import App from "./components/Layout/App";

const Application = () => (
    <>
        <RootStyle />
        <App />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ExampleSimple />);
