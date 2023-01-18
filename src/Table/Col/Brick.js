import React, { useContext, memo } from "react";
import styled from "styled-components";
import { TableContext } from '../context';

const BrickElm = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    user-select: none;
    box-sizing: border-box;
    font-size: 14px;
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
        else if (location === 'left') {
            return theme.col;
        }
    }}
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
}) => {

    // Get the context we need
    const {
        theTheme,
        showGrid,
    } = useContext(TableContext);

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
            {children}
        </BrickElm>
    );
});

export default Brick;