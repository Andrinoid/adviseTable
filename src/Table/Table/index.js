//jsx component
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import styled from "styled-components";
import { useSyncScroller } from "../utils/useSyncScroller";
import Header from "../Header";
import Footer from "../Footer";
import SelectedArea, { getContainedArea } from "./SelectedAreas";
import Scroller from "./Scroller";
import themes from "./themes";
import Selection from "./Selection";

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
    onSelection = () => { },
    headerStickyTopOffset = 0,
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
  // const [viewportHeight, setViewportHeight] = useState(0);
  const [labelColWidth, setlabelColWidth] = useState(150);
  const [numberOfDataCols, setNumberOfDataCols] = useState(
    headerData.length - 2
  );
  const [headerHeight, setHeaderHeight] = useState(35);
  const [colHeight, setColHeight] = useState(40);
  const [totalWidth, setTotalWidth] = useState(1350);
  const [toolBoxWidth, setToolBoxWidth] = useState(leftBrickWidth);
  const [totalColWidth, setTotalColWidth] = useState(100);
  const [colWidth, setColWidth] = useState(
    (totalWidth - labelColWidth - toolBoxWidth - totalColWidth) /
    numberOfDataCols
  );
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectColDraging, setSelectColDraging] = useState(false);

  // const [mouseDownColCord, setMouseDownColCord] = useState(null);
  // const [mouseMoveColCord, setMouseMoveColCord] = useState(null);
  // const [mouseUpColCord, setMouseUpColCord] = useState(null);
  // const [selectedCol, setSelectedCol] = useState(null);

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
  // useLayoutEffect(() => {
  //   if (viewportRef?.current?.offsetWidth)
  //     setViewportWidth(viewportRef.current.offsetWidth);
  //   if (viewportRef?.current?.offsetHeight)
  //     setViewportHeight(viewportRef.current.offsetHeight);
  // }, []);

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
  const autoAdjustLabelColWidth = useCallback(() => {
    setlabelColWidth(biggestLabelCellWidth);
  }, [biggestLabelCellWidth]);

  /**
   * as above so bellow
   * This applies to last col
   */
  const autoAdjustTotalColWidth = useCallback(() => {
    setTotalColWidth(biggestTotalCellWidth);
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
  const onLabelColResize = useCallback((width) => {
    setlabelColWidth(width);
  }, []);

  /**
   * callback function for the total col resizer
   */
  const onTotalColResize = useCallback((width) => {
    setTotalColWidth(width);
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
  };

  const [childrenRows, setChildrenRows] = useState([]);
  useEffect(() => {
    setChildrenRows(
      children({
        rowProps: {
          setInstanceCount,
          setBiggestDataCellWidth,
          setBiggestLabelCellWidth,
          setBiggestTotalCellWidth,
          autoAdjustLabelColWidth,
          autoAdjustTotalColWidth,
          setTableMatrix,
          colWidth,
          colHeight,
          toolBoxWidth,
          topOffset: headerHeight,
          numberOfDataCols,
          instanceCount,
          tableMatrix,
          totalWidth,
          labelColWidth,
          totalColWidth,
          biggestDataCellWidth,
          biggestLabelCellWidth,
          biggestTotalCellWidth,
          tableId,
          theTheme,
          showGrid,
          totalCols: headerData.length
        },
      })
    );
  }, [
    totalWidth,
    labelColWidth,
    totalColWidth,
    biggestDataCellWidth,
    children,
    autoAdjustLabelColWidth,
    autoAdjustTotalColWidth,
    colWidth,
    colHeight,
    toolBoxWidth,
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
    <div ref={tableContainerRef}>
      <Wrapper id={tableId}>
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
          onLabelColResize={onLabelColResize}
          onTotalColResize={onTotalColResize}
          onTableResize={onTableResize}
          numberOfDataCols={numberOfDataCols}
          theTheme={theTheme}
          data={headerData}
          stickyTopOffset={headerStickyTopOffset}
          showGrid={showGrid}
          autoAdjustLabelColWidth={autoAdjustLabelColWidth}
          autoAdjustTotalColWidth={autoAdjustTotalColWidth}
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
            {childrenRows}
          </div>

          <SelectedArea
            tableId={tableId}
            // setMouseDownColCord={setMouseDownColCord}
            // setMouseMoveColCord={setMouseMoveColCord}
            // setMouseUpColCord={setMouseUpColCord}
            setSelectColDraging={setSelectColDraging}
            setSelectedCount={setSelectedCount}
            setSelectedAreas={setSelectedAreas}
            tableMatrix={tableMatrix}
          />
          <Selection
            selectedAreas={selectedAreas}
            colWidth={colWidth}
            colHeight={colHeight}
            leftOffset={toolBoxWidth}
            firstColWidth={labelColWidth}
            lastColWidth={totalColWidth}
            numberOfCols={numberOfDataCols + 2}
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
      </Wrapper>
    </div>
  );
};

export default Table;
