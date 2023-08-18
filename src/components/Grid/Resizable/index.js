import React, { useEffect, useRef, useState } from "react";
import { Container, Handler } from "./styled";
import { Resizing, ResizingMouseEvents } from "./hooks";

export default function Resizable({
  children,
  leftGap,
  onResizeStart = () => {},
  onResizeEnd = () => {},
  onResize = () => {},
  enabled = true,
}) {
  const [resizing, setResizing] = useState(false);
  const [x, setX] = useState(0);
  const changing = useRef(false);
  const ref = useRef(null);

  Resizing({
    changing,
    resizing,
    x,
    onResizeStart,
    onResizeEnd,
    onResize,
    ref,
  });

  ResizingMouseEvents({
    changing,
    resizing,
    leftGap,
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
