import React, {useEffect, useState} from "react";
import styled from "styled-components";

const Box = styled.div`
    position: absolute;
    background-color: rgb(14, 101, 235, 0.1);
    // background: rgba(33,150,243,0.2);
    // opacity: 0.2;
    border: 1px solid #2196f3;
    z-index: 2200;
    width: 100px;
    height: 100px;
    pointer-events: none

`;


const Selection = ({
    selectedAreas, 
    colWidth, 
    colHeight, 
    leftOffset,
    firstColWidth,
    lastColWidth,
    numberOfCols,
}) => {

    const [dimensions, setDimensions] = useState({top: 0, left: 0, width: 30, height: 30})
    
    useEffect(() => {
        console.log("selectedAreas", selectedAreas)
        if (selectedAreas.length === 0) {
            return;
        }

        let includesFirstCol = selectedAreas.some(area => area.fromX === 0);
        let includesLastCol = selectedAreas.some(area => area.toX === numberOfCols - 1);


        let {fromX, fromY, toX, toY} = selectedAreas[0];
        // console.log(fromX, fromY, toX, toY)
        let top = fromY * colHeight;
        let left = fromX * colWidth + leftOffset;
        let width = (toX - fromX + 1) * colWidth;
        let height = (toY - fromY + 1) * colHeight;

        if (includesFirstCol) {
            // update width with the difference between the firstColWidth and colWidth
            width += firstColWidth - colWidth;
        } else {
            // update left with the difference between the firstColWidth and colWidth
            left += firstColWidth - colWidth;
        }
        if(includesLastCol) {
            // update width with the difference between the LastColWidth and colWidth
             width += lastColWidth - colWidth;
        } 


        setDimensions({top, left, width, height})

    }, [selectedAreas])

    return <Box 
        id="selBox"
        style={{...dimensions}}
    />;
};

export default Selection;