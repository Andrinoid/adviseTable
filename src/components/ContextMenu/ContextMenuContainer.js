import React from "react";
import { useContextMenu } from "./ContextMenuProvider";

const Container = ({ id, children }) => {
  const { openMenu, closeMenu } = useContextMenu();

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        openMenu(id, e.clientX, e.clientY);
      }}
      onClick={() => {
        closeMenu();
      }}
    >
      {children}
    </div>
  );
};

export default Container;
