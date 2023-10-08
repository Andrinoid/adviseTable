import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Handle, Container } from "./styles";

const Resizable = ({
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
};

Resizable.propTypes = {
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  initialWidth: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
};

export default Resizable;
