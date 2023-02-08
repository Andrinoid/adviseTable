//react component  
import React, { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import HoverIndicator from './HoverIndicator';

const Column = styled.div`
    display: inline-flex;
    position: relative;
    align-items: center;
    justify-content: ${props => props.horizontalAlign};
    user-select: none;
    box-sizing: border-box;
    ${({ showGrid, theme }) => {
    if (showGrid) {
      return theme.grid;
    }
  }}
`;

const Col = memo(
  ({
    horizontalAlign = "right",
    children,
    style,
    internalStyle = {}, // style from the parent row is only for width, height, and left position. other styles are from the theme
    type,
    id,
    x,
    y,
    empty = false,
    colspan,
    showGrid,
    setTableMatrix,
    tableMatrix,
    theTheme,
    totalWidth,
    setBiggestDataCellWidth,
    setBiggestLabelCellWidth,
    biggestLabelCellWidth,
    setBiggestTotalCellWidth,
    biggestTotalCellWidth,
    selectable,
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
          for (
            let index = x;
            index <= (colspan ? x + (colspan - 1) : x);
            index++
          ) {
            prev[y][index] = currentColRef;
          }
          return prev;
        });
      } else {
        setTableMatrix((prev) => {
          // console.log("A", currentColRef.current.dataset.colspan);
          const { colspan } = currentColRef.current.dataset;
          const colRefs = [];
          for (
            let index = x;
            index <= (colspan ? x + (colspan - 1) : x);
            index++
          ) {
            colRefs[index] = currentColRef;
          }
          prev.push([colRefs]);
          return prev;
        });
      }
    }, [y, x]); 

    return (
      <Column
        horizontalAlign={horizontalAlign}
        style={{ ...style, ...internalStyle }}
        theme={theTheme}
        showGrid={showGrid}
        ref={currentColRef}
        x={x}
        y={y}
        // ↓ In SelectionAreas component we use the dom to get the selected area. Data attr are simpler to get
        data-x={x}
        data-y={y}
        data-colspan={colspan}
        type={type}
        id={id}
        data-selectable={selectable}
        className={`tableCol`}
      >
        <HoverIndicator className='hoverIndicator' />
        {!empty && (
          <Cell
            parentWidth={internalStyle.width}
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
  }
);

export default Col;