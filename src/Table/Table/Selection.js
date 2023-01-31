import { set } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
    position: absolute;
    background-color: rgb(14, 101, 235, 0.1);
    border: 1px solid #2196f3;
    z-index: 0;
    width: 100px;
    height: 100px;
    pointer-events: none

`;

/**
 * This component renders elements showing the selectedAreas
 */
const Selection = ({
    selectedAreas,
    colWidth,
    colHeight,
    leftOffset,
    firstColWidth,
    lastColWidth,
    numberOfCols,
    selectionMode,
    totalWidth,
    lasColumnRisizeable,
}) => {

    const [dimensions, setDimensions] = useState([])


    const calculateDimensions = (selection = {}) => {
        
        let includesFirstCol = selection.fromX === 0;
        let includesLastCol = selection.toX === numberOfCols - 1;

        let { fromX, fromY, toX, toY } = selection;
        // console.log(fromX, fromY, toX, toY)
        let top = fromY * colHeight;
        let left = fromX * colWidth + leftOffset;
        let width = (toX - fromX + 1) * colWidth;
        let height = (toY - fromY + 1) * colHeight;

        //Check if the first col is in the selection. It has it's own width so we need to take that into account.
        if (includesFirstCol) {
            // update width with the difference between the firstColWidth and colWidth
            width += firstColWidth - colWidth;
        } else {
            // update left with the difference between the firstColWidth and colWidth
            left += firstColWidth - colWidth;
        }
        //Check if the last col is in the selection. It has it's own width so we need to take that into account.
        if (includesLastCol && lasColumnRisizeable) {
            // update width with the difference between the LastColWidth and colWidth
            width += lastColWidth - colWidth;
        }
        return { top, left, width, height, selection}
    };

    useEffect(() => {
        if (selectedAreas.length === 0) {
            setDimensions([]);
            return;
        }
        //for selectedAreas, calculate the dimensions
        let dimensions = selectedAreas.map((selection) => {
            return calculateDimensions(selection)
        })
        setDimensions(dimensions)

    }, [selectedAreas])

    const rowSelectionStyles = {
        width: totalWidth,
        left:0,
        zIndex: 101,
    }


    return (
        <>
            {dimensions.map((dimension, index) => {
                return (
                    <Box
                        key={index}
                        style={{ ...dimension, ...(selectionMode === 'row' && rowSelectionStyles) }}
                    />
                )
            })}

        </>
    )
};

export default Selection;