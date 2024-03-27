import styled from 'styled-components';

export const Column = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 20px;
  border: dashed 1px transparent;
  ${({ editing }) => {
    if (editing) {
      return `
        &:hover {
          border: dashed 1px #9ca5ae;
        }
      `;
    }

    return '';
  }}
  ${({ active }) => {
    if (active) {
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

  ${({ breakpoint, stacked }) => {
    if (stacked) {
      return 'width: 100% !important;';
    }

    return `
      @media (max-width: ${breakpoint}px) {
        width: 100% !important;
      }
    `;
  }}
`;

export const Inner = styled.div`
  border: dashed 1px ${({ active }) => (active ? '#d3d7db' : 'transparent')};
  box-sizing: border-box;
  /* height: 100%; */
`;

export const Toolbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
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
  height: 100%;
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
  ${({ displayFlex }) => {
    if (displayFlex) {
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
