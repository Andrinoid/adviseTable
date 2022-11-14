import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TableContext } from "./context";

const cellPaddingLeftRight = 5;

const SpaceAround = styled.div`
    padding: 0 ${cellPaddingLeftRight}px;
    font-size: 14px;
    // background: ${props => props.isOverflowing ? 'red' : 'transparent'};
`;

const Cell = ({ children, parentWidth, parentType }) => {
    const ref = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [cellWidth, setCellWidth] = useState(null)
    const {
        totalWidth,
        setTotalWidth,
        labelColWidth,
        setlabelColWidth,
        totalColWidth,
        setTotalColWidth,
        setBiggestDataCellWidth,
        biggestDataCellWidth,
        setBiggestLabelCellWidth,
        biggestLabelCellWidth,
        setBiggestTotalCellWidth,
        biggestTotalCellWidth,
    } = useContext(TableContext);

    function getElementWidth(element) {
        const style = element.currentStyle || window.getComputedStyle(element);
        const width = element.offsetWidth;
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width + margin + padding + border;
    }
    useEffect(() => {
        // Find the widest cell so table can be adjusted to fit
        if (parentType === 'data') {
            if (getElementWidth(ref.current) > biggestDataCellWidth) {
                setBiggestDataCellWidth(getElementWidth(ref.current));
            }
        }
        if(parentType === 'label') {
            if (getElementWidth(ref.current) > biggestLabelCellWidth) {
                setBiggestLabelCellWidth(getElementWidth(ref.current));
            }
        }
        if(parentType === 'total') {
            if (getElementWidth(ref.current) > biggestTotalCellWidth) {
                setBiggestTotalCellWidth(getElementWidth(ref.current));
            }       
        }

    }, [cellWidth, biggestDataCellWidth]);

    useEffect(() => {
        setCellWidth(ref.current.offsetWidth);

        if (cellWidth > parentWidth) {
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);
        }

    }, [parentWidth, cellWidth, totalWidth]);

    useEffect(() => {
        if (isOverflowing) {
            if (parentType === 'label') {
                // setlabelColWidth(labelColWidth+ 20)
            }
            if (parentType === 'data') {
                // setTotalWidth(totalWidth + 20);
            }
            if (parentType === 'total') {
                // setTotalColWidth(totalColWidth + 20);
            }
        }
    }, [isOverflowing, totalWidth]);



    return (
        <SpaceAround ref={ref} isOverflowing={isOverflowing} onClick={()=> console.log(getElementWidth(ref.current))}>
            {children}
        </SpaceAround>
    );
};

export default Cell;