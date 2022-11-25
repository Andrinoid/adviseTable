import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { TableContext } from "./context";

const Selected = styled.div`
    position: absolute;
    // background: #65b2fe;
    display: flex;
    align-items: center;
    justify-content: right;
    // border: 2px solid #65b2fe;
    box-shadow: inset 0 0 0 2px #65b2fe;
    // transition: all 0.2s ease;
    pointer-events: none;
`;

const SelectedCol = ({width, height, offsetTop, offsetLeft}) => {

    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const {selectedCol, colWidth, colHeight} = useContext(TableContext);

    useEffect(() => {
        console.log('selectedCol', selectedCol);
        console.log('colWidth', colWidth);
        console.log('colHeight', colHeight);
        setTop(selectedCol.x * height + offsetTop);
        setLeft(selectedCol.y * width + offsetLeft);
        
    }, [selectedCol]);

    return <Selected style={{...selectedCol.style, top: top }}></Selected>;
};

export default SelectedCol;

