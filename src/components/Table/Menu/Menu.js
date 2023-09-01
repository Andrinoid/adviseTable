import React from "react";
import styled from "styled-components";
import {
  HandleControllerExecution,
  HandleDevtoolsOpening,
  HandlePositioning,
} from "./Hooks";

function Menu(props) {
  const { controller, setOpen, id, tableId, width, children, ...rest } = props;
  const [position] = HandlePositioning(controller);

  HandleDevtoolsOpening(controller);
  HandleControllerExecution(controller, tableId, setOpen);

  return (
    <Container className="menu-container">
      <MenuContainer
        {...rest}
        id={id}
        tableId={tableId}
        width={width}
        duration={controller.duration}
        position={position}
        style={{
          transform: controller.isOpen
            ? "translate(0, 0)"
            : "translate(-9999px, -9999px)",
        }}
        className={controller.isOpen ? "open" : "close"}
      >
        {children}
      </MenuContainer>
    </Container>
  );
}

function Item(props) {
  const { icon: Icon, onClick, children, command } = props;

  const isMACOS = navigator.userAgent.search("Mac") !== -1;

  return (
    <Option onClick={onClick}>
      <div>
        {Icon && <Icon className="icon" />}
        <span>{children}</span>
      </div>
      {command && (
        <span>{isMACOS ? command.replaceAll("Ctrl+", "⌘") : command}</span>
      )}
    </Option>
  );
}

Menu.Item = Item;

export default Menu;

const padding = 15;
const color = "#000000E0";

const Container = styled.div`
  .open {
    opacity: 1;
  }

  .close {
    opacity: 0;
  }
  width: ${({ width }) => width}px;
`;

const Option = styled.button`
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  background: none;
  border: none;
  outline: none;
  list-style: none;
  padding: 10px ${padding + 7.5}px;
  cursor: pointer;
  text-align: left;
  color: ${color} !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  span.icon {
    font-size: 15px;
  }

  div > span:nth-child(2) {
    width: ${({ width }) => width - 120}px;
    padding-left: 10px;
  }

  span {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 14px;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgb(0 0 0 / 0%);
    -webkit-letter-spacing: 0.2px;
    -moz-letter-spacing: 0.2px;
    -ms-letter-spacing: 0.2px;
    letter-spacing: 0.2px;
    visibility: visible;
    color: ${color} !important;
  }

  & > span:last-child {
    justify-self: flex-end;
    color: grey;
  }

  &:hover {
    background-color: rgba(238, 238, 238, 1);
  }
`;

const MenuContainer = styled.div`
  cursor: default;
  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  z-index: 1000;
  background-color: rgb(249, 250, 251);
  width: ${({ width }) => width}px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 14%), 0 6px 16px 0 rgb(0 0 0 / 10%),
    0 9px 28px 8px rgb(0 0 0 / 7%);
  backdrop-filter: blur(5px);
  border: none;
  padding: ${padding}px 0 ${padding}px 0px;
  transition: opacity ${({ duration }) => duration / 1000}s ease-in-out;
`;
