import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Brick from '../Col/Brick';


const RowElm = styled.div`
    position: relative;
    ${({ type, hover }) => {
        if (type === 'primary') {
            return hover ? 'background: #e5f2fe;' : 'background: transparent;'
        }
        else if (type === 'secondary') {
            return hover ? 'background: #e5f2fe;' : 'background:#fafafa;'
        }
    }}  
`;

let Outliner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0.5px dashed transparent;
    pointer-events: none;
    z-index: 100;
    &.hightlighted {
        background: rgba(33,150,243,0.2);
    }
    &.outline-top {
        border-top: 1px dashed #65b2fe;
        border-left: 1px dashed #65b2fe;
        border-right: 1px dashed #65b2fe;
    }
    &.outline-bottom {
        border-bottom: 1px dashed #65b2fe;
        border-left: 1px dashed #65b2fe;
        border-right: 1px dashed #65b2fe;
    }
    &.outline-middle {
        border-left: 1px dashed #65b2fe;
        border-right: 1px dashed #65b2fe;
    }
}`;

// Copunter for instances of this component used for row number
let instancesCount = 0

const Row = ({
    type = 'primary',
    colWidth,
    colHeight,
    labelColWidth,
    toolBoxWidth,
    totalColWidth,
    numberOfDataCols,
    totalWidth,
    toolBoxContent,
    children,
    expandedIds,
    selectionMode,
    mouseDownColCord,
    mouseMoveColCord,
}) => {

    const currentRowRef = useRef(null);
    const [hover, setHover] = useState(false);
    const [rowNumber, setRowNumber] = useState(0);
    const leftOffset = toolBoxWidth;

    /** This is a hack to get the row number from the component instance
     * we could also use querySelectorAll to count the elements before this one 
     */
    useEffect(() => {
        setRowNumber(instancesCount++)
        return () => {
            setRowNumber(--instancesCount)
        }
    }, [expandedIds])

    const createOutlineClasses = (min, max, rowNumber) => {
        let classes = [];
        if (rowNumber == min) {
            classes.push('outline-top');
        }
        if (rowNumber == max) {
            classes.push('outline-bottom');
        }
        if (rowNumber > min && rowNumber < max) {
            classes.push('outline-middle');
        }
        classes.push('hightlighted');
        return classes.join(' ');
    }

    const isHightlighted = () => {
        if (selectionMode !== 'row') return false;
        let isInSelection = false;
        let min;
        let max;

        if (mouseDownColCord && mouseMoveColCord) {
            min = Math.min(mouseDownColCord[1], mouseMoveColCord[1]);
            max = Math.max(mouseDownColCord[1], mouseMoveColCord[1]);

            if (rowNumber >= min && rowNumber <= max) {
                isInSelection = true;
            }
        }

        if (mouseDownColCord && !mouseMoveColCord) {
            if (rowNumber == mouseDownColCord[1]) {
                isInSelection = true;
                min = rowNumber;
                max = rowNumber;
            }

        }

        if (isInSelection) {
            return createOutlineClasses(min, max, rowNumber)
        }
    }




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
                // className={isHightlighted()}
                type={type}
                hover={hover}
                style={{ height: colHeight, width: totalWidth }} ref={currentRowRef} y={rowNumber}
            >
                <Outliner className={isHightlighted()} />
                {toolBoxContent &&
                    <Brick
                        horizontalAlign='left'
                        style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}
                    >
                        {toolBoxContent}
                    </Brick>
                }

                {childrenWithProps}

            </RowElm>
        </>
    )
}

export default Row;