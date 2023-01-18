//jsx component
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useImperativeHandle,
  useCallback,
  memo
} from "react";
import styled from "styled-components";

import { useSyncScroller } from "../utils/useSyncScroller";

import Header from "../Header";
import Footer from "../Footer";
import { TableContext } from "../context";
import SelectedArea, { getContainedArea } from "./SelectedAreas";
import Scroller from "./Scroller";
import themes from "./themes";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const ViewPort = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  position: relative;
  min-width: 0;
  flex-direction: row;
  display: flex;
  flex: 1 1 auto;
`;

const Table = (
  {
    onSelection = () => {},
    headerStickyTopOffset = 0,
    width,
    selectionMode = "cell",
    leftBrickWidth = 50,
    theme = "light",
    expandedIds,
    headerData,
    showGrid, // Boolean
    children,
    tableId, // make required
    footer, //Boolean
  },
  ref
) => {
  useEffect(() => {
    setTheTheme(themes[theme]);
  }, [theme]);

  const viewportRef = useRef(null);
  const [theTheme, setTheTheme] = useState(themes[theme]);

  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [labelColWidth, setlabelColWidth] = useState(150);
  const [numberOfDataCols, setNumberOfDataCols] = useState(
    headerData.length - 2
  );
  const [headerHeight, setHeaderHeight] = useState(35);
  const [colHeight, setColHeight] = useState(40);
  // const [totalHeight, setTotalHeight] = useState(view.length * colHeight + headerHeight);
  const [totalWidth, setTotalWidth] = useState(1350);
  const [toolBoxWidth, setToolBoxWidth] = useState(leftBrickWidth);
  const [totalColWidth, setTotalColWidth] = useState(100);
  const [colWidth, setColWidth] = useState(
    (totalWidth - labelColWidth - toolBoxWidth - totalColWidth) /
      numberOfDataCols
  );

  const [mouseDownColCord, setMouseDownColCord] = useState(null);
  const [mouseMoveColCord, setMouseMoveColCord] = useState(null);
  const [mouseUpColCord, setMouseUpColCord] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const [selectColDraging, setSelectColDraging] = useState(false);
  const [selectedCol, setSelectedCol] = useState(null);

  // The table matrix is supposed to be set in the col component, where each component inject it self into the matrix, This is not working. We need a better way to do this
  const [tableMatrix, setTableMatrix] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [biggestLabelCellWidth, setBiggestLabelCellWidth] = useState(0);
  const [biggestDataCellWidth, setBiggestDataCellWidth] = useState(0);
  const [biggestTotalCellWidth, setBiggestTotalCellWidth] = useState(0);

  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedSum, setSelectedSum] = useState(0);
  const [selectedMin, setSelectedMin] = useState(0);
  const [selectedMax, setSelectedMax] = useState(0);
  const [selectedAvg, setSelectedAvg] = useState(0);

  const [instanceCount, setInstanceCount] = useState(0);

  // create unique id for each table. Used for seperating events]
  // const tableId = 'id-' + Math.random().toString(36).substr(2, 9);
  const headerScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const viewportScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const tableContainerRef = useRef(null);

  /**
   *
   * Computes the minimun size allowed to the table without overflowing the numbers
   */
  const getAdjustedSize = useCallback(() => {
    return (
      labelColWidth +
      toolBoxWidth +
      totalColWidth +
      biggestDataCellWidth * numberOfDataCols
    );
  }, [
    labelColWidth,
    toolBoxWidth,
    totalColWidth,
    biggestDataCellWidth,
    numberOfDataCols,
  ]);

  /**
   * expose method to parent component
   * For this to work, the parent component must pass a ref to this component
   * autoAdjust() will adjust the width of the table data cols to fit the data
   * usage in app: tableRef.current.autoAdjust()
   */
  useImperativeHandle(ref, () => ({
    autoAdjust() {
      autoAdjustDataColWidth();
    },
  }));

  /**
   * Update the total With but applying validation to the minimun width
   */
  const updateTableWith = useCallback(
    (width) => {
      const minSize = getAdjustedSize();
      if (!width || width < minSize) {
        setTotalWidth(minSize);
      } else {
        setTotalWidth(width);
      }
    },
    [getAdjustedSize]
  );

  useEffect(() => {
    updateTableWith(width ? width : tableContainerRef.current.offsetWidth);
  }, [
    updateTableWith,
    width,
    labelColWidth,
    toolBoxWidth,
    totalColWidth,
    biggestDataCellWidth,
    numberOfDataCols,
  ]);

  /**
   * Updates the number of columns when headerData.length changes
   * */
  useEffect(() => {
    setNumberOfDataCols(headerData.length - 2);
  }, [headerData]);

  /**
   * when the width of the table changes, recalculate the width of the data cols
   */
  useEffect(() => {
    setColWidth(calcColWidth);
  }, [labelColWidth, totalColWidth, totalWidth, numberOfDataCols]);

  /**
   * Messure the viewport width and height.
   * the width may vary based on the css applied to parent elements or the browser window width
   */
  useLayoutEffect(() => {
    if (viewportRef?.current?.offsetWidth)
      setViewportWidth(viewportRef.current.offsetWidth);
    if (viewportRef?.current?.offsetHeight)
      setViewportHeight(viewportRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    const callback = () => {
      if (tableContainerRef?.current?.offsetWidth) {
        updateTableWith(tableContainerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [updateTableWith, biggestDataCellWidth]);

  /**
   *  Watch for changes mouseDownColCord and mouseMoveColCord to calculate the selected area
   */
  useEffect(() => {
    computeAreaData(selectedAreas);
    onSelection({
      selectedSum,
      selectedAvg,
      selectedMin,
      selectedMax,
      selectedCount,
    });
  }, [JSON.stringify(selectedAreas)]);

  /**
   * This function auto adjusts the width of the first col to fit the biggest label
   * It is run by double clicking the first col resizer
   */
  const autoAdjustLabelColWidth = () => {
    setlabelColWidth(biggestLabelCellWidth);
  };

  /**
   * as above so bellow
   * This applies to last col
   */
  const autoAdjustTotalColWidth = () => {
    setTotalColWidth(biggestTotalCellWidth);
  };

  /**
   * This function auto adjusts the width of the data cols to fit the biggest data cell
   * it is exposed to the parent component to run if needed
   */
  const autoAdjustDataColWidth = () => {
    updateTableWith(getAdjustedSize());
  };

  /**
   * callback function for the label col resizer
   */
  const onLabelColResize = (width) => {
    setlabelColWidth(width);
  };

  /**
   * callback function for the total col resizer
   */
  const onTotalColResize = (width) => {
    setTotalColWidth(width);
  };

  /**
   * callback function for the table resizer
   */
  const onTableResize = (width) => {
    updateTableWith(width);
  };

  /**
   *  Calculate the width of the data cols based on moving parts
   *  changes to the all other parts of the table will affect the width of the data cols
   */
  const calcColWidth = () => {
    return (
      (totalWidth - labelColWidth - toolBoxWidth - totalColWidth) /
      numberOfDataCols
    );
  };

  /**
   * This function figures out the selected area based on the mouseDownColCord and mouseMoveColCord
   * and does basic calculations on the selected area values
   * These culations are used to display the selected area values in the footer
   * Better approach would be to run a prop function for the parent component to use the values,
   * becuse the footer is not always visible
   */
  const computeAreaData = (selectedAreas) => {
    let count = 0;
    let sum = 0;
    let min = 0;
    let max = 0;
    let avg = 0;
    tableMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        let containedArea = getContainedArea(selectedAreas, {
          x: colIndex,
          y: rowIndex,
        });
        if (containedArea && !containedArea.isExclusion) {
          count++;
          try {
            let value = tableMatrix[rowIndex][colIndex].current.innerText;
            // try to convert value to number
            value = Number(value);
            if (!isNaN(value)) {
              sum += value;
            }
            // find the lowest value
            if (min === 0) {
              min = value;
            } else if (value < min) {
              min = value;
            }
            // find the highest value
            if (max === 0) {
              max = value;
            } else if (value > max) {
              max = value;
            }
            avg = sum / count;
          } catch (error) {
            console.warn(error);
          }
        }
      });
    });

    setSelectedCount(count);
    setSelectedSum(sum);
    setSelectedMin(min);
    setSelectedMax(max);
    setSelectedAvg(avg);

    // // If there is no endCord, it means that we only have one cell selected so we set the endCord to the startCord
    // if (startCord && !endCord) {
    //   endCord = startCord;
    // }
    // if (!startCord || !endCord) return null;
    // const startY = startCord[1];
    // const endY = endCord[1];
    // const startX = startCord[0];
    // const endX = endCord[0];

    // const minY = Math.min(startY, endY);
    // const maxY = Math.max(startY, endY);
    // const minX = Math.min(startX, endX);
    // const maxX = Math.max(startX, endX);

    // const selectedArea = [];
    // let count = 0;
    // let sum = 0;
    // let min = 0;
    // let max = 0;
    // let avg = 0;
    // //pick the selected area from the table matrix
    // for (let i = minY; i <= maxY; i++) {
    //   for (let j = minX; j <= maxX; j++) {
    //     selectedArea.push(tableMatrix[i][j]);
    //     try {
    //       let value = tableMatrix[i][j].current.innerText;
    //       // try to convert value to number
    //       value = Number(value);
    //       if (!isNaN(value)) {
    //         sum += value;
    //       }
    //       // find the lowest value
    //       if (min === 0) {
    //         min = value;
    //       } else if (value < min) {
    //         min = value;
    //       }
    //       // find the highest value
    //       if (max === 0) {
    //         max = value;
    //       } else if (value > max) {
    //         max = value;
    //       }
    //       avg = sum / count;
    //     } catch (error) {
    //       console.warn(error);
    //     }

    //     count++;
    //   }
    // }

    // setSelectedCount(count);
    // setSelectedSum(sum);
    // setSelectedMin(min);
    // setSelectedMax(max);
    // setSelectedAvg(avg);
  };

  return (
    <div ref={tableContainerRef}>
      { JSON.stringify(selectedAreas.length)}
      { JSON.stringify(selectedAreas)}
      <TableContext.Provider
        value={{
          setSelectedAreas,
          selectedAreas,
          setSelectColDraging,
          setMouseDownColCord,
          setMouseMoveColCord,
          setMouseUpColCord,
          setSelectedCount,
          setTotalWidth,
          setlabelColWidth,
          setTotalColWidth,
          setBiggestDataCellWidth,
          setBiggestLabelCellWidth,
          setBiggestTotalCellWidth,
          autoAdjustLabelColWidth,
          autoAdjustTotalColWidth,
          setSelectedCol,
          setTableMatrix,
          tableMatrix,
          selectColDraging,
          mouseDownColCord,
          mouseMoveColCord,
          mouseUpColCord,
          totalWidth,
          labelColWidth,
          totalColWidth,
          biggestDataCellWidth,
          biggestLabelCellWidth,
          biggestTotalCellWidth,
          viewportHeight,
          selectedCol,
          theTheme,
          selectionMode,
          tableId,
          showGrid,
        }}
      >
        <Wrapper ref={ref} id={tableId}>
          <Header
            ref={headerScrollRef}
            className="scrollable"
            width={viewportWidth}
            colHeight={headerHeight}
            colWidth={colWidth}
            labelColWidth={labelColWidth}
            toolBoxWidth={toolBoxWidth}
            totalColWidth={totalColWidth}
            totalWidth={totalWidth}
            viewportHeight={viewportHeight}
            onLabelColResize={onLabelColResize}
            onTotalColResize={onTotalColResize}
            onTableResize={onTableResize}
            numberOfDataCols={numberOfDataCols}
            theTheme={theTheme}
            data={headerData}
            stickyTopOffset={headerStickyTopOffset}
          />

          <ViewPort
            className={`viewPort${tableId} scrollable`}
            ref={(el) => {
              viewportRef.current = el;
              viewportScrollRef.current = el;
            }}
          >
            <div
              style={{ width: totalWidth, position: "relative" }}
              className={`${tableId}container`}
            >
              {children({
                rowProps: {
                  colWidth: colWidth,
                  totalWidth: totalWidth,
                  colHeight: colHeight,
                  labelColWidth: labelColWidth,
                  toolBoxWidth: toolBoxWidth,
                  totalColWidth: totalColWidth,
                  topOffset: headerHeight,
                  numberOfDataCols: numberOfDataCols,
                  expandedIds: expandedIds,
                  selectionMode,
                  mouseDownColCord,
                  mouseMoveColCord,
                  selectedAreas,
                  setToolBoxWidth,
                  setInstanceCount,
                  instanceCount,
                  tableId,
                  theTheme,
                },
              })}
            </div>

            <SelectedArea onSelection={onSelection} tableId={tableId} />
            <Scroller active={selectColDraging} tableId={tableId} />
          </ViewPort>
          <div className="table-end"></div>
          <Footer
            maxWidth={totalWidth}
            count={selectedCount}
            sum={selectedSum}
            min={selectedMin}
            max={selectedMax}
            avg={selectedAvg}
            vissible={footer}
          />
        </Wrapper>
      </TableContext.Provider>
    </div>
  );
};

export default memo(React.forwardRef(Table));
