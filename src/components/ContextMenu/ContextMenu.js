import React from "react";
import { Menu } from "antd";
import { useContextMenu } from "./ContextMenuProvider";
import styled from "styled-components";

const ContextMenu = ({ menuId, items }) => {
  const { activeMenu, position, closeMenu } = useContextMenu();

  if (activeMenu !== menuId) return null;

  return (
    <StyledMenu position={position} onClick={closeMenu}>
      {items
        .filter((i) => !!i)
        .map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
    </StyledMenu>
  );
};

const StyledMenu = styled(Menu)`
  cursor: default;
  z-index: 1000;
  background-color: rgb(249, 250, 251);
  width: ${({ width }) => width || 300}px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 14%), 0 6px 16px 0 rgb(0 0 0 / 10%),
    0 9px 28px 8px rgb(0 0 0 / 7%) !important;
  backdrop-filter: blur(5px);
  border: none;
  padding: 15px 0 15px 0px;
  position: fixed;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  z-index: 1000;
  background: rgb(249, 250, 251);
  width: 300;
`;

export default ContextMenu;
