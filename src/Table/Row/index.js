import React, { useCallback, useEffect, useRef, useState, memo } from "react";
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

// let Outliner = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border: 0.5px dashed transparent;
//     pointer-events: none;
//     z-index: 100;
//     &.hightlighted {
//         background: rgba(33,150,243,0.2);
//     }
//     &.outline-top {
//         border-top: 1px dashed #65b2fe;
//         border-left: 1px dashed #65b2fe;
//         border-right: 1px dashed #65b2fe;
//     }
//     &.outline-bottom {
//         border-bottom: 1px dashed #65b2fe;
//         border-left: 1px dashed #65b2fe;
//         border-right: 1px dashed #65b2fe;
//     }
//     &.outline-middle {
//         border-left: 1px dashed #65b2fe;
//         border-right: 1px dashed #65b2fe;
//     }
// }`;

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

// Copunter for instances of this component used for row number

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
  // selectedAreas,
  instanceCount,
  tableMatrix,
  // mouseDownColCord,
  // mouseMoveColCord,
  totalWidth,
  labelColWidth,
  totalColWidth,
  biggestLabelCellWidth,
  biggestTotalCellWidth,
  theTheme,
  // selectionMode,
  showGrid,
}) => {
  const currentRowRef = useRef(null);
  // const [hover, setHover] = useState(false);
  const [rowNumber, setRowNumber] = useState(null);

  const leftOffset = toolBoxWidth;

  const updateRowNumber = useCallback(
    (value) => {
      setTimeout(() => {
        setRowNumber(value);
      }, 10);
    },
    [rowNumber, setRowNumber]
  );

  /**
   * Count the instances of this component and set the row number
   */
  useEffect(() => {
    if (rowNumber == null) {
      setInstanceCount((value) => {
        updateRowNumber(value);
        return value + 1;
      });
    }
  }, [instanceCount]);

  // const createOutlineClasses = (min, max, rowNumber) => {
  //   let classes = [];
  //   if (rowNumber == min) {
  //     classes.push("outline-top");
  //   }
  //   if (rowNumber == max) {
  //     classes.push("outline-bottom");
  //   }
  //   if (rowNumber > min && rowNumber < max) {
  //     classes.push("outline-middle");
  //   }
  //   classes.push("hightlighted");
  //   return classes.join(" ");
  // };

  // const isHightlighted = () => {
  //   if (selectionMode !== "row") return false;
  //   let isInSelection = false;
  //   let min;
  //   let max;

  //   if (mouseDownColCord && mouseMoveColCord) {
  //     min = Math.min(mouseDownColCord[1], mouseMoveColCord[1]);
  //     max = Math.max(mouseDownColCord[1], mouseMoveColCord[1]);

  //     if (rowNumber >= min && rowNumber <= max) {
  //       isInSelection = true;
  //     }
  //   }

  //   if (mouseDownColCord && !mouseMoveColCord) {
  //     if (rowNumber == mouseDownColCord[1]) {
  //       isInSelection = true;
  //       min = rowNumber;
  //       max = rowNumber;
  //     }
  //   }

  //   if (isInSelection) {
  //     return createOutlineClasses(min, max, rowNumber);
  //   }
  // };

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
          // rowType: type,
          // rowHover: hover,
          style: { width: width, height: colHeight, top: 0, left: left },
          // selectedAreas,
          setTableMatrix,
          tableMatrix,
          theTheme,
          // selectionMode,
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
        // onMouseOver={() => setHover(true)}
        // onMouseOut={() => setHover(false)}
        type={type}
        // hover={hover}
        style={{ height: colHeight, width: totalWidth }}
        ref={currentRowRef}
        y={rowNumber}
        theTheme={theTheme}
      >
        {label && <Label>{label}</Label>}

        {/* <Outliner className={isHightlighted()} /> */}
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
