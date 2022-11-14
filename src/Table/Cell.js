import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TableContext } from "./context";

const SpaceAround = styled.div`
    padding: 0 5px;
    background: ${props => props.isOverflowing ? 'red' : 'transparent'};
`;

const Cell = ({children, parentWidth, parentType}) => {
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

    } = useContext(TableContext);

    useEffect(() => {
        setCellWidth(ref.current.offsetWidth);
        if(cellWidth > parentWidth) {
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);
        }

    }, [parentWidth, cellWidth, totalWidth]);

    useEffect(() => {
        if(isOverflowing) {
        if (parentType === 'label') {
            setlabelColWidth(labelColWidth+ 20)
        }
        if(parentType === 'data') {
            setTotalWidth(totalWidth + 20);
        }
        if(parentType === 'total') {
            setTotalColWidth(totalColWidth + 20);
        }
        }
    }, [isOverflowing, totalWidth]);


    
    return (
        <SpaceAround ref={ref} isOverflowing={isOverflowing}>
            {children}
        </SpaceAround>
    );
};

export default Cell;