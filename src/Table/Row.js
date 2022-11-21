//jsx component
import React, { useState } from 'react';
import styled from 'styled-components';
import { default as mo } from "../data/months";
import { numberToLetter } from './utils';
import Col from './Col';


const RowElm = styled.div`
    position: relative;
`;

const Sub = styled.div`
    background: #f5f5f5;
    height: 310px;

`
const Row = ({ row, index, selectedMonths, topOffset, colWidth, colHeight, labelColWidth, toolBoxWidth, totalColWidth, totalMonths, handleProps, mode, Handle, children, hideTotal = false }) => {

    const [expanded, setExpanded] = useState(false);
    // calculate the top position of the row
    const topPosition = (index * 50) + topOffset;

    const leftOffset = toolBoxWidth;
    // initial row number is one 
    let rowNumber = index;
    // count the number of cols to determine the id the total col
    let counter = 0;
    
    const expand = () => {
        setExpanded(!expanded);
    }
    
    const childrenWithProps = React.Children.map(children, (child, i) => {

        let length = children[1].length;
        let type;
        let left;
        let width;
        if (i == 0) {
            type = 'first';
            left = leftOffset;
            width = labelColWidth;
        
        } else if (i == length +1) {
            type = 'last';
            left = leftOffset + (totalMonths * colWidth) + labelColWidth;   
            width = totalColWidth;
        } 
        else {
            type = 'middle';
            left =  leftOffset + labelColWidth + ((i - 1) * colWidth);
            width = colWidth;
        }

        if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
                id:`x${rowNumber}y${i + 1}`,
                x: rowNumber,
                y: 0,
                type,
                style: { width: width, height: colHeight, top: 0, left: left }
            });
        }
        counter++;
        return child;
    });

    return (
        <>  

            {/* //Do we need the height here? */}
            <RowElm style={{ height: colHeight }} >
                {/*Technically toolbox is not a col use another component*/}
                <Col
                    selectable={false}
                    style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}
                    >
                    {mode === "edit" && <Handle />}
                    <div onClick={expand}>+</div>
                </Col>

                {childrenWithProps}
                
            </RowElm>

            {expanded &&
                <Sub>
                    expanded Row
                </Sub>
            }
        </>
    )
}

export default Row;