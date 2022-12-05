//react component  
import React, { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { TableContext } from './context';
import Cell from './Cell';


const Column = styled.div`
    //background: ${props => props.selected ? '#e9f0fd' : 'white'};
    // background: white;
    // box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: ${props => props.horizontalAlign};
    position: absolute;
    user-select: none;
    // transition: all 0.2s ease;
    border: 1px solid transparent;
    box-sizing: border-box;
    &.hightlighted {
        background: rgba(33,150,243,0.2);;
    }
    &.outline-left {
        border-left: 1px solid #65b2fe;
    }
    &.outline-right {
        border-right: 1px solid #65b2fe;
    }
    &.outline-top {
        border-top: 1px solid #65b2fe;
    }
    &.outline-bottom {
        border-bottom: 1px solid #65b2fe;
    }
`;

const Col = ({
    horizontalAlign = 'right',
    children,
    style = {},
    type,
    id,
    x,
    y,
    empty = false
}) => {
    // I need two refs on the col
    const currentColRef = useRef(null);
    const {
        mouseDownColCord,
        mouseMoveColCord,
        setTableMatrix,
        tableMatrix,
        theTheme,
    } = useContext(TableContext);

    /*
    *  Construct the matrix
    */
    useEffect(() => {
        if (tableMatrix[y]) {
            setTableMatrix(prev => {
                prev[y][x] = currentColRef;
                return prev;
            });
        } else {
            setTableMatrix(prev => {
                prev.push([[currentColRef]]);
                return prev;
            });
        }
    }, [y, x]);




    const createOutlineClasses = (minX, maxX, minY, maxY) => {
        let classes = [];
        if (y === minY) classes.push('outline-top');
        if (y === maxY) classes.push('outline-bottom');
        if (x === minX) classes.push('outline-left');
        if (x === maxX) classes.push('outline-right');
        classes.push('hightlighted');
        return classes.join(' ');
    }

    /**
     * Calculate the selected area
     * Note that we can not draw the selected area here, because we are in a single column component
     * Selected rectange needs to be on a higher level component
     */
    const isHightlighted = () => {

        let isX = false;
        let isY = false;
        let minX;
        let maxX;
        let minY;
        let maxY;

        if (mouseDownColCord && mouseMoveColCord) {
            // Find the min and max of the mouseDownColCord and mouseMoveColCord
            minX = Math.min(mouseDownColCord[0], mouseMoveColCord[0]);
            maxX = Math.max(mouseDownColCord[0], mouseMoveColCord[0]);
            minY = Math.min(mouseDownColCord[1], mouseMoveColCord[1]);
            maxY = Math.max(mouseDownColCord[1], mouseMoveColCord[1]);

            // Check if the current column is in the selected area
            if (x >= minX && x <= maxX) {
                isX = true;
            }
            if (y >= minY && y <= maxY) {
                isY = true;
            }
        }
        if (mouseDownColCord && !mouseMoveColCord) {

            if (x == mouseDownColCord[0] && y == mouseDownColCord[1]) {
                isX = true;
                isY = true;
                minX = x;
                maxX = x;
                minY = y;
                maxY = y;
            }
        }
        if (isX && isY) {
            return createOutlineClasses(minX, maxX, minY, maxY, x, y);
        }
        return false;
    }

    return (
        <Column
            horizontalAlign={horizontalAlign}
            style={{ ...theTheme.col, ...style }}
            ref={currentColRef}
            x={x}
            y={y}
            data-x={x}
            data-y={y}
            type={type}
            id={id}
            className={`tableCol ${isHightlighted()}`}
        >
            {!empty &&
                <Cell parentWidth={style.width} parentType={type}>
                    {children}
                </Cell>
            }
            {/* empty Col's are used by ResizableCols for a child ref as I could not manage to have two ref on the cell, 
            one for the matrix and another for the resize. The solution is to use empty col in resizeCol and fill the space 
            with a child for mesurements 
            */}
            {empty && <>{children}</>}
        </Column>
    )
}

export default Col;