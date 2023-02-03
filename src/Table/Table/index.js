//jsx component
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSyncScroller } from "../utils/useSyncScroller";
import Header from "../Header";
import Footer from "../Footer";
import SelectedArea, { getContainedArea } from "./SelectedAreas";
import Scroller from "./Scroller";
import themes from "./themes";
import Selection from "./Selection";
import { Copier } from "./Copier";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const ViewPort = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  min-width: 0;
  flex-direction: row;
  display: flex;
  flex: 1 1 auto;
`;

const Table = ({
  onSelection = () => {},
  headerStickyTopOffset = 0,
  lasColumnRisizeable = true,
  selectionMode = "cell",
  leftBrickWidth = 50,
  theme = "light",
  headerData,
  showGrid, // Boolean
  children,
  tableId, // make required
  footer, //Boolean
  width,
}) => {
  useEffect(() => {
    setTheTheme(themes[theme]);
  }, [theme]);

  const viewportRef = useRef(null);
  const [theTheme, setTheTheme] = useState(themes[theme]);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [firstColWidth, setfirstColWidth] = useState(150);
  const [numberOfDataCols, setNumberOfDataCols] = useState(
    headerData.length - 2
  );
  const [headerHeight, setHeaderHeight] = useState(35);
  const [colHeight, setColHeight] = useState(40);
  const [totalWidth, setTotalWidth] = useState(1350);
  const [lastColWidth, setLastColWidth] = useState(100);
  const [colWidth, setColWidth] = useState(
    (totalWidth - firstColWidth - leftBrickWidth - lastColWidth) /
      numberOfDataCols
  );
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectColDraging, setSelectColDraging] = useState(false);

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

  const headerScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const viewportScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const tableLayerScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const tableContainerRef = useRef(null);

  /**
   * When the selection mode changes, clear the selected areas
   */
  useEffect(() => {
    setSelectedAreas([]);
  }, [selectionMode]);

  /**
   *
   * Computes the minimun size allowed to the table without overflowing the numbers
   */
  const getAdjustedSize = useCallback(() => {
    return (
      firstColWidth +
      leftBrickWidth +
      lastColWidth +
      biggestDataCellWidth * numberOfDataCols
    );
  }, [
    firstColWidth,
    leftBrickWidth,
    lastColWidth,
    biggestDataCellWidth,
    numberOfDataCols,
  ]);

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
    measureViewport();
  }, [
    updateTableWith,
    width,
    firstColWidth,
    leftBrickWidth,
    lastColWidth,
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
    if (!lasColumnRisizeable) {
      setLastColWidth(calcColWidth);
    }
  }, [
    firstColWidth,
    lastColWidth,
    totalWidth,
    numberOfDataCols,
    lasColumnRisizeable,
  ]);

  /**
   * Messure the viewport width and height.
   * the width may vary based on the css applied to parent elements or the browser window width
   */
  const measureViewport = useCallback(() => {
    if (viewportRef?.current?.offsetWidth)
      setViewportWidth(viewportRef.current.offsetWidth);
  }, [viewportRef]);

  useEffect(() => {
    const callback = () => {
      if (tableContainerRef?.current?.offsetWidth) {
        updateTableWith(tableContainerRef.current.offsetWidth);
      }
      measureViewport();
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
  }, [JSON.stringify(selectedAreas)]);

  /**
   * This function auto adjusts the width of the first col to fit the biggest first col cell
   * It is run by double clicking the first col resizer
   */
  const autoAdjustFirstColWidth = useCallback(() => {
    setfirstColWidth(biggestLabelCellWidth);
  }, [biggestLabelCellWidth]);

  /**
   * as above so bellow
   * This applies to last col
   */
  const autoAdjustLastColWidth = useCallback(() => {
    setLastColWidth(biggestTotalCellWidth);
  }, [biggestTotalCellWidth]);

  /**
   * This function auto adjusts the width of the data cols to fit the biggest data cell
   */
  // const autoAdjustDataColWidth = () => {
  //   updateTableWith(getAdjustedSize());
  // };

  /**
   * callback function for the label col resizer
   */
  const onFirstColResize = useCallback((width) => {
    setfirstColWidth(width);
  }, []);

  /**
   * callback function for the total col resizer
   */
  const onLastColResize = useCallback((width) => {
    setLastColWidth(width);
  }, []);

  /**
   * callback function for the table resizer
   */
  const onTableResize = useCallback((width) => {
    updateTableWith(width);
  }, []);

  /**
   *  Calculate the width of the data cols based on moving parts
   *  changes to the all other parts of the table will affect the width of the data cols
   */
  const calcColWidth = () => {
    return (
      (totalWidth - firstColWidth - leftBrickWidth - lastColWidth) /
      numberOfDataCols
    );
  };

  /**
   * Basic calculations on the selected area values
   * It's sets the state variables selectedSum, selectedAvg, selectedMin, selectedMax, selectedCount
   * and fires the onSelection callback
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
    onSelection({
      selectedSum: sum,
      selectedAvg: avg,
      selectedMin: min,
      selectedMax: max,
      selectedCount: count,
    });
  };

  const copyToClipboard = (selectedAreas) => {
    const copier = new Copier(tableMatrix, selectedAreas);
    copier.copy();
  };

  useEffect(() => {
    copyToClipboard(selectedAreas);
  }, [selectedAreas]);

  const [childrenRows, setChildrenRows] = useState([]);
  useEffect(() => {
    setChildrenRows(
      children({
        rowProps: {
          setInstanceCount,
          setBiggestDataCellWidth,
          setBiggestLabelCellWidth,
          setBiggestTotalCellWidth,
          autoAdjustFirstColWidth,
          autoAdjustLastColWidth,
          setTableMatrix,
          colWidth,
          colHeight,
          leftBrickWidth,
          topOffset: headerHeight,
          numberOfDataCols,
          instanceCount,
          tableMatrix,
          totalWidth,
          firstColWidth,
          lastColWidth,
          biggestDataCellWidth,
          biggestLabelCellWidth,
          biggestTotalCellWidth,
          tableId,
          theTheme,
          showGrid,
          totalCols: headerData.length,
          lasColumnRisizeable,
        },
      })
    );
  }, [
    totalWidth,
    firstColWidth,
    lastColWidth,
    biggestDataCellWidth,
    children,
    autoAdjustFirstColWidth,
    autoAdjustLastColWidth,
    colWidth,
    colHeight,
    leftBrickWidth,
    headerHeight,
    numberOfDataCols,
    instanceCount,
    tableMatrix,
    biggestLabelCellWidth,
    biggestTotalCellWidth,
    theTheme,
    showGrid,
    headerData,
  ]);

  return (
    <div ref={tableContainerRef} style={{ position: "relative" }}>
      <Wrapper id={tableId}>
        <Header
          ref={headerScrollRef}
          className="scrollable"
          width={viewportWidth}
          colHeight={headerHeight}
          colWidth={colWidth}
          firstColWidth={firstColWidth}
          leftBrickWidth={leftBrickWidth}
          lastColWidth={lastColWidth}
          totalWidth={totalWidth}
          onFirstColResize={onFirstColResize}
          onLastColResize={onLastColResize}
          onTableResize={onTableResize}
          numberOfDataCols={numberOfDataCols}
          theTheme={theTheme}
          data={headerData}
          stickyTopOffset={headerStickyTopOffset}
          showGrid={showGrid}
          autoAdjustFirstColWidth={autoAdjustFirstColWidth}
          autoAdjustLastColWidth={autoAdjustLastColWidth}
          lasColumnRisizeable={lasColumnRisizeable}
        />

        <ViewPort
          className={`viewPort${tableId} scrollable`}
          style={theTheme.secondary}
          ref={(el) => {
            viewportRef.current = el;
            viewportScrollRef.current = el;
          }}
        >
          <div
            style={{ width: totalWidth, zIndex: 1 }}
            className={`${tableId}container`}
          >
            {childrenRows}
          </div>

          <SelectedArea
            selectionMode={selectionMode}
            tableId={tableId}
            setSelectColDraging={setSelectColDraging}
            setSelectedCount={setSelectedCount}
            setSelectedAreas={setSelectedAreas}
            tableMatrix={tableMatrix}
          />

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

        {/* Refactor to make it pretty */}
        <div
          ref={tableLayerScrollRef}
          className="scrollable"
          style={{
            position: "absolute",
            inset: 0,
            width: viewportWidth,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: totalWidth,
              height: "100%",
            }}
          >
            <Selection
              selectedAreas={selectedAreas}
              colWidth={colWidth}
              colHeight={colHeight}
              leftOffset={leftBrickWidth}
              firstColWidth={firstColWidth}
              lastColWidth={lastColWidth}
              numberOfCols={numberOfDataCols + 2}
              selectionMode={selectionMode}
              totalWidth={totalWidth}
              lasColumnRisizeable={lasColumnRisizeable}
              theTheme={theTheme}
              headerHeight={headerHeight}
            />
          </div>
        </div>
      </Wrapper>
      {/* {JSON.stringify(selectedAreas)} */}
    </div>
  );
};

export default Table;
