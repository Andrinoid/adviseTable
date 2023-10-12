import React from "react";
import Example from "./Example";
import { LayoutProvider } from "./LayoutContext";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const App = () => {
  return (
    <LayoutProvider>
      <Router history={customHistory}>
        <Example />
      </Router>
    </LayoutProvider>
  );
};

export default App;
