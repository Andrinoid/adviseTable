import React, { useEffect, useLayoutEffect, useState } from "react";

export function Resizing({
  changing,
  resizing,
  onResizeStart,
  onResizeEnd,
  onResize,
  x,
  ref,
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const { current: el } = ref;
      setWidth(Math.floor(x - el.offsetLeft + 2));
    }
  }, [x, ref.current]);

  useEffect(() => {
    if (changing.current) {
      if (resizing) {
        onResizeStart();
      } else {
        onResizeEnd();
        changing.current = false;
      }
    }
  }, [resizing, onResizeStart, onResizeEnd, changing.current]);

  useEffect(() => {
    if (onResize && changing.current && resizing) {
      onResize(width);
    }
  }, [width, changing.current, resizing]);
}

export function ResizingMouseEvents({
  globalIsResizing,
  resizing,
  leftGap,
  setResizing,
  setX,
  x,
  snapPoints,
  ref,
  changing,
}) {
  useEffect(() => {
    if (resizing) {
      function snap(changedX) {
        const range = 25;

        for (let sp = 0; sp < snapPoints.length; sp++) {
          const nextValue = snapPoints[sp];
          if (changedX > nextValue - range && changedX < nextValue + range) {
            return nextValue;
          }
        }

        return changedX;
      }

      function handleMouseUp(e) {
        setResizing(false);

        const changedX = snap(x);

        if (changedX !== x) {
          setX(changedX);
        }
      }

      function handleMouseMove(e) {
        if (resizing) {
          setX(e.clientX - leftGap);
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

    function handleResize() {
      if (ref.current) {
        const { current: el } = ref;
        setX(Math.floor(el.offsetLeft - el.offsetWidth - 2));
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref.current, globalIsResizing]);

  useLayoutEffect(() => {
    if (ref.current) {
      function handleMouseDown(e) {
        setResizing(true);
        changing.current = true;
      }

      ref.current.addEventListener("mousedown", handleMouseDown);
    }
  }, []);
}
