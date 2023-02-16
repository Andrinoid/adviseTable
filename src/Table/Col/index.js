//react component
import React, { useRef, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import HoverIndicator from "./HoverIndicator";
import { clone, cloneDeep } from "lodash";

const Column = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
  align-items: center;
  justify-content: ${(props) => props.horizontalAlign};
  overflow: ${(props) => (props.type === "first" ? "hidden" : "visible")};
  user-select: none;
  box-sizing: border-box;
  ${({ showGrid, theme }) => {
    if (showGrid) {
      return theme.grid;
    }
  }}
`;

const Col = ({
  // internal props from Row
  children,
  id,
  y,
  x,
  left,
  type,
  internalStyle = {}, // style from the parent row is only for width, height, and left position. other styles are from the theme
  setTableMatrix,
  tableMatrix,
  setTotalCols,
  setNumberOfDataCols,
  theTheme,
  colspan,
  showGrid,
  totalWidth,
  hasTotalColumn,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  setBiggestTotalCellWidth,
  selectable,
  cleartSelectionTable,
  // outer props
  dataValue,
  spanSelection = true,
  empty = false,
  horizontalAlign = "right",
  style,
  onClick,
}) => {
  const currentColRef = useRef(null);

  /*
   *  Construct the matrix. if the row is not created, create it. If the row is created, push the column to the row
   *  The table matrix is used for calculating the selected area and has other opportunities for future features
   */
  useLayoutEffect(() => {
    cleartSelectionTable();
    setTableMatrix((prev) => {
      const { colspan } = currentColRef.current.dataset;
      let nextValue = prev;
      let index = x;
      if (prev[y]) {
        for (index; index <= (colspan ? x + (colspan - 1) : x); index++) {
          prev[y][index] = currentColRef;
        }
        nextValue = cloneDeep(prev);
      } else {
        prev[y] = [];
        for (index; index <= (colspan ? x + (colspan - 1) : x); index++) {
          prev[y][index] = currentColRef;
        }
        nextValue = cloneDeep(prev);
      }

      setTotalCols((prev) => {
        setNumberOfDataCols(() => {
          return hasTotalColumn ? index - 2 : index - 1;
        });
        return index;
      });
      return nextValue;
    });
    return () => {
      setTableMatrix((prev) => {
        let nextValue = cloneDeep(prev);
        if (nextValue[y]) {
          nextValue[y][x] = null;
        }
        for (let index = 0; index <= y; index++) {
          const row = nextValue[index];
          if (row && row[x] != null) {
            return nextValue;
          }
        }
        delete nextValue[y];
        setTotalCols((prev) => {
          setNumberOfDataCols((prevDataCols) => {
            return hasTotalColumn ? x - 2 : x - 1;
          });
          return x;
        });
        return nextValue;
      });
    };
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
      data-spanselection={spanSelection}
      type={type}
      id={id}
      data-selectable={selectable}
      className={`tableCol`}
      data-value={dataValue ? dataValue : children}
      onClick={onClick}
    >
      <HoverIndicator className="hoverIndicator" />
      {!empty && (
        <Cell
          parentWidth={internalStyle.width}
          parentType={type}
          totalWidth={totalWidth}
          setBiggestDataCellWidth={setBiggestDataCellWidth}
          setBiggestLabelCellWidth={setBiggestLabelCellWidth}
          setBiggestTotalCellWidth={setBiggestTotalCellWidth}
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
};

export default Col;
