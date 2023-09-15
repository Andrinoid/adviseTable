import React, { forwardRef, useContext, useRef, useState } from "react";
import { Container, Handler } from "./styled";
import { Resizing, ResizingMouseEvents } from "./hooks";
import { DataContext } from "../Grid";

export default forwardRef(function Resizable(
  {
    children,
    onResizeStart = () => {},
    onResizeEnd = () => {},
    onResize = () => {},
    enabled = true,
  },
  resizableRef
) {
  const {
    totalWidth,
    isResizing,
    leftGap,
    snapPoints = [],
  } = useContext(DataContext);
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
    resizableRef,
  });

  return (
    <Container ref={ref}>
      {children}
      <Handler
        active={resizing}
        ref={handlerRef}
        x={x}
        style={!enabled ? { display: "none" } : {}}
      />
    </Container>
  );
});
