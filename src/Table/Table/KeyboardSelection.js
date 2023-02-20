import React, { useEffect, useRef } from "react";

export default function useKeyboardSelection(
  selectedAreas,
  tableMatrix,
  setSelectedAreas
) {
  let isNegative = useRef(false);

  useEffect(() => {
    function handleSelectionKey(event) {
      const area = selectedAreas[0];
      const lastCol = tableMatrix[0].length - 1;
      const lastRow = tableMatrix.length - 1;

      if (event.shiftKey) {
        if (event.key === "ArrowDown") {
          if (area.toY < lastRow) {
            if (area.toY === area.fromY) {
              isNegative.current = false;
            }
            if (!isNegative.current) area.toY += 1;
            else {
              area.fromY += 1;
            }
          }
        }

        if (event.key === "ArrowUp") {
          // const element = tableMatrix[area.fromY-1][area.fromX].current;
          // const colspan = element.getAttribute("data-colspan");
          // const x = element.getAttribute("data-x");
          // if (colspan) {
          //   area.fromX = parseInt(x);
          //   area.toX = parseInt(x) + parseInt(colspan)-1;
          // }
          // console.log(area)
          if (area.fromY > 0) {
            if (area.toY === area.fromY) {
              isNegative.current = true;
            }
            if (!isNegative.current) area.toY -= 1;
            else {
              area.fromY -= 1;
            }
          }
        }

        if (event.key === "ArrowLeft") {
          if (area.fromX > 0) {
            if (area.toX === area.fromX) {
              isNegative.current = true;
            }
            if (isNegative.current) area.fromX -= 1;
            else {
              area.toX -= 1;
            }
          }
        }

        if (event.key === "ArrowRight") {
          if (area.toX < lastCol) {
            if (area.toX === area.fromX) {
              isNegative.current = false;
            }
            if (isNegative.current) area.fromX += 1;
            else {
              area.toX += 1;
            }
          }
        }

        setSelectedAreas([{ ...selectedAreas[0] }]);
      }
    }

    window.addEventListener("keydown", handleSelectionKey);

    return () => {
      window.removeEventListener("keydown", handleSelectionKey);
    };
  }, [selectedAreas, tableMatrix, isNegative]);
}
