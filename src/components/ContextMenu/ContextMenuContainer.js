import React from "react";
import { useContextMenu } from "./ContextMenuProvider";
import styled from "styled-components";

const Container = ({ id, width, children }) => {
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
