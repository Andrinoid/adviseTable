import { cloneDeep } from "lodash";
import React, { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function nextValidRow(index, type, matrix) {
  for (let i = index; i < matrix.length; i++) {
    if (matrix[i][0].current.getAttribute("data-rowtype") == type) {
      return i;
    }
  }

  return -1;
}

export default function useKeyboardControler(
  selectedAreas,
  tableMatrix,
  setSelectedAreas
) {
  let isNegative = useRef(false);

  const pasteData = (e) => {
    if (selectedAreas.length === 1) {
      let pasteData = e.clipboardData.getData("text");

      // let hasTabs = pasteData.includes("\t");
      // let hasNewLines = pasteData.includes("\n");

      let pasteDataRows = pasteData.split("\n");

      let pasteDataRowsSplitted = pasteDataRows.map((row) => {
        return row.split("\t");
      });

      let startRowIndex = selectedAreas[0].fromY;

      const type =
        tableMatrix[selectedAreas[0].fromY][
          selectedAreas[0].fromX
        ].current.getAttribute("data-rowtype");

      pasteDataRowsSplitted.forEach((pastedRow) => {
        let startColumnIndex = selectedAreas[0].fromX;

        if (startRowIndex < tableMatrix.length) {
          startRowIndex = nextValidRow(startRowIndex, type, tableMatrix);

          pastedRow.forEach((pastedCell) => {
            try {
              console.log(
                `update with value [${startRowIndex}, ${startColumnIndex}]`,
                pastedCell
              );
              tableMatrix[startRowIndex][
                startColumnIndex
              ].current.performUpdateValue(pastedCell, true);
            } catch (error) {
              console.error(error);
            }
            startColumnIndex++;
          });
          startRowIndex++;
        }
      });

      console.log(pasteDataRowsSplitted);
      console.log("matrix", tableMatrix);
      console.log("selectedAreas", selectedAreas);
      console.log("-----");
      console.log(
        "starting point",
        tableMatrix[selectedAreas[0].fromY][selectedAreas[0].fromX]
      );
    }
  };

  useEffect(() => {
    document.addEventListener("paste", pasteData);
    return () => {
      document.removeEventListener("paste", pasteData);
    };
  }, [selectedAreas, tableMatrix]);

  const getDefaultOptions = () => {
    return {
      enabled: selectedAreas.length > 0,
      preventDefault: true,
    };
  };

  useHotkeys("up", () => arrowMoveSelection("up"), getDefaultOptions());
  useHotkeys("down", () => arrowMoveSelection("down"), getDefaultOptions());
  useHotkeys("left", () => arrowMoveSelection("left"), getDefaultOptions());
  useHotkeys("right", () => arrowMoveSelection("right"), getDefaultOptions());
  useHotkeys("shift+up", () => arrowShiftSelection("up"), getDefaultOptions());
  useHotkeys(
    "shift+down",
    () => arrowShiftSelection("down"),
    getDefaultOptions()
  );
  useHotkeys(
    "shift+left",
    () => arrowShiftSelection("left"),
    getDefaultOptions()
  );
  useHotkeys(
    "shift+right",
    () => arrowShiftSelection("right"),
    getDefaultOptions()
  );
  useHotkeys("tab", () => setNextFocus(), {
    ...getDefaultOptions(),
    enableOnFormTags: true,
  });
  useHotkeys("enter", () => editCurrentCell("toggle"), {
    ...getDefaultOptions(),
    enableOnFormTags: true,
  });
  useHotkeys("esc", () => editCurrentCell(false), {
    ...getDefaultOptions(),
    enableOnFormTags: true,
  });

  const updateSelection = (selectedAreas, keepEdition = false) => {
    if (
      selectedAreas.length === 1 &&
      selectedAreas[0].fromX === selectedAreas[0].toX &&
      selectedAreas[0].fromY === selectedAreas[0].toY
    ) {
      try {
        const previousCell =
          tableMatrix[selectedAreas[0].oldMouseMoveTo.toY][
            selectedAreas[0].oldMouseMoveTo.toX
          ].current;
        const nextCell =
          tableMatrix[selectedAreas[0].toY][selectedAreas[0].toX].current;

        if (keepEdition && previousCell.isEditable()) {
          nextCell.focus();
        }
        previousCell.blur();
      } catch (error) {}
    }
    setSelectedAreas(selectedAreas);
  };

  /**
   * this put the current cell in edition mode or not
   */
  const editCurrentCell = (editState) => {
    if (
      selectedAreas.length === 1 &&
      selectedAreas[0].fromX === selectedAreas[0].toX &&
      selectedAreas[0].fromY === selectedAreas[0].toY
    ) {
      const cell =
        tableMatrix[selectedAreas[0].toY][selectedAreas[0].toX].current;
      if (editState === "toggle") {
        if (cell.isEditable()) {
          cell.blur();
        } else {
          cell.focus();
        }
      } else if (editState == true) {
        cell.focus();
      } else {
        cell.blur(true);
      }
    }
  };

  /**
   * This function moves the selected cell in the direction of the next tab element
   */
  const setNextFocus = () => {
    const area = selectedAreas[selectedAreas.length - 1];

    const nextArea = cloneDeep(area);
    if (nextArea.toX + 1 <= tableMatrix[nextArea.toY].length - 1) {
      nextArea.toX = nextArea.toX + 1;
    } else {
      nextArea.toX = 0;
      nextArea.toY = nextArea.toY + 1;
    }
    nextArea.fromX = nextArea.toX;
    nextArea.fromY = nextArea.toY;

    nextArea.oldMouseMoveTo = {
      toX: area.toX,
      toY: area.toY,
    };
    let nextCell;

    try {
      nextCell = tableMatrix[nextArea.toY][nextArea.toX].current;
    } catch (error) {}

    if (nextCell) {
      updateSelection([{ ...nextArea }], true);
    }
  };

  /**
   * This function moves the selected cell in the direction of the arrow key
   * If an area is it will be cleared
   */
  const arrowMoveSelection = (keyName) => {
    const area = cloneDeep(selectedAreas[selectedAreas.length - 1]);

    if (keyName === "right") {
      // move selected up to the next row but not past the last row
      area.toX = Math.min(tableMatrix[area.toY].length - 1, area.toX + 1);
      area.fromX = area.toX;
      area.fromY = area.toY;
    }
    if (keyName === "left") {
      area.toX = Math.max(0, area.toX - 1);
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

    area.oldMouseMoveTo = {
      toX: selectedAreas[selectedAreas.length - 1].toX,
      toY: selectedAreas[selectedAreas.length - 1].toY,
    };
    updateSelection([{ ...area }]);
  };

  /**
   * This function changes the selection area based on the shift arrow key pressed
   */
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
      } else {
        if (area.toX < lastCol) {
          area.toX += 1;
        }
      }
    }
    updateSelection([...selectedAreas]);
  };
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
