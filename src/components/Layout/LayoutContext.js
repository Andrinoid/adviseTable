import React, { createContext, useState } from "react";

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [backup, setBackup] = useState([]);

  const [siders, setSiders] = useState([]);
  const [reverse, setReverse] = useState([]);

  return (
    <LayoutContext.Provider
      value={{ siders, setSiders, reverse, setReverse, backup, setBackup }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, LayoutContext };
