import React, { useEffect, useRef } from "react";

export default function useKeyboardSelection(
  selectedAreas,
  tableMatrix,
  setSelectedAreas
) {
  let isNegative = useRef(false);

  useEffect(() => {
    function updateLabelArea(area, row, col) {
      const element = tableMatrix[row][col].current;
      const colspan = element.getAttribute("data-colspan");
      const x = element.getAttribute("data-x");
      if (colspan && x) {
        area.fromX = parseInt(x);
        area.toX = parseInt(x) + parseInt(colspan) - 1;
      }
    }

    function handleSelectionKey(event) {
      const area = selectedAreas[0];
      const lastCol = tableMatrix[0].length - 1;
      const lastRow = tableMatrix.length - 1;

      if (event.shiftKey) {
        if (event.key === "ArrowDown") {
          if (area.toY < lastRow) {
            updateLabelArea(area, area.fromY + 1, area.fromX);
          }

          if (area.toY === area.fromY) {
            isNegative.current = false;
          }
          if (!isNegative.current) area.toY += 1;
          else {
            if (area.toY < lastRow) {
              area.fromY += 1;
            }
          }
        }

        if (event.key === "ArrowUp") {
          if (area.fromY > 0) {
            updateLabelArea(area, area.fromY - 1, area.fromX);
          }
          if (area.toY === area.fromY) {
            isNegative.current = true;
          }
          if (!isNegative.current) area.toY -= 1;
          else {
            if (area.fromY > 0) {
              area.fromY -= 1;
            }
          }
        }

        if (event.key === "ArrowLeft") {
          if (area.toX === area.fromX) {
            isNegative.current = true;
          }
          if (isNegative.current) area.fromX -= 1;
          else {
            if (area.fromX > 0) {
              area.toX -= 1;
            }
          }
        }

        if (event.key === "ArrowRight") {
          if (area.toX === area.fromX) {
            isNegative.current = false;
          }
          if (isNegative.current) area.fromX += 1;
          else {
            if (area.toX < lastCol) {
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
