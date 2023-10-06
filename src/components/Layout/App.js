import React from "react";
import { SidebarsProvider } from "./SidebarsContextProvider";
import Example from "./Example";

const App = () => {
  return (
    <SidebarsProvider>
      <Example />
    </SidebarsProvider>
  );
};

export default App;
