//react component  
import React, { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { getContainedArea } from '../Table/SelectedAreas';


const Column = styled.div`
// transition: width 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: ${props => props.horizontalAlign};
    position: absolute;
    user-select: none;
    box-sizing: border-box;
    ${({ showGrid, theme }) => {
    if (showGrid) {
      return theme.grid;
    }
  }}
`;

let Outliner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
    &.hightlighted {
        background: rgba(33,150,243,0.2);
    }
    &.outline-left {
        border-left: 1px solid #65b2fe;
    }
    &.outline-right {
        border-right: 1px solid #65b2fe;
    }
    &.outline-top {
        border-top: 1px solid #65b2fe;
    }
    &.outline-bottom {
        border-bottom: 1px solid #65b2fe;
    }
}`;

const Col = memo(({
  horizontalAlign = "right",
  // rowType, // row is the parent row for this column
  // rowHover, // row is the parent row for this column
  children,
  style = {}, // style from the parent row is only for width, height, and left position. other styles are from the theme
  type,
  id,
  x,
  y,
  empty = false,
  colspan,
  showGrid,
  // selectedAreas,
  setTableMatrix,
  tableMatrix,
  theTheme,
  // selectionMode,
  totalWidth,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  biggestLabelCellWidth,
  setBiggestTotalCellWidth,
  biggestTotalCellWidth,

}) => {
  const currentColRef = useRef(null);
  /*
   *  Construct the matrix. if the row is not created, create it. If the row is created, push the column to the row
   *  The table matrix is used for calculating the selected area and has other opportunities for future features
   */
  useEffect(() => {
    if (tableMatrix[y]) {
      setTableMatrix((prev) => {
        // console.log("A", currentColRef.current.dataset.colspan);
        const { colspan } = currentColRef.current.dataset;
        for (let index = x; index <= (colspan ? x + (colspan - 1) : x); index++) {
          prev[y][index] = currentColRef;
        }
        return prev;
      });
    } else {
      setTableMatrix((prev) => {
        // console.log("A", currentColRef.current.dataset.colspan);
        const { colspan } = currentColRef.current.dataset;
        const colRefs = [];
        for (let index = x; index <= (colspan ? x + (colspan - 1) : x); index++) {
          colRefs[index] = currentColRef;
        }
        prev.push([colRefs]);
        return prev;
      });
    }
  }, [y, x]);

  /**
   * Create the outline classes to show the selected area
   */
  // const createOutlineClasses = (minX, maxX, minY, maxY) => {
  //   let classes = [];
  //   // if (y === minY) classes.push("outline-top");
  //   // if (y === maxY) classes.push("outline-bottom");
  //   // if (x === minX) classes.push("outline-left");
  //   // if (x === maxX) classes.push("outline-right");
  //   classes.push("hightlighted");

  //   return classes.join(" ");
  // };

  /**
   * Calculate the selected area
   * Note that we can not draw the selected area here, because we are in a single column component
   * Selected is tracked in the SelectedAreas.js component on root level
   */
  // const isHightlighted = () => {
  //   if (selectionMode !== "cell") return;

  //   const containedArea = getContainedArea(selectedAreas, { x, y });
  //   if (containedArea) {
  //     return createOutlineClasses(
  //       containedArea.fromX,
  //       containedArea.toX,
  //       containedArea.fromY,
  //       containedArea.toY,
  //       x,
  //       y
  //     );
  //   }

  //   return false;
  // };

  return (
    <Column
      horizontalAlign={horizontalAlign}
      // rowHover={rowHover}
      // rowType={rowType}
      style={{ ...style }}
      theme={theTheme}
      showGrid={showGrid}
      ref={currentColRef}
      x={x}
      y={y}
      // ↓ In Selection component we use the dom to get the selected area. Data attr are simpler to get
      data-x={x}
      data-y={y}
      data-colspan={colspan}
      type={type}
      id={id}
      className={`tableCol`}
    >
      {/* <Outliner className={isHightlighted()} /> */}
      {!empty && (
        <Cell
          parentWidth={style.width}
          parentType={type}
          totalWidth={totalWidth}
          setBiggestDataCellWidth={setBiggestDataCellWidth}
          setBiggestLabelCellWidth={setBiggestLabelCellWidth}
          biggestLabelCellWidth={biggestLabelCellWidth}
          setBiggestTotalCellWidth={setBiggestTotalCellWidth}
          biggestTotalCellWidth={biggestTotalCellWidth}
        >
          {children}
        </Cell>
      )}
      {/* empty Col's are used by ResizableCols for a child ref as I could not manage to have two ref on the cell,
       * one for the matrix and another for the resize. The solution is to use empty col in resizeCol and fill the space
       * with a child for mesurements
       */}
      {empty && <>{children}</>}
      {/* y:{y} x:{x} */}
    </Column>
  );
});

export default Col;