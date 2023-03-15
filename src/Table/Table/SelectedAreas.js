import React, { useEffect, useState } from "react";
import delegate from "delegate";
import { cloneDeep, flatten } from "lodash";

let trackMouseMove = false;

const SelectedAreas = ({
  selectionMode,
  tableId,
  setSelectColDraging,
  setSelectedCount,
  setSelectedAreas,
  tableMatrix,
  numberOfCols,
}) => {
  /**
   * Add event listeners to all the cells in the table
   * As this can be a large number of cells, we use delegate the event listeners to the body for performance
   */
  useEffect(() => {
    let mouseDownClear = delegate(
      document.body,
      `#${tableId} .brick`, //it would be nice to find a selector that applies this to all cells but not .tableCol
      "mousedown",
      () => {
        clearSelectedAreas();
      },
      false
    );
    let mouseDown = delegate(
      document.body,
      `#${tableId} .tableCol`,
      "mousedown",
      onMouseDown,
      false
    );
    let mouseMove = delegate(
      document.body,
      `#${tableId} .tableCol`,
      "mouseover",
      onMouseMove,
      false
    );
    let mouseUp = delegate(
      document.body,
      `#${tableId} .tableCol`,
      "mouseup",
      onMouseUp,
      false
    );

    return () => {
      mouseDownClear.destroy();
      mouseDown.destroy();
      mouseMove.destroy();
      mouseUp.destroy();
    };
  }, [selectionMode, tableMatrix]);

  React.useLayoutEffect(() => {
    const viewport = document.getElementById(`${tableId}-viewport`);

    viewport?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      viewport?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [tableId, tableMatrix]);

  /**
   * When the mouse is down, reset the selection and set the new coordinates
   */
  const onMouseDown = (e) => {
    let { x, y, selectable, colspan } = e.delegateTarget.dataset;

    if (selectable == "false" || e.button == 2) {
      return;
    }

    if (e.metaKey || e.ctrlKey) {
      // if ctrl or command key is pressed, do not clear the selection
      // this will allow the user to select multiple areas
      startNewSelectedArea();
    } else {
      if (e.shiftKey) {
        // Check if shift key is pressed and make selection acordingly
        updateCurrentSelectedArea({ toX: x, toY: y });
        return;
      } else {
        clearSelectedAreas();
      }
    }

    trackMouseMove = true;
    // if x and y are undefined return
    if (x === undefined || y === undefined) {
      setSelectedCount(0);
      clearSelectedAreas();
      return;
    }
    updateCurrentSelectedArea({ fromX: x, fromY: y, toX: x, toY: y });
  };

  /** Start a new selected area if you are using command or ctrl key */
  const startNewSelectedArea = () => {
    setSelectedAreas((selectedAreas) => [...selectedAreas, {}]);
  };
  /** Represents the initial state where nothing is selected */
  const clearSelectedAreas = () => {
    setSelectedAreas((selectedAreas) => {
      try {
        if (
          selectedAreas.length === 1 &&
          selectedAreas[0].fromY === selectedAreas[0].toY &&
          selectedAreas[0].fromX === selectedAreas[0].toX
        ) {
          let cell =
            tableMatrix[selectedAreas[0].fromY][selectedAreas[0].fromX].current;
          if (cell.isEditable()) {
            // cell.blur();
          }
        }
      } catch (error) {}

      return [];
    });
  };

  /* function to check if there is span columns selected to force the selection to be in the same column */
  const colspanForceAxis = (currentSelectedArea) => {
    let forceMinX = null;
    let forceMaxX = null;

    for (let i = currentSelectedArea.fromY; i <= currentSelectedArea.toY; i++) {
      for (
        let j = currentSelectedArea.fromX;
        j <= currentSelectedArea.toX;
        j++
      ) {
        if (tableMatrix[i][j] && tableMatrix[i][j].current) {
          const { x, y, colspan, spanselection } =
            tableMatrix[i][j].current.dataset;
          if (
            colspan &&
            (spanselection === "true" || currentSelectedArea.fromY == y)
          ) {
            const currentForceMinX = forceMinX;
            const currentForceMaxX = forceMaxX;

            forceMinX =
              forceMinX == null || parseInt(x) < forceMinX
                ? parseInt(x)
                : forceMinX;
            forceMaxX =
              forceMaxX == null ||
              parseInt(x) + (colspan ? colspan - 1 : 0) > forceMaxX
                ? parseInt(x) + (colspan ? colspan - 1 : 0)
                : forceMaxX;

            forceMinX =
              currentForceMinX != null && currentForceMinX < forceMinX
                ? currentForceMinX
                : forceMinX;
            forceMaxX =
              currentForceMaxX != null && currentForceMaxX > forceMaxX
                ? currentForceMaxX
                : forceMaxX;
            // console.log(forceMinX, forceMaxX);
          }
        }
      }
    }
    if (forceMinX != null && forceMinX < currentSelectedArea.fromX)
      currentSelectedArea.fromX = forceMinX;
    if (forceMaxX != null && forceMaxX > currentSelectedArea.toX)
      currentSelectedArea.toX = forceMaxX;
  };

  /** Edit the last selected area */
  let updateCurrentSelectedArea = ({ fromX, fromY, toX, toY } = {}) => {
    if (toX)
      toX =
        selectionMode === "cell" ? parseInt(toX) : tableMatrix[0].length - 1;
    if (toY) toY = parseInt(toY);
    if (fromX) fromX = selectionMode === "cell" ? parseInt(fromX) : 0;
    if (fromY) fromY = parseInt(fromY);

    setSelectedAreas((selectedAreas) => {
      let currentSelectedArea = selectedAreas[selectedAreas.length - 1];
      if (!currentSelectedArea) {
        currentSelectedArea = {};
      }

      if (fromX != null) currentSelectedArea.fromX = fromX;
      if (fromY != null) currentSelectedArea.fromY = fromY;
      if (toX != null) {
        if (
          currentSelectedArea.oldMouseMoveTo &&
          currentSelectedArea.oldMouseMoveTo.toX != null &&
          currentSelectedArea.oldMouseMoveTo.toX - toX > 0
        ) {
          // console.log("moving to left");
          // console.log(toX, currentSelectedArea.fromX);
          if (toX < currentSelectedArea.fromX) {
            currentSelectedArea.fromX = toX;
          } else if (toX === currentSelectedArea.toX - 1) {
            currentSelectedArea.toX = toX;
          }
        } else if (
          currentSelectedArea.oldMouseMoveTo &&
          currentSelectedArea.oldMouseMoveTo.toX != null &&
          currentSelectedArea.oldMouseMoveTo.toX - toX < 0
        ) {
          // console.log("moving to right");
          // console.log(toX, currentSelectedArea.toX);
          if (toX > currentSelectedArea.toX) {
            currentSelectedArea.toX = toX;
          } else if (toX === currentSelectedArea.fromX + 1) {
            currentSelectedArea.fromX = toX;
          }
        } else if (
          !currentSelectedArea.oldMouseMoveTo ||
          currentSelectedArea.oldMouseMoveTo.toX == null
        ) {
          currentSelectedArea.toX = toX;
        }
      }
      if (toY != null) {
        if (
          currentSelectedArea.oldMouseMoveTo &&
          currentSelectedArea.oldMouseMoveTo.toY != null &&
          currentSelectedArea.oldMouseMoveTo.toY - toY > 0
        ) {
          // console.log("moving up");
          if (toY < currentSelectedArea.fromY) {
            currentSelectedArea.fromY = toY;
          } else {
            currentSelectedArea.toY = toY;
          }
        } else if (
          currentSelectedArea.oldMouseMoveTo &&
          currentSelectedArea.oldMouseMoveTo.toY != null &&
          currentSelectedArea.oldMouseMoveTo.toY - toY < 0
        ) {
          // console.log("moving down");
          if (toY > currentSelectedArea.toY) {
            currentSelectedArea.toY = toY;
          } else {
            currentSelectedArea.fromY = toY;
          }
        } else if (
          !currentSelectedArea.oldMouseMoveTo ||
          currentSelectedArea.oldMouseMoveTo.toY == null
        ) {
          currentSelectedArea.toY = toY;
        }
      }

      colspanForceAxis(currentSelectedArea);

      //important to save last mouse move to check direction of the movement
      const oldMouseMoveTo = {
        toX: toX != null ? toX : currentSelectedArea.oldMouseMoveTo.toX,
        toY: toY != null ? toY : currentSelectedArea.oldMouseMoveTo.toY,
      };
      currentSelectedArea.oldMouseMoveTo = oldMouseMoveTo;

      if (
        currentSelectedArea.fromX &&
        currentSelectedArea.toX &&
        currentSelectedArea.fromY &&
        currentSelectedArea.toY
      ) {
        const containedBegin = getContainedArea(selectedAreas.slice(0, -1), {
          x: currentSelectedArea.fromX,
          y: currentSelectedArea.fromY,
        });
        const containedEnd = getContainedArea(selectedAreas.slice(0, -1), {
          x: currentSelectedArea.toX,
          y: currentSelectedArea.toY,
        });
        if (containedBegin && containedEnd) {
          currentSelectedArea.isExclusion = true;
        } else {
          currentSelectedArea.isExclusion = false;
        }
      }

      return [...selectedAreas.slice(0, -1), currentSelectedArea];
    });
  };

  /**
   * This function must remove the selected areas marked as exclusion areas and split the affected areas into smaller areas that are not excluded
   */
  const applySelectionExclusion = () => {
    setSelectedAreas((selectedAreas) => {
      let newSelectionAreas = selectedAreas.filter((area) => !area.isExclusion);
      let exclusionAreas = selectedAreas.filter((area) => area.isExclusion);

      if (!exclusionAreas || !newSelectionAreas) return;

      exclusionAreas.forEach((exclusionArea) => {
        newSelectionAreas = flatten(
          newSelectionAreas.map((area) => {
            if (
              ((exclusionArea.fromX >= area.fromX &&
                exclusionArea.fromX <= area.toX) ||
                (exclusionArea.toX <= area.toX &&
                  exclusionArea.toX >= area.fromX) ||
                (exclusionArea.fromX <= area.fromX &&
                  exclusionArea.toX >= area.toX)) && //x is overlaping
              ((exclusionArea.fromY <= area.toY &&
                exclusionArea.fromY >= area.fromY) ||
                (exclusionArea.toY <= area.toY &&
                  exclusionArea.toY >= area.fromY) ||
                (exclusionArea.fromY <= area.fromY &&
                  exclusionArea.toY >= area.toY)) //y is overlaping
            ) {
              //is affected
              return splitArea(area, exclusionArea);
            } else {
              //is not affected
              return area;
            }
          })
        );
      });

      return newSelectionAreas;
    });
  };
  /**
   * SPlit the area applying the exclusion cutoff
   */
  const splitArea = (area, exclusionArea) => {
    const splitedAreas = [];

    const topCopy = cloneDeep(area);
    topCopy.toY = exclusionArea.fromY - 1;
    if (topCopy.toY >= topCopy.fromY) splitedAreas.push(topCopy);

    const bottomCopy = cloneDeep(area);
    bottomCopy.fromY = exclusionArea.toY + 1;
    if (bottomCopy.toY >= bottomCopy.fromY) splitedAreas.push(bottomCopy);

    const leftCopy = cloneDeep(area);
    leftCopy.fromY = Math.max(exclusionArea.fromY, area.fromY);
    leftCopy.toY = Math.min(exclusionArea.toY, area.toY);
    leftCopy.toX = exclusionArea.fromX - 1;
    if (leftCopy.toY >= leftCopy.fromY && leftCopy.toX >= leftCopy.fromX)
      splitedAreas.push(leftCopy);

    const rightCopy = cloneDeep(area);
    rightCopy.fromY = Math.max(exclusionArea.fromY, area.fromY);
    rightCopy.toY = Math.min(exclusionArea.toY, area.toY);
    rightCopy.fromX = exclusionArea.toX + 1;
    if (rightCopy.toY >= rightCopy.fromY && rightCopy.toX >= rightCopy.fromX)
      splitedAreas.push(rightCopy);

    return splitedAreas;
  };

  /**
   * When the mouse is moved, set the new coordinates
   * Only run if x and y have changed from previous values. That is moved to next cell
   * This was on mouseMove before that fires very often. Now we are using mouseOver so it might not be neccessary
   * to check if x and y have changed, but I am leaving it in for now
   */
  let oldX = null;
  let oldY = null;
  const onMouseMove = (e) => {
    let { x, y, selectable, colspan, spanselection } = e.delegateTarget.dataset;

    if (selectable == "false") {
      trackMouseMove = false;
      return;
    }
    if (trackMouseMove) {
      if (colspan != null && spanselection == "false") {
        return;
      }

      setSelectColDraging(true);
      if (x === undefined || y === undefined) return;

      // only run if x and y have changed from previous values. That is moved to next cell
      if (x !== oldX || y !== oldY) {
        updateCurrentSelectedArea({
          //   fromX: oldX,
          //   fromY: oldY,
          toX: x,
          toY: y,
        });
      }
      oldX = x;
      oldY = y;
    }
  };

  const onMouseLeave = (e) => {
    if (trackMouseMove) trackMouseMove = false;
  };

  /**
   * We are only using the mouseUp event to detect when the user has finished selecting
   * the mouseUpColCords are not used but they might be useful in the future
   */
  const onMouseUp = (e) => {
    let { x, y, selectable } = e.delegateTarget.dataset;
    // console.log(selectable, e.delegateTarget);
    applySelectionExclusion();
    if (selectable == "false") {
      // console.log("Uai...");
      return;
    }
    trackMouseMove = false;
    setSelectColDraging(false);
    if (x === undefined || y === undefined) return;
  };
  // this compoenent does not render anything
  return <></>;
};

export const getContainedArea = (selectedAreas, { x, y }) => {
  let isX = false;
  let isY = false;
  let containedArea;
  for (let index = selectedAreas.length - 1; index >= 0; index--) {
    const area = selectedAreas[index];
    if (area.fromX === area.toX && x === area.fromX && x === area.toX) {
      isX = true;
    } else if (
      (x >= area.fromX && x <= area.toX) ||
      (x <= area.fromX && x >= area.toX)
    ) {
      isX = true;
    }
    if (area.fromY === area.toY && y === area.fromY && y === area.toY) {
      isY = true;
    } else if (
      (y >= area.fromY && y <= area.toY) ||
      (y <= area.fromY && y >= area.toY)
    ) {
      isY = true;
    }
    if (isX && isY) {
      containedArea = area;
      break;
    } else {
      isX = false;
      isY = false;
    }
  }
  if (isX && isY && containedArea && !containedArea.isExclusion) {
    return containedArea;
  }

  return null;
};

export default SelectedAreas;
