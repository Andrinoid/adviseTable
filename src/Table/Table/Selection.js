import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getBoxStyle = (exclude, theTheme) => {
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

    console.log('selection dimentions', dimensions);
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
    console.log('selectedAreas', selectedAreas);
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
          <motion.div
            key={index}
            animate={dimension}
            transition={{
              duration: dimension.motionDelay ? dimension.motionDelay / 200 : 0,
            }}
            style={{
              ...getBoxStyle(dimension.selection.isExclusion, theTheme),
              ...dimension,
              ...(selectionMode === "row" && rowSelectionStyles),
            }}
          ></motion.div>
        );
      })}
    </>
  );
};

export default Selection;
