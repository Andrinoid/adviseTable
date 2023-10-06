import React from "react";
import Example from "./Example";
import { LayoutProvider } from "./LayoutContext";

const App = () => {
  return (
    <LayoutProvider>
      <Example />
    </LayoutProvider>
  );
};

export default App;
