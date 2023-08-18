import React, { useEffect, useRef, useState } from "react";
import { Container, Handler } from "./styled";
import { Resizing, ResizingMouseEvents } from "./hooks";

export default function Resizable({
  resizing: isResizing,
  children,
  leftGap,
  snapPoints = [],
  onResizeStart = () => {},
  onResizeEnd = () => {},
  onResize = () => {},
  enabled = true,
}) {
  const [resizing, setResizing] = useState(false);
  const [x, setX] = useState(0);
  const [width, setWidth] = useState(0);
  const changing = useRef(false);
  const ref = useRef(null);

  Resizing({
    changing,
    resizing,
    x,
    snapPoints,
    width,
    onResizeStart,
    onResizeEnd,
    onResize,
    ref,
  });

  ResizingMouseEvents({
    globalIsResizing: isResizing,
    changing,
    resizing,
    leftGap,
    x,
    snapPoints,
    setWidth,
    setResizing,
    setX,
    ref,
  });

  return (
    <Container ref={ref}>
      {children} {enabled && <Handler x={x} />}
    </Container>
  );
}
