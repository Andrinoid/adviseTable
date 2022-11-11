import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const Col = styled.div`
    background: #fff;
    box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: left;
    position: absolute;
    user-select: none;
`;
const Resizer = styled.div`
    position: absolute;
    top: 0;
    ${({direction})=> {
        return direction === 'right' ? 'right: 0;' : 'left: 0;'
    }}
    width: 5px;
    height: 100%;
    cursor: col-resize;
    background: ${props => props.isResizing ? '#64b2fe' : 'transparent'};
    &:hover {
        background: #64b2fe;
    }
`;

const Line = styled.div`
    position: absolute;
    top: 0;
    ${({direction})=> {
        return direction === 'right' ? 'right: 1px;' : 'left: 1px;'
    }}
    right: 1px;
    width: 1px;
    height: ${props => props.height}px;
    background: #64b2fe;
    z-index: 1;
    display: ${props => props.isResizing ? 'block' : 'none'};
`;

const ResizablelCol = ({ children, viewportHeight, onResize, direction='right', style }) => {

    const [w, setW] = useState(0);
    const [x, setX] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef(null);
    const colRef = useRef(null);

    // useLayoutEffect(() => {
    //     setW(colRef.current.offsetWidth);
    // }, []);
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

    }, [x]);

    const mouseDownHandler = (e) => {
        // Get the current mouse position
        setX(e.clientX);
        setW(colRef.current.offsetWidth);
    };
    
    const mouseMoveHandler = (e) => {
        // How far the mouse has been moved

        setIsResizing(true);
        let newWidth;
        let dx;
        // revert logic based on direction
        if (direction === 'right') {
            dx = e.clientX - x;
            newWidth = w + dx;
        } else {
            dx = x - e.clientX;
            newWidth = w + dx;
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
        <Col
            ref={colRef}
            style={{...style }}
        >
            {children}
            <Resizer
                onMouseDown={mouseDownHandler}
                direction={direction}
                isResizing={isResizing}
                ref={resizeRef}
            >
                <Line
                    height={viewportHeight}
                    isResizing={isResizing}
                    direction={direction}
                />
            </Resizer>
        </Col>
    )
}

export default ResizablelCol;