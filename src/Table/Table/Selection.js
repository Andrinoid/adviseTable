import { set } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: ${({ exclude, theTheme }) =>
    exclude ? theTheme?.exludeArea.background : theTheme?.selection?.background};
  border: ${({ exclude, theTheme }) =>
    exclude ? "none" : theTheme?.selection?.border};
  opacity: ${({ exclude, theTheme }) =>
    exclude ? "0.7" : "1"};
  pointer-events: none;
  z-index: 3;
`;

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

  useEffect(() => {
    if (selectedAreas.length === 0) {
      setDimensions([]);
      return;
    }

    //for selectedAreas, calculate the dimensions
    let dimensions = selectedAreas.map((selection) => {
      return calculateDimensions(selection);
    });
    setDimensions(dimensions);
  }, [selectedAreas, colWidth, lastColWidth, firstColWidth]);

  const rowSelectionStyles = {
    width: totalWidth,
    left: 0,
    zIndex: 3,
  };

  return (
    <>
      {dimensions.map((dimension, index) => {
        return (
          <Box
            key={index}
            theTheme={theTheme}
            exclude={dimension.selection.isExclusion}
            style={{
              ...dimension,
              ...(selectionMode === "row" && rowSelectionStyles),
            }}
          />
        );
      })}
    </>
  );
};

export default Selection;