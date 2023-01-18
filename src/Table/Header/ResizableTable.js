import React, { useRef, useState, useEffect, memo } from 'react';
import styled from 'styled-components';

const Resizer = styled.div`
    position: absolute;
    top: 0;
    ${({direction})=> {
        return direction === 'right' ? 'right: 0;' : 'left: 0;'
    }}
    width: 10px;
    height: 10px;
    cursor: e-resize;
    background: ${props => props.isResizing ? '#64b2fe' : 'transparent'};
    &:hover {
        background: #64b2fe;
    }
`;
//width gæti verið vitlaus en þá þarf að mæla containerinn með ref
const ResizableTable = memo(({width, onResize, direction='right'}) => {

    const [x, setX] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef(null);

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        // Attach the listeners to `document` when x changes
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

    }, [x]);

    const mouseDownHandler = (e) => {
        // Get the current mouse position
        setX(e.clientX);
        // setW(colRef.current.offsetWidth);
    };
    
    const mouseMoveHandler = (e) => {
        // How far the mouse has been moved

        setIsResizing(true);
        let newWidth;
        let dx;
        // revert logic based on direction
        if (direction === 'right') {
            dx = e.clientX - x;
            newWidth = width + dx;
        } else {
            dx = x - e.clientX;
            newWidth = width + dx;
        }
        onResize(newWidth);
    };

    const mouseUpHandler = () => {
        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        setIsResizing(false);
    };

    return (
        <Resizer
            onMouseDown={mouseDownHandler}
            direction={direction}
            isResizing={isResizing}
            ref={resizeRef}
        />
    )
});

export default ResizableTable;