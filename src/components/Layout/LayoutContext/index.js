import React, { createContext, useEffect, useState } from "react";

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [backup, setBackup] = useState([]);
  const [siders, setSiders] = useState([]);
  const [drawers, setDrawers] = useState([]);
  const [links, setLinks] = useState([]);

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
        backup,
        setBackup,
        drawers,
        setDrawers,
        links,
        setLinks,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, LayoutContext };
