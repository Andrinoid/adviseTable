import React, { createContext, useState } from "react";

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [siders, setSiders] = useState([]);
  const [reverse, setReverse] = useState([]);

  return (
    <LayoutContext.Provider value={{ siders, setSiders, reverse, setReverse }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, LayoutContext };
