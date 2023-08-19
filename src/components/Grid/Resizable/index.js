import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Handler } from "./styled";
import { Resizing, ResizingMouseEvents } from "./hooks";
import { DataContext } from "../Grid";

export default function Resizable({
  children,
  snapPoints = [],
  onResizeStart = () => {},
  onResizeEnd = () => {},
  onResize = () => {},
  enabled = true,
}) {
  const { totalWidth, isResizing, leftGap } = useContext(DataContext);
  const [resizing, setResizing] = useState(false);
  const [x, setX] = useState(0);
  const [width, setWidth] = useState(0);
  const changing = useRef(false);
  const ref = useRef(null);
  const handlerRef = useRef(null);

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
    totalWidth,
    handlerRef,
  });

  return (
    <Container ref={ref}>
      {children} {enabled && <Handler ref={handlerRef} x={x} />}
    </Container>
  );
}
