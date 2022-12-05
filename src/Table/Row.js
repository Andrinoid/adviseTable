import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Col from './Col';

const RowElm = styled.div`
    position: relative;
    ${({ hover }) => hover ? 'background: #e5f2fe;' : 'background: #fff;'}
    
`;

let instancesCount = 0

const Row = ({
    colWidth,
    colHeight,
    labelColWidth,
    toolBoxWidth,
    totalColWidth,
    numberOfDataCols,
    totalWidth,
    toolBoxContent,
    children
}) => {

    const currentRowRef = useRef(null);
    const [hover, setHover] = useState(false);
    const leftOffset = toolBoxWidth;

    const [rowNumber, setRowNumber] = useState(0);
    // count the number of cols to determine the id the total col
    let counter = 0;

    useEffect(() => {
        instancesCount += 1
        setRowNumber(instancesCount)
        return () => {
            instancesCount -= 1
            setRowNumber(instancesCount)
        }
    }, [])

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
                id: `x${i}y${rowNumber}`,
                y: rowNumber,
                x: i,
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
            <RowElm
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                hover={hover}
                style={{ height: colHeight, width: totalWidth }} ref={currentRowRef} y={rowNumber}
            >
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