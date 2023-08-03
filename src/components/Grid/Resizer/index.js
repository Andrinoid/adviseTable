import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Dimensions, compute } from "../hooks";
import { throttle } from "lodash";

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
  rowIndex,
}) {
  const [x, setX] = useState(initialX);
  const ref = useRef(null);
  const resizing = useRef(false);

  useEffect(() => {
    setX(initialX);
  }, [initialX]);

  const handleOnMouseMove = useCallback(
    (e) => {
      e.preventDefault();
      // function snap(changedX) {
      //   const range = 50;
      //   for (let ri = 0; ri < positionXs.length; ri++) {
      //     if (ri !== rowIndex) {
      //       for (let ci = 0; ci < positionXs[ri].length; ci++) {
      //         const nextValue = positionXs[ri][ci];

      //         if (
      //           Math.round(x) == Math.round(nextValue) &&
      //           changedX > nextValue - range &&
      //           changedX < nextValue + range
      //         ) {
      //           console.log("entrou no false");
      //           return [nextValue, false];
      //         }
      //       }
      //     }
      //   }

      //   return [changedX, true];
      // }
      // TODO:
      // -- snap to the next column
      // -- stop resizer if min widths are reached
      //    because right now the resizer is leaving the grid

      if (resizing.current) {
        const start = colIndex == 0 ? 0 : positionXs[rowIndex][colIndex - 1];
        let width = e.clientX - leftGap - start;

        setX(e.clientX - leftGap);

        const newWidths = compute(
          new Dimensions(widths, colIndex, { width }, minWidth, totalWidth)
        );
        setWidths(newWidths, rowIndex);
      }
    },
    [widths, colIndex, minWidth, totalWidth, leftGap, rowIndex, positionXs]
  );

  useLayoutEffect(() => {
    function handleOnMouseDown(e) {
      e.preventDefault();

      resizing.current = true;
      setResizing(true);
    }

    function handleOnClick(e) {
      e.preventDefault();
      resizing.current = false;
      setResizing(resizing.current);
    }

    function handleOnMouseUp(e) {
      resizing.current = false;
      setResizing(false);
    }

    const throttled = throttle(handleOnClick, 1000);
    if (ref.current) {
      if (resizing.current) {
        window.addEventListener("click", throttled);
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
        window.removeEventListener("mousemove", throttled);
        ref.current.removeEventListener("mouseup", handleOnMouseUp);
      }
    };
  }, [x]);

  return <Handler ref={ref} x={x} />;
}
