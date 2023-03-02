import React, { useEffect, useState } from "react";

const getBoxStyle = (theTheme, motionDelay) => {
  return {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    backgroundColor: `${theTheme?.selection?.background}`,
    border: `${theTheme?.selection?.border}`,
    opacity: `${"1"}`,
    pointerEvents: "none",
    zIndex: 3,
    transition: `${motionDelay ? "all 0.2s ease-in-out" : "none"}`,
  };
};

/**
 * This component renders elements showing the selectedAreas
 */
const Selection = ({
  selectedAreas,
  colWidth,
  firstColWidth,
  lastColWidth,
  selectionMode,
  totalWidth,
  theTheme,
  tableMatrix,
  tableContainerRef,
}) => {
  const [dimensions, setDimensions] = useState([]);

  const calculateDimensions = (selection = {}) => {
    if (
      !tableMatrix[selection.fromY] ||
      !tableMatrix[selection.fromY][selection.fromX]
    ) {
      return;
    }
    if (
      !tableMatrix[selection.toY] ||
      !tableMatrix[selection.toY][selection.toX]
    ) {
      return;
    }
    const firstElement = tableMatrix[selection.fromY][selection.fromX].current;
    const lastElement = tableMatrix[selection.toY][selection.toX].current;
    const rowType = lastElement.dataset.rowtype;

    const tableContainerDimensions =
      tableContainerRef.current.getBoundingClientRect();
    const firstElmDimentions = firstElement.getBoundingClientRect();

    let top = firstElmDimentions.top - tableContainerDimensions.top;
    let left = firstElement.offsetLeft;
    let width = lastElement.offsetLeft + lastElement.offsetWidth - left;
    let height = lastElement.offsetTop + lastElement.offsetHeight - top;
    if (rowType === "secondary") {
      // check if the row is absolute positioned
      const lastElmDimensions = lastElement.getBoundingClientRect();
      height =
        lastElmDimensions.top +
        lastElmDimensions.height -
        firstElmDimentions.top;
    }

    return { top, left, width, height, selection };
  };

  const updateDimentions = (motionDelay = 0) => {
    if (selectedAreas.length === 0) {
      setDimensions([]);
      return;
    }

    setTimeout(() => {
      let dimensions = selectedAreas
        .filter((selection) => selection && selection.length != 0)
        .map((selection) => {
          return { ...calculateDimensions(selection), motionDelay };
        });
      setDimensions(dimensions);
    }, motionDelay);
  };

  useEffect(() => {
    updateDimentions(0);
  }, [selectedAreas]);

  useEffect(() => {
    updateDimentions(100);
  }, [colWidth, lastColWidth, firstColWidth]);

  const rowSelectionStyles = {
    width: totalWidth,
    left: 0,
    zIndex: 3,
  };

  return (
    <>
      {dimensions.map((dimension, index) => {
        return (
          <div
            key={index}
            style={{
              ...getBoxStyle(theTheme, dimension.motionDelay),
              ...dimension,
              ...(selectionMode === "row" && rowSelectionStyles),
            }}
          ></div>
        );
      })}
    </>
  );
};

export default Selection;
