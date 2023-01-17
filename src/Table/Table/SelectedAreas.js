import React, { useEffect, useContext, useState } from "react";
import { TableContext } from "../context";
import delegate from "delegate";

let trackMouseMove = false;

const SelectedAreas = ({ onSelection, tableId }) => {

    // Get the context we need
    const {
      setMouseDownColCord,
      setMouseMoveColCord,
      setMouseUpColCord,
      setSelectColDraging,
      setSelectedCount,
      setSelectedAreas,
      selectedAreas,
    } = useContext(TableContext);

    /** 
     * Add event listeners to all the cells in the table
     * As this can be a large number of cells, we use delegate the event listeners to the body for performance
     */
    useEffect(() => {
        let mouseDown = delegate(document.body, `#${tableId} .tableCol`, 'mousedown', onMouseDown, false );
        let mouseMove = delegate(document.body, `#${tableId} .tableCol`, 'mouseover', onMouseMove, false);
        let mouseUp = delegate(document.body, `#${tableId} .tableCol`, 'mouseup', onMouseUp, false);
        return () => {
            mouseDown.destroy();
            mouseMove.destroy();
            mouseUp.destroy();
        };
    }, []);

    /**
     * When the mouse is down, reset the selection and set the new coordinates
     */
    const onMouseDown = (e) => {
        let { x, y } = e.delegateTarget.dataset;

        if (e.metaKey || e.ctrlKey) {
          // if ctrl or command key is pressed, do not clear the selection
          // this will allow the user to select multiple areas
          startNewSelectedArea();
        } else {
            if (e.shiftKey) {
                // Check if shift key is pressed and make selection acordingly
                setMouseMoveColCord([x, y]);
                updateCurrentSelectedArea({ toX: x, toY: y });
                return;
            } else { 
                clearSelectedAreas();
            }
        }

        trackMouseMove = true;
        // if x and y are undefined return
        if (x === undefined || y === undefined) {
            setMouseMoveColCord(null);
            setMouseDownColCord(null);
            setMouseUpColCord(null);
            setSelectedCount(0);
            clearSelectedAreas();
            return;
        };
        // only run setters if x and y have changed from previous values
        setMouseMoveColCord(null);
        setMouseDownColCord([x, y]);
        updateCurrentSelectedArea({fromX: x, fromY: y, toX: x, toY: y});
    }

    /** Start a new selected area if you are using command or ctrl key */
    const startNewSelectedArea = () => {
        setSelectedAreas(selectedAreas => [...selectedAreas, {}]);
    };
    /** Represents the initial state where nothing is selected */
    const clearSelectedAreas = () => {
      setSelectedAreas([]);
    };

    /** Edit the last selected area */
    const updateCurrentSelectedArea = ({ fromX, fromY, toX, toY } = {}) => {
        setSelectedAreas(selectedAreas => { 
            let currentSelectedArea = selectedAreas[selectedAreas.length - 1];
            if (!currentSelectedArea) {
              currentSelectedArea = {};
            }

            if (fromX) currentSelectedArea.fromX = fromX;
            if (fromY) currentSelectedArea.fromY = fromY;
            if (toX) currentSelectedArea.toX = toX;
            if (toY) currentSelectedArea.toY = toY;


            if (currentSelectedArea.fromX && currentSelectedArea.toX && currentSelectedArea.fromY && currentSelectedArea.toY) {
                const containedBegin = getContainedArea(
                  selectedAreas.slice(0, -1),
                  { x: currentSelectedArea.fromX, y: currentSelectedArea.fromY }
                );
                const containedEnd = getContainedArea(
                  selectedAreas.slice(0, -1),
                  { x: currentSelectedArea.toX, y: currentSelectedArea.toY }
                );
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
     * When the mouse is moved, set the new coordinates
     * Only run if x and y have changed from previous values. That is moved to next cell
     * This was on mouseMove before that fires very often. Now we are using mouseOver so it might not be neccessary
     * to check if x and y have changed, but I am leaving it in for now
     */
    let oldX = null;
    let oldY = null;
    const onMouseMove = (e) => {
        if (trackMouseMove) {
            setSelectColDraging(true);
            let { x, y, end } = e.delegateTarget.dataset;
          
            if (x === undefined || y === undefined) return;

            // only run if x and y have changed from previous values. That is moved to next cell
            if (x !== oldX || y !== oldY) {
                setMouseMoveColCord([x, y]);
                // fire the onSelection callback to the table component
                // onSelection();
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
    }

    /**
     * We are only using the mouseUp event to detect when the user has finished selecting
     * the mouseUpColCords are not used but they might be useful in the future
     */
    const onMouseUp = (e) => {
        trackMouseMove = false;
        setSelectColDraging(false);
        let { x, y } = e.delegateTarget.dataset;
        if (x === undefined || y === undefined) return;
        setMouseUpColCord([x, y]);
    }
    // this compoenent does not render anything
    return <></>;
};

export const getContainedArea = (selectedAreas, { x, y }) => {
  let isX = false;
  let isY = false;
  let containedArea;
  for (let index = selectedAreas.length-1; index >= 0 ; index--) {
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


