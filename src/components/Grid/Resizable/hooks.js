import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export function Resizing({
  x,
  changing,
  resizing,
  onResizeStart,
  onResizeEnd,
  onResize,
  width,
}) {
  useEffect(() => {
    if (changing.current) {
      if (resizing) {
        onResizeStart();
      } else {
        onResizeEnd(width, x);
        changing.current = false;
      }
    }
  }, [resizing, onResizeStart, onResizeEnd, changing.current]);

  useEffect(() => {
    if (onResize && x) {
      onResize(width, x);
    }
  }, [width]);
}

export function ResizingMouseEvents({
  globalIsResizing,
  resizing,
  leftGap,
  setResizing,
  setX,
  x,
  setWidth,
  snapPoints,
  ref,
  changing,
  totalWidth,
  handlerRef,
}) {
  useEffect(() => {
    if (resizing) {
      function handleMouseUp(e) {
        setResizing(false);
      }

      function handleMouseMove(e) {
        if (resizing && ref.current) {
          const value = e.clientX - leftGap;

          setX(value);

          const { current: el } = ref;
          setWidth(Math.floor(value - el.offsetLeft + 2));
        }
      }

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [resizing, leftGap, x, setX, snapPoints]);

  useEffect(() => {
    if (ref.current) {
      const { current: el } = ref;

      setX(el.offsetLeft + el.offsetWidth - 2);
    }
  }, [ref.current, globalIsResizing, totalWidth]);

  useLayoutEffect(() => {
    if (handlerRef.current) {
      function handleMouseDown(e) {
        setResizing(true);

        changing.current = true;
      }

      handlerRef.current.addEventListener("mousedown", handleMouseDown);
    }
  }, []);
}
