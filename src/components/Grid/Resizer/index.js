import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Dimensions, compute } from "../hooks";
import { initial } from "lodash";

export const Handler = styled.div`
  position: absolute;
  top: 0;
  width: 3px;
  height: 100%;
  left: ${(props) => props.x}px;
  background-color: #37a1f6;
  cursor: col-resize;
`;

export default function Resizer({
  x: initialX = 0,
  setResizing,
  leftGap,
  widths,
  positionXs,
  colIndex,
  minWidth,
  totalWidth,
  setWidths,
  shouldStop,
  rowIndex,
}) {
  const [x, setX] = useState(initialX);
  const ref = useRef(null);
  const resizing = useRef(false);

  useEffect(() => {
    setX(initialX);
  }, [initialX]);

  useEffect(() => {
    if (shouldStop) {
      resizing.current = false;
      setResizing(false);
    }
  }, [shouldStop]);

  useLayoutEffect(() => {
    function handleOnClick(e) {
      e.preventDefault();

      resizing.current = true;
      setResizing(true);
    }

    function handleOnMouseMove(e) {
      e.preventDefault();

      if (resizing.current) {
        const resizerPosition = e.clientX - leftGap;
        setX(resizerPosition);
        const start = colIndex == 0 ? 0 : positionXs[rowIndex][colIndex - 1];
        const width = e.clientX - leftGap - start;

        if (
          colIndex == widths.length - 1 ||
          (colIndex == 0 && width < minWidth) ||
          e.clientX - leftGap < minWidth
        ) {
          resizing.current = false;
          setResizing(false);
          return;
        }
        const newWidths = compute(
          new Dimensions(widths, colIndex, { width }, minWidth, totalWidth)
        );
        setWidths(newWidths);
      }
    }

    function handleOnMouseUp(e) {
      resizing.current = false;
      setResizing(false);
    }

    if (ref.current) {
      ref.current.addEventListener("mousedown", handleOnClick);
      window.addEventListener("mousemove", handleOnMouseMove);
      ref.current.addEventListener("mouseup", handleOnMouseUp);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousedown", handleOnClick);
        window.removeEventListener("mousemove", handleOnMouseMove);
        ref.current.removeEventListener("mouseup", handleOnMouseUp);
      }
    };
  }, [colIndex, leftGap, minWidth, setResizing, totalWidth, widths]);

  return <Handler ref={ref} x={x} />;
}
