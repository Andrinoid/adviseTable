import styled from "styled-components";

export const Column = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 100px;
  border: dashed 1px transparent;
  &:hover {
    border: dashed 1px #9ca5ae;
  }
  ${({ $isDragging }) => {
    if ($isDragging) {
      return `
        border: dashed 1px #9ca5ae;
        background: rgb(255 255 255 / 50%);
      `;
    }
  }}
  padding: 10px;
  > .react-resizable-handle {
    background: none;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -6px;
    position: absolute;
    cursor: col-resize;
    transform: none;
    top: 0;
    margin: 0;
    z-index: 1;
  }

  @media (max-width: ${({ breakpoint }) => breakpoint}px) {
    width: 100% !important;
  }
`;

export const Inner = styled.div`
  /* border: dashed 1px #9ca5aea6; */
  box-sizing: border-box;
  /* height: 100%; */
`;

export const Toolbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  background: white;
  border: solid 1px #e8e8e8;
  border-radius: 3px;
  box-shadow: 0 0 4px 0px rgb(0 0 0 / 12%);
  display: none;
`;

export const ToolbarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

export const DraggableElm = styled.div`
  ${({ showHoverHandler }) => {
    if (showHoverHandler) {
      return `
        &:hover {
            .grid-toolbar {
              display: flex;
            }
          }
      `;
    }
  }}
  ${({ isResizing }) => {
    if (isResizing) {
      return `
        .grid-toolbar {
          display: flex !important;
        }
      `;
    }
  }}
  ${({ $isDragging }) => {
    if ($isDragging) {
      return `
      .grid-toolbar {
        display: flex !important;
      }
      `;
    }
  }}
  @media (max-width: ${({ breakpoint }) => breakpoint}px) {
    width: 100% !important;
  }
`;
