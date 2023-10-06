import React, { createContext, useState } from "react";

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [siders, setSiders] = useState([]);

  return (
    <LayoutContext.Provider value={{ siders, setSiders }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, LayoutContext };
