import React, { createContext, useEffect, useState } from "react";

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [width, setWidth] = useState(null);

  const [backup, setBackup] = useState([]);
  const [siders, setSiders] = useState([]);
  const [drawers, setDrawers] = useState([]);
  const [reverse, setReverse] = useState([]);

  useEffect(() => {
    if (drawers.length == 0 && width != null) {
      setWidth(null);
    }
  }, [drawers]);

  return (
    <LayoutContext.Provider
      value={{
        siders,
        setSiders,
        reverse,
        setReverse,
        backup,
        setBackup,
        drawers,
        setDrawers,
        width,
        setWidth,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, LayoutContext };
