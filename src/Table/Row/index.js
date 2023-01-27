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
  leftBrickContent,
  setInstanceCount,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  setBiggestTotalCellWidth,
  setTableMatrix,
  colWidth,
  colHeight,
  leftBrickWidth,
  numberOfDataCols,
  instanceCount,
  tableMatrix,
  totalWidth,
  firstColWidth,
  lastColWidth,
  biggestLabelCellWidth,
  biggestTotalCellWidth,
  tableId,
  theTheme,
  showGrid,
  totalCols,
}) => {
  const currentRowRef = useRef(null);
  const [rowNumber, setRowNumber] = useState(null);

  const leftOffset = leftBrickWidth;

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
   * @returns the amount of cols that aren't being used
   */
  const getRemainingCols = () => {
    const usedCols = getValidChildren(children).reduce((acc, { props: { colspan }}) => {
      if (Number.isInteger(colspan)) {
        return acc += colspan;
      }
      return acc++;
    }, 0);

    return totalCols - usedCols;
  }

  /**
   * @returns the amount of cols that have the colspan prop set to "fullwidth"
   */
  const getFullWidthColsAmount = () => {
    const amount = getValidChildren(children).filter((child) => {
      return child.props.colspan == "fullwidth";
    }).length

    return amount;
  }

  /**
    * If the last col is a fullwidth col, we need to add the remaining space to it
    * e.g. if we have 3 fullwidth cols and 2 cols left, we need to add 2 to the last col
    * so that it takes up the remaining space
    * @param {number} i - the index of the col
    * @param {number} k - the amount of fullwidth cols
    * @param {number} colspan - the colspan of the col
    * @returns {number} the colspan of the col
    * @example totalCols = 14
    * calculateFullWidthColspan(2, 3, 1) // returns 3 because 14 % 3 = 2 and 2 + 1 = 3
    * calculateFullWidthColspan(1, 3, 1) // returns 1 because it's not the last col
    * calculateFullWidthColspan(0, 3, 1) // returns 1 because it's not the last col
    */
  function calculateFullWidthColspan(i, k, remainingCols) {
    const colspan = Math.floor((remainingCols) / k);
    const isLastCol = i == k - 1;
    const extraSpan = totalCols % k;

    if (extraSpan != 0 && isLastCol) {
      return colspan + extraSpan;
    }
    
    return colspan;
  }


  /**
   * Map over the children that should be Col components and add the props we need
   * We want to keep the Col component simple for the user so we inject the props here
   * We have three types of cols: first, middle and last becuase first and last cols have different widths
   * and are rezisable. Data cols however are not resizable and have the same width
   */
  let numCols = 0;
  let fullWidthColsCount = 0;
  const remainingCols = getRemainingCols();
  const totalFullWidthCols = getFullWidthColsAmount();
  const childrenWithProps = React.Children.map(
    getValidChildren(children),
    (child) => {
      let colType;
      let left;
      let width;
      let { colspan } = child.props;

      if (remainingCols > 0 && colspan == "fullwidth") {
        colspan = calculateFullWidthColspan(
          fullWidthColsCount,
          totalFullWidthCols,
          remainingCols
        );
        fullWidthColsCount++;
      }

      if (React.isValidElement(child)) {
        const i = numCols;
        if (i === 0) {
          colType = "first";
          left = leftOffset;
          width = firstColWidth;

          if (colspan > 1) {
            width = firstColWidth + (colspan - 1) * colWidth;
          }
        } else if (i === numberOfDataCols + 1) {
          // plus one becuse the last col is not a dataCol e.g. total
          colType = "last";
          left = leftOffset + numberOfDataCols * colWidth + firstColWidth;
          width = lastColWidth;
        } else {
          colType = "middle";
          left = leftOffset + firstColWidth + (numCols - 1) * colWidth;
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
          colspan
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

        {leftBrickContent && (
          <Brick
            theTheme={theTheme}
            showGrid={showGrid}
            horizontalAlign="left"
            location={"left"}
            style={{
              width: leftBrickWidth,
              height: colHeight,
              zIndex: 1,
              left: 0,
              position: "sticky",
            }}
          >
            {leftBrickContent}
          </Brick>
        )}
        {!leftBrickContent && (
          <Brick
            theTheme={theTheme}
            showGrid={showGrid}
            location={"left"}
            style={{
              width: leftBrickWidth,
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


