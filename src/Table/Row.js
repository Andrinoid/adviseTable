//jsx component
import { head } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import Col from './Col';

const RowElm = styled.div`
    position: relative;
`;

const Sub = styled.div`
    background: #f5f5f5;
    height: 310px;

`
const Row = ({
    index,
    topOffset,
    colWidth,
    colHeight,
    labelColWidth,
    toolBoxWidth,
    totalColWidth,
    numberOfDataCols,
    mode,
    Handle,
    children
}) => {

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
        console.log(children);

        let type;
        let left;
        let width;

        if (i == 0) {
            type = 'first';
            left = leftOffset;
            width = labelColWidth;
            console.log('first');

        } else if (i == numberOfDataCols + 1) { // plus one becuse the last col is not a dataCol e.g. total
            type = 'last';
            left = leftOffset + (numberOfDataCols * colWidth) + labelColWidth;
            width = totalColWidth;
            console.log('last');
        }
        else {
            type = 'middle';
            left = leftOffset + labelColWidth + ((i - 1) * colWidth);
            width = colWidth;
            console.log('middle');
        }

        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                id: `x${rowNumber}y${i + 1}`,
                x: rowNumber,
                y: i,
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
                Having cols as position absolute has no purpose yet, they could be inline block of ¯\_(ツ)_/¯ */}
            <RowElm style={{ height: colHeight }} >
                <Col
                    selectable={false}
                    style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}
                >
                    {mode === "edit" && Handle && <Handle />}
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