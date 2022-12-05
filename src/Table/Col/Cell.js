import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TableContext } from "../context";

const cellPaddingLeftRight = 5;

const SpaceAround = styled.div`
    padding: 0 ${cellPaddingLeftRight}px;
    font-size: 14px;
    // background: ${props => props.isOverflowing ? 'red' : 'transparent'};
`;

// x and y are only for debugging if needed
const Cell = ({ children, parentWidth, parentType, x, y }) => {
    const ref = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [cellWidth, setCellWidth] = useState(null)

    // Get the context we need
    const {
        totalWidth,
        setBiggestDataCellWidth,
        biggestDataCellWidth,
        setBiggestLabelCellWidth,
        biggestLabelCellWidth,
        setBiggestTotalCellWidth,
        biggestTotalCellWidth,
    } = useContext(TableContext);

    /**
     * This functionn gets the total width of an element, we use it to check if the cell is overflowing
     */
    function getElementWidth(element) {
        const style = element.currentStyle || window.getComputedStyle(element);
        const width = element.offsetWidth;
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width + margin + padding + border;
    }

    /**
     * Find the widest cell and set it as context so we can use it to auto adjust the width of the columns
     */
    useEffect(() => {
        if (parentType === 'middle') {
            if (getElementWidth(ref.current) > biggestDataCellWidth) {
                setBiggestDataCellWidth(getElementWidth(ref.current));
            }
        }
        if(parentType === 'first') {
            if (getElementWidth(ref.current) > biggestLabelCellWidth) {
                setBiggestLabelCellWidth(getElementWidth(ref.current));
            }
        }
        if(parentType === 'last') {
            if (getElementWidth(ref.current) > biggestTotalCellWidth) {
                setBiggestTotalCellWidth(getElementWidth(ref.current));
            }       
        }
        // im not sure if we should run on every render
        // or cellWidth, biggestDataCellWidth. keeping this as reference
    }, []);

    /**
     * Check if the cell is overflowing and set the state
     */
    useEffect(() => {
        if (ref.current.offsetWidth > parentWidth) {
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);    
        }

    }, [parentWidth, totalWidth]);

    return (
        <SpaceAround ref={ref} isOverflowing={isOverflowing}>
            {children}
            {/* x{x} y{y} */}
        </SpaceAround>
    );
};

export default Cell;