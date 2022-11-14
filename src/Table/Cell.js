import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TableContext } from "./context";

const SpaceAround = styled.div`
    padding: 0 5px;
    background: ${props => props.isOverflowing ? 'red' : 'transparent'};
`;

const Cell = ({children, parentWidth}) => {
    const ref = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const { colWidth } = useContext(TableContext);
    const [cellWidth, setCellWidth] = useState(null)

    useEffect(() => {
        setCellWidth(ref.current.offsetWidth);
        if(cellWidth > parentWidth) {
            console.log('cell is overflowing');
            setIsOverflowing(true);
        } else {
            console.log('cell is not overflowing');
            setIsOverflowing(false);
        }

    }, [parentWidth, cellWidth]);


    
    return (
        <SpaceAround ref={ref} isOverflowing={isOverflowing}>
            {children}
        </SpaceAround>
    );
};

export default Cell;