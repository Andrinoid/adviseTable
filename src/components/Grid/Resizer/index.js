import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Dimensions, compute } from "../hooks";
import { maxWidth } from "../hooks";
import { shouldStop } from "./helpers";

export const Handler = styled.div`
  position: absolute;
  top: 0;
  width: 5px;
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
  actualWidths,
  rowIndex,
  handleResizerPositions,
}) {
  const [x, setX] = useState(initialX);
  const ref = useRef(null);
  const resizing = useRef(false);

  useEffect(() => {
    setX(initialX);
  }, [initialX]);

  useLayoutEffect(() => {
    function handleOnMouseDown(e) {
      e.preventDefault();

      resizing.current = true;
      setResizing(true);
    }

    function snap(changedX) {
      const range = 50;
      for (let ri = 0; ri < positionXs.length; ri++) {
        if (ri !== rowIndex) {
          for (let ci = 0; ci < positionXs[ri].length; ci++) {
            const nextValue = positionXs[ri][ci];

            if (
              Math.round(x) == Math.round(nextValue) &&
              changedX > nextValue - range &&
              changedX < nextValue + range
            ) {
              console.log("entrou no false");
              return [nextValue, false];
            }
          }
        }
      }

      return [changedX, true];
    }

    function handleOnMouseMove(e) {
      e.preventDefault();

      if (resizing.current) {
        const start = colIndex == 0 ? 0 : positionXs[rowIndex][colIndex - 1];
        let width = e.clientX - leftGap - start;
        const [value, update] = snap(e.clientX - leftGap);

        setX(value);

        if (update) {
          const newWidths = compute(
            new Dimensions(widths, colIndex, { width }, minWidth, totalWidth)
          );
          setWidths(newWidths);
        }
      }
    }

    function handleOnClick(e) {
      e.preventDefault();
      resizing.current = false;
      setResizing(resizing.current);
      handleResizerPositions();
    }

    function handleOnMouseUp(e) {
      resizing.current = false;
      setResizing(false);
      handleResizerPositions();
    }

    if (ref.current) {
      if (resizing.current) {
        window.addEventListener("click", handleOnClick);
      }
      ref.current.addEventListener("mousedown", handleOnMouseDown);
      window.addEventListener("mousemove", handleOnMouseMove);
      ref.current.addEventListener("mouseup", handleOnMouseUp);
    }

    return () => {
      if (ref.current) {
        if (resizing.current) {
          window.removeEventListener("click", handleOnClick);
        }

        ref.current.removeEventListener("mousedown", handleOnMouseDown);
        window.removeEventListener("mousemove", handleOnMouseMove);
        ref.current.removeEventListener("mouseup", handleOnMouseUp);
      }
    };
  }, [
    colIndex,
    leftGap,
    minWidth,
    setResizing,
    totalWidth,
    widths,
    x,
    rowIndex,
    setWidths,
  ]);

  return <Handler ref={ref} x={x} />;
}
