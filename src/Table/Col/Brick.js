import React, { memo } from "react";
import styled from "styled-components";

const BrickElm = styled.div`
    display: inline-flex;
    align-items: center;
    background-color: inherit;
    box-sizing: border-box;
    user-select: none;
    font-size: 14px;
    z-index: 1;
    justify-content: ${props => props.horizontalAlign};
    ${({ showGrid, theme }) => {
        if (showGrid) {
            return theme.grid;
        }
    }}
    ${({ location, theme }) => {
        if (location === 'top') {
            return { ...theme.col, ...theme.header };
        }
        // else if (location === 'left') {
            // return theme.col;
        // }
    }}
`;
const HoverIndicator = styled.div`
  position: absolute;
  inset: 0;
  background: #5b95d6;
  opacity: 0.1;
  display: none;
`;
/**
 * The Brick component is the Columns of the table that does not hold data
 * they are used in the header and as the first column in every row
 * TODO ADD PARENT TYPE AS PROP TO ALLOW FOR HEADER STYLES
 */
const Brick =memo(({
    horizontalAlign = 'right',
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
            horizontalAlign={horizontalAlign}
            theme={theTheme}
            showGrid={showGrid}
            style={{ ...style }}
        >   
         <HoverIndicator className='hoverIndicator' />

            {children}
        </BrickElm>
    );
});

export default Brick;