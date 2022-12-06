import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Col from '../Col';


const RowElm = styled.div`
    position: relative;
    ${({type, hover})=> {
        if(type === 'primary') {
            return  hover ? 'background: #e5f2fe;' : 'background: transparent;'
        }
        else if (type === 'secondary') {
            return hover ? 'background: #e5f2fe;' : 'background:#fafafa;'
        }
    }}
    // ${({ hover }) => hover ? 'background: #e5f2fe;' : 'background: #transparent;'}
`;

// Copunter for instances of this component used for row number
let instancesCount = 0

const Row = ({
    type='primary',
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
    const [rowNumber, setRowNumber] = useState(0);
    const leftOffset = toolBoxWidth;

    /** This is a hack to get the row number from the component instance
     * we could also use querySelectorAll to count the elements before this one 
     */ 
    useEffect(() => {
        instancesCount += 1
        setRowNumber(instancesCount)
        return () => {
            instancesCount -= 1
            setRowNumber(instancesCount)
        }
    }, [])

    /**
     * Map over the children that should be Col components and add the props we need
     * We want to keep the Col component simple for the user so we inject the props here
     * We have three types of cols: first, middle and last becuase first and last cols have different widths
     * and are rezisable. Data cols however are not resizable and have the same width
     */ 
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
        return child;
    });

    return (
        <>
            {/* We only need the height here because all cols are position absolute
              * Having cols as position absolute has no purpose yet, they could be inline block  ¯\_(ツ)_/¯ 
              */}
            <RowElm
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                type={type}
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