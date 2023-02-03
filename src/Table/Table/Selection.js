import { set } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: ${({ exclude, theTheme }) =>
    exclude ? theTheme?.secondary.background : theTheme?.selection?.background};
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
  colHeight,
  leftOffset,
  firstColWidth,
  lastColWidth,
  numberOfCols,
  selectionMode,
  totalWidth,
  lasColumnRisizeable,
  theTheme,
  headerHeight,
}) => {
  const [dimensions, setDimensions] = useState([]);

  const calculateDimensions = (selection = {}) => {
    let includesFirstCol = selection.fromX === 0;
    let includesLastCol = selection.toX === numberOfCols - 1;

    let { fromX, fromY, toX, toY } = selection;
    // console.log(fromX, fromY, toX, toY)
    let top = fromY * colHeight + headerHeight;
    let left = fromX * colWidth + leftOffset;
    let width = (toX - fromX + 1) * colWidth;
    let height = (toY - fromY + 1) * colHeight;

    //Check if the first col is in the selection. It has it's own width so we need to take that into account.
    if (includesFirstCol) {
      // update width with the difference between the firstColWidth and colWidth
      width += firstColWidth - colWidth;
    } else {
      // update left with the difference between the firstColWidth and colWidth
      left += firstColWidth - colWidth;
    }
    //Check if the last col is in the selection. It has it's own width so we need to take that into account.
    if (includesLastCol && lasColumnRisizeable) {
      // update width with the difference between the LastColWidth and colWidth
      width += lastColWidth - colWidth;
    }
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