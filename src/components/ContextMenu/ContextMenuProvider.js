import React, { createContext, useState, useContext } from "react";

const ContextMenuContext = createContext();

export const useContextMenu = () => {
  return useContext(ContextMenuContext);
};

export const ContextMenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const openMenu = (menuId, x, y) => {
    setActiveMenu(menuId);
    setPosition({ x, y });
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  return (
    <ContextMenuContext.Provider
      value={{ activeMenu, position, openMenu, closeMenu }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
};
