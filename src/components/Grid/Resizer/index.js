import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Dimensions, compute } from "../hooks";

export const Handler = styled.div`
  position: absolute;
  top: 0;
  width: 5px;
  height: 100%;
  left: ${(props) => props.x}px;
  background-color: transparent;
  cursor: ${({ editing }) => (editing ? "col-resize" : "default")};
  z-index: 5;
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
  onEnd,
  rulers,
  setColId,
  rowId,
  colId,
  editing,
}) {
  const [x, setX] = useState(initialX);
  const ref = useRef(null);
  const resizing = useRef(false);
  const snapped = useRef(false);

  useEffect(() => {
    setX(initialX);
  }, [initialX]);

  const handleOnMouseMove = useCallback(
    (e) => {
      if (resizing.current) {
        const start = colIndex == 0 ? 0 : positionXs[rowIndex][colIndex - 1];
        const snappedX = e.clientX - leftGap;

        let width = snappedX - start;

        if (snappedX != e.clientX - leftGap) {
          snapped.current = true;
        }

        const newWidths = compute(
          new Dimensions(widths, colIndex, { width }, minWidth, totalWidth)
        );
        setWidths([...newWidths], rowIndex);
        setX(snappedX);
      }
    },
    [widths, colIndex, minWidth, totalWidth, leftGap, rowIndex, positionXs]
  );

  const handleOnMouseUp = useCallback(
    (e) => {
      function snap(changedX) {
        const range = 25;

        for (let ri = 0; ri < rulers.length; ri++) {
          for (let ci = 0; ci < rulers[ri].length; ci++) {
            const nextValue = rulers[ri][ci];
            if (changedX > nextValue - range && changedX < nextValue + range) {
              return nextValue;
            }
          }
        }

        return changedX;
      }

      if (resizing.current) {
        const start = colIndex == 0 ? 0 : positionXs[rowIndex][colIndex - 1];
        const snappedX = snap(e.clientX - leftGap);

        let width = snappedX - start;

        if (snappedX != e.clientX - leftGap) {
          snapped.current = true;
        }

        const newWidths = compute(
          new Dimensions(widths, colIndex, { width }, minWidth, totalWidth)
        );
        setWidths([...newWidths], rowIndex);
        setX(snappedX);

        resizing.current = false;
        setResizing(false);
        setColId(null);

        if (!snapped.current) {
          setX(initialX);
        } else {
          snapped.current = false;
        }

        onEnd();
      }
    },
    [widths, totalWidth, positionXs]
  );

  useLayoutEffect(() => {
    if (editing) {
      function handleOnMouseDown(e) {
        resizing.current = true;
        setResizing(true);
        setColId(rowId + "_" + colId);
      }

      if (ref.current) {
        ref.current.addEventListener("mousedown", handleOnMouseDown);
        window.addEventListener("mousemove", handleOnMouseMove);
        window.addEventListener("mouseup", handleOnMouseUp);
      }

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("mousedown", handleOnMouseDown);
          window.removeEventListener("mousemove", handleOnMouseMove);
          window.removeEventListener("mouseup", handleOnMouseUp);
        }
      };
    }
  }, [handleOnMouseUp, editing]);

  return <Handler ref={ref} x={x || 0} editing={editing} />;
}
