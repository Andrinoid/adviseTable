import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  flex-grow: 0;
  user-select: none;
  transition: ${({ isResizing }) =>
    isResizing ? "none" : "width 0.2s ease, opacity 0.1s ease"};
  flex-shrink: 0;
  width: 100%;
`;

const Handle = styled.div`
  position: absolute;
  top: 0;
  ${({ right }) => {
    if (right) {
      return "left: 0;";
    } else {
      return "right: 0;";
    }
  }}
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background-color: ${({ hoverActive, isResizing }) =>
    hoverActive || isResizing ? "rgb(232 232 232 / 79%)" : "transparent"};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(232 232 232 / 79%);
    transition: background-color 0.5s ease 0.5s;
  }
`;

const ResizableContainer = React.forwardRef(
  ({
    children,
    right,
    initialWidth = 320,
    minWidth = 0,
    maxWidth = Infinity,
  }) => {
    const containerRef = useRef(null);
    const handleRef = useRef(null);
    const prevClientXRef = useRef(null);

    const [w, setW] = useState(initialWidth);
    const [x, setX] = useState(0);
    const [newWidth, setNewWidth] = useState(initialWidth);
    const [isResizing, setIsResizing] = useState(false);

    const [hoverActive, setHoverActive] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEvents = (isHovered) => {
      clearTimeout(hoverTimeout.current);
      setHoverActive(isHovered);
    };

    const mouseDownHandler = (e) => {
      const { clientX } = e;
      setIsResizing(true);

      // capture the initial x position on drag start
      setX(clientX);
      // capture the initial container width on drag start
      setW(containerRef.current.offsetWidth);
    };

    const mouseMoveHandler = (e) => {
      if (!isResizing) return;

      // If the previous clientX position is null, assign the current clientX position
      if (prevClientXRef.current === null) {
        prevClientXRef.current = e.clientX;
        return;
      }

      const dx = e.clientX - x;
      let newWidth = right ? w - dx : w + dx;

      prevClientXRef.current = e.clientX;

      if (newWidth < minWidth) {
        const tension = w + dx - minWidth;
        if (tension < -150) {
          newWidth = 0;
        } else {
          newWidth = minWidth;
        }
      } else if (newWidth > maxWidth) {
        newWidth = maxWidth;
      }
      setNewWidth(newWidth);
    };

    const mouseUpHandler = () => {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      prevClientXRef.current = null;
      setIsResizing(false);
    };

    const handleDoubleClick = () => {
      setNewWidth(initialWidth);
    };

    useEffect(() => {
      if (!isResizing) return;
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
      return () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };
    }, [isResizing]);

    return (
      <Container
        ref={containerRef}
        style={{ width: newWidth }}
        isResizing={isResizing}
      >
        {children}

        <Handle
          onMouseDown={mouseDownHandler}
          onMouseEnter={() => handleMouseEvents(true)}
          onMouseLeave={() => handleMouseEvents(false)}
          onDoubleClick={handleDoubleClick}
          hoverActive={hoverActive}
          ref={handleRef}
          right={right}
        />
      </Container>
    );
  }
);

export default ResizableContainer;
