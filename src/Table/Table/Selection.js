import React, { useEffect, useState } from "react";

const getBoxStyle = (exclude, theTheme, motionDelay) => {
  return {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    backgroundColor: `${
      exclude
        ? theTheme?.exludeArea.background
        : theTheme?.selection?.background
    }`,
    border: `${exclude ? "none" : theTheme?.selection?.border}`,
    opacity: `${exclude ? "0.7" : "1"}`,
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
}) => {
  const [dimensions, setDimensions] = useState([]);

  const calculateDimensions = (selection = {}) => {
    console.log('selection', selection);
    const firstElement = tableMatrix[selection.fromY][selection.fromX].current;
    const lastElement = tableMatrix[selection.toY][selection.toX].current;

    let top = firstElement.offsetTop;
    let left = firstElement.offsetLeft;
    let width = lastElement.offsetLeft + lastElement.offsetWidth - left;
    let height = lastElement.offsetTop + lastElement.offsetHeight - top;

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
              ...getBoxStyle(
                dimension.selection.isExclusion,
                theTheme,
                dimension.motionDelay
              ),
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
