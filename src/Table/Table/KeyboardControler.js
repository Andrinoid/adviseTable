import React, { useEffect, useRef } from "react";
import { useHotkeys } from 'react-hotkeys-hook'

export default function useKeyboardControler(
  selectedAreas,
  tableMatrix,
  setSelectedAreas
) {
  let isNegative = useRef(false);
  useHotkeys('up', () => arrowMoveSelection('up', false));
  useHotkeys('down', () => arrowMoveSelection('down', false));
  useHotkeys('left', () => arrowMoveSelection('left', false));
  useHotkeys('right', () => arrowMoveSelection('right', false));

  useHotkeys('shift+up', () => arrowShiftSelection('up'));
  useHotkeys('shift+down', () => arrowShiftSelection('down'));
  useHotkeys('shift+left', () => arrowShiftSelection('left'));
  useHotkeys('shift+right', () => arrowShiftSelection('right'));

  const arrowMoveSelection = (keyName) => {
    const area = selectedAreas[selectedAreas.length - 1];

    if (keyName === "right") {
      // move selected up to the next row but not past the last row
      area.toX = Math.min(tableMatrix[area.toY].length - 1, area.toX + 1);
      area.fromX = area.toX;
      area.fromY = area.toY;
    }
    if (keyName === "left") {
      area.toX = Math.max(0, area.toX - 1);
      console.log(area.toX);
      area.fromX = area.toX;
      area.fromY = area.toY;
    }
    if (keyName === "up") {

      area.toY = Math.max(0, area.toY - 1);
      area.fromX = area.toX;
      area.fromY = area.toY;
    }
    if (keyName === "down") {
      // increace area.toY by 1 but not past the last row
      area.toY = Math.min(tableMatrix.length - 1, area.toY + 1);
      area.fromX = area.toX;
      area.fromY = area.toY;
    }
    setSelectedAreas([{ ...area }]);
  };

  const arrowShiftSelection = (keyName) => {
    const area = selectedAreas[selectedAreas.length - 1];
    const lastCol = tableMatrix[selectedAreas.length - 1].length - 1;
    const lastRow = tableMatrix.length - 1;

    if (keyName === "down") {
      if (area.toY < lastRow) {
        updateLabelArea(area, area.fromY + 1, area.fromX, tableMatrix);
      }

      if (area.toY === area.fromY) {
        isNegative.current = false;
      }
      if (area.toY < lastRow) {
        if (!isNegative.current) area.toY += 1;
        else {
          area.fromY += 1;
        }
      }
    }

    if (keyName === "up") {
      if (area.fromY > 0) {
        updateLabelArea(area, area.fromY - 1, area.fromX, tableMatrix);
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

    if (keyName === "left") {
      if (area.toX === area.fromX) {
        isNegative.current = true;
      }
      if (area.fromX > 0 && isNegative.current) area.fromX -= 1;
      else {
        if (area.toX > 0) area.toX -= 1;
      }
    }

    if (keyName === "right") {
      if (area.toX === area.fromX) {
        isNegative.current = false;
      }
      if (isNegative.current) {
        area.fromX += 1;
      }
      else {
        if (area.toX < lastCol) {
          area.toX += 1;
        }
      }
    }
    setSelectedAreas([...selectedAreas]);
  }

}

function updateLabelArea(area, row, col, tableMatrix) {
  const element = tableMatrix[row][col].current;
  const colspan = element.getAttribute("data-colspan");
  const dataX = element.getAttribute("data-x");
  if (colspan && dataX) {
    area.fromX = parseInt(dataX);
    area.toX = parseInt(dataX) + parseInt(colspan) - 1;
  }
}
