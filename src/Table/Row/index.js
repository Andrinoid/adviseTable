import React, { useCallback, useEffect, useRef, useState, memo, useLayoutEffect } from "react";
import styled from "styled-components";
import Col from "../Col";
import Brick from "../Col/Brick";

const RowElm = styled.div`
  position: relative;
  &:hover {
    .tableCol {
      ${({ theTheme }) => {
          return theTheme.rowHoverCol;
      }}  
    }
  }
`;

const Label = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  vertical-align: middle;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  font-weight: 500;
  pointer-events: none;
  background: gray;
  color: white;
  padding: 0 5px;
  z-index: 1;
`;

const Row = memo(({
  children,
  type = "primary",
  label,
  toolBoxContent,
  setInstanceCount,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  setBiggestTotalCellWidth,
  setTableMatrix,
  colWidth,
  colHeight,
  toolBoxWidth,
  numberOfDataCols,
  instanceCount,
  tableMatrix,
  totalWidth,
  labelColWidth,
  totalColWidth,
  biggestLabelCellWidth,
  biggestTotalCellWidth,
  tableId,
  theTheme,
  showGrid,
}) => {
  const currentRowRef = useRef(null);
  const [rowNumber, setRowNumber] = useState(null);

  const leftOffset = toolBoxWidth;

  /**
   * Count the instances of this component and set the row number
   */
  useEffect(() => {
    if (rowNumber == null) {
      let rows = document.querySelectorAll(`.${tableId}-tableRow`);
      //find the current rowRef in the rows array
      let index = Array.prototype.indexOf.call(rows, currentRowRef.current);
      setRowNumber((_) => index);
      setInstanceCount(() => {
        return index;
      });
    }
  }, [instanceCount]);
  // useEffect(() => {
  //   console.log('instanceCount', instanceCount)
  //   if (rowNumber == null) {
  //     setInstanceCount((value) => {
  //       // SetTimout is a fix for: Cannot update a component from inside the function body of a different component.
  //       // setTimeout(() => {
  //         setRowNumber((_) => value);
  //       // }, 0);
  //       return value + 1;
  //     });
  //   }
  // }, [instanceCount]);

  const getValidChildren = (childrenFromProps) => {
    return React.Children.toArray(childrenFromProps).filter((child) => {
      return child.type === Col;
    });
  };

  /**
   * Map over the children that should be Col components and add the props we need
   * We want to keep the Col component simple for the user so we inject the props here
   * We have three types of cols: first, middle and last becuase first and last cols have different widths
   * and are rezisable. Data cols however are not resizable and have the same width
   */
  let numCols = 0;
  const childrenWithProps = React.Children.map(
    getValidChildren(children),
    (child) => {
      let colType;
      let left;
      let width;
      const { colspan } = child.props;

      if (React.isValidElement(child)) {
        const i = numCols;
        if (i === 0) {
          colType = "first";
          left = leftOffset;
          width = labelColWidth;

          if (colspan > 1) {
            width = labelColWidth + (colspan - 1) * colWidth;
          }
        } else if (i === numberOfDataCols + 1) {
          // plus one becuse the last col is not a dataCol e.g. total
          colType = "last";
          left = leftOffset + numberOfDataCols * colWidth + labelColWidth;
          width = totalColWidth;
        } else {
          colType = "middle";
          left = leftOffset + labelColWidth + (numCols - 1) * colWidth;
          width = colspan ? colspan * colWidth : colWidth;
        }

        if (colspan) {
          numCols += colspan;
        } else {
          numCols++;
        }

        return React.cloneElement(child, {
          id: `x${i}y${rowNumber}`,
          y: rowNumber,
          x: i,
          type: colType,
          style: { width: width, height: colHeight, top: 0, left: left },
          setTableMatrix,
          tableMatrix,
          theTheme,
          showGrid,
          totalWidth,
          setBiggestDataCellWidth,
          setBiggestLabelCellWidth,
          biggestLabelCellWidth,
          setBiggestTotalCellWidth,
          biggestTotalCellWidth,
        });
      }
      return child;
    }
  );

  return (
    <>
      {/* We only need the height here because all cols are position absolute
       * Having cols as position absolute has no purpose yet, they could be inline block  ¯\_(ツ)_/¯
       */}
      <RowElm
        className={`${tableId}-tableRow`}
        type={type}
        style={{ height: colHeight, width: totalWidth }}
        ref={currentRowRef}
        y={rowNumber}
        theTheme={theTheme}
      >
        {label && <Label>{label}</Label>}

        {toolBoxContent && (
          <Brick
            theTheme={theTheme}
            showGrid={showGrid}
            horizontalAlign="left"
            location={"left"}
            style={{
              width: toolBoxWidth,
              height: colHeight,
              zIndex: 1,
              left: 0,
              position: "sticky",
            }}
          >
            {toolBoxContent}
          </Brick>
        )}
        {!toolBoxContent && (
          <Brick
            theTheme={theTheme}
            showGrid={showGrid}
            location={"left"}
            style={{
              width: toolBoxWidth,
              height: colHeight,
              position: "sticky",
              left: 0,
              zIndex: 101,
            }}
          />
        )}

        {childrenWithProps}
      </RowElm>
    </>
  );
});

export default Row;
