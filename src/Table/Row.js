//jsx component
import { head } from 'lodash';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Col from './Col';

const RowElm = styled.div`
    position: relative;
    &:hover {
        background: #e5f2fe;
        box-shaddow: inset 0 0 2px #e5f2fe;
    }
`;

const Row = ({
    index,
    topOffset,
    colWidth,
    colHeight,
    labelColWidth,
    toolBoxWidth,
    totalColWidth,
    numberOfDataCols,
    totalWidth,
    toolBoxContent,
    setTableMatrix,
    tableMatrix,
    children
}) => {

    const currentRowRef = useRef(null);
    const currentColRef = useRef(null);
    const leftOffset = toolBoxWidth;
    // initial row number is one 
    let rowNumber = index;
    // count the number of cols to determine the id the total col
    let counter = 0;

    // push an array to the setTableMatrix for each row
    // this array will hold the refs for each col in the row
    if (tableMatrix.length < rowNumber + 1) {
        tableMatrix.push([]);
    }





    // if (!tableMatrix[rowNumber]) {
    //     setTableMatrix(prev => {
    //         prev[rowNumber] = currentRowRef;
    //         return prev;
    //     });

    // }
     


    const childrenWithProps = React.Children.map(children, (child, i) => {

        let type;
        let left;
        let width;

        if (i == 0) {
            type = 'first';
            left = leftOffset;
            width = labelColWidth;
        } 
        else if (i == numberOfDataCols + 1) { // plus one becuse the last col is not a dataCol e.g. total
            type = 'last';
            left = leftOffset + (numberOfDataCols * colWidth) + labelColWidth;
            width = totalColWidth;
        }
        else {
            type = 'middle';
            left = leftOffset + labelColWidth + ((i - 1) * colWidth);
            width = colWidth;
        }

        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                id: `x${rowNumber}y${i + 1}`,
                x: rowNumber,
                y: i,
                ref: currentColRef,
                type,
                style: { width: width, height: colHeight, top: 0, left: left }
            });
        }        

        counter++;
        return child;
    });

    return (
        <>
            {/* We need the height here because all cols are position absolute
                Having cols as position absolute has no purpose yet, they could be inline block  ¯\_(ツ)_/¯ */}
            <RowElm style={{ height: colHeight, width: totalWidth }} ref={currentRowRef}>
                <Col
                    horizontalAlign='left'
                    selectable={false}
                    style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}
                >
                    {toolBoxContent && toolBoxContent}
                </Col>

                {childrenWithProps}

            </RowElm>

        </>
    )
}

export default Row;