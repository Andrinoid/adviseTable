import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  flex-grow: 0;
  user-select: none;
  transition: ${({ isResizing }) =>
    isResizing ? "none" : "width 0.2s ease, opacity 0.1s ease"};
  flex-shrink: 0;
  width: ${({ width }) => width}px;
`;

export const Handle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background-color: ${({ hoverActive, isResizing }) =>
    hoverActive || isResizing ? "rgb(232 232 232 / 79%)" : "transparent"};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(232 232 232 / 79%);
    transition: background-color 0.5s ease 0.5s;
  }
`;
