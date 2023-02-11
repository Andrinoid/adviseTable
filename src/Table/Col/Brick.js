import React, { memo } from "react";
import styled from "styled-components";
import HoverIndicator from "./HoverIndicator";

const BrickElm = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  background-color: inherit;
  transition: box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  box-sizing: border-box;
  user-select: none;
  font-size: 14px;
  z-index: 3;
  justify-content: ${(props) => props.horizontalAlign};
  ${({ style }) => {
    if (style?.position === "sticky") {
      return `
                &:after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: -1px;
                    width: 30px;
                    transform: translateX(100%);
                    transition: box-shadow .3s;
                    pointer-events: none;
                }
            `;
    }
  }}
  ${({ showGrid, theme }) => {
    if (showGrid) {
      return theme.grid;
    }
  }}
    ${({ location, theme }) => {
    if (location === "top") {
      return { ...theme.col, ...theme.header };
    }
    // else if (location === 'left') {
    // return theme.col;
    // }
  }}
`;

/**
 * The Brick component is the Columns of the table that does not hold data
 * they are used in the header and as the first column in every row
 * TODO ADD PARENT TYPE AS PROP TO ALLOW FOR HEADER STYLES
 */
const Brick = memo(
  ({
    horizontalAlign = "right",
    children,
    style,
    location, //top or left
    theTheme,
    showGrid,
  }) => {
    return (
      <BrickElm
        data-location={location}
        location={location}
        className="brick tableCol"
        data-selectable="false"
        horizontalAlign={horizontalAlign}
        theme={theTheme}
        showGrid={showGrid}
        style={{ ...style }}
      >
        <HoverIndicator className="hoverIndicator" />

        {children}
      </BrickElm>
    );
  }
);

export default Brick;
