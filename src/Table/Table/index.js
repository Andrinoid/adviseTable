//jsx component
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { useSyncScroller } from "../utils/useSyncScroller";
import Header from "../Header";
import Footer from "../Footer";
import SelectedArea, { getContainedArea } from "./SelectedAreas";
import Scroller from "./Scroller";
import themes from "./themes";
import Selection from "./Selection";
import useCopier from "./Copier";
import { useLayoutEffect } from "react";
import { getValidChildren } from "../Row";

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

const LeftBrickSpace = styled.div`
  position: absolute;
  left: 0;
  width: ${({ width }) => width}px;
  top: 0;
  height: calc(100% - 30px);
  background-color: #f7f7f7;
  z-index: 2;
`;

const LeftEdge = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ offsetLeft }) => offsetLeft}px;
  z-index: 2;
  height: calc(100% - 30px);
  width: 30px;
  transition: box-shadow 0.3s;
  pointer-events: none;
  ${({ scrollStatus }) => {
    if (scrollStatus === "middle" || scrollStatus === "end") {
      return `
        box-shadow: inset 10px 0 8px -8px rgb(5 5 5 / 6%);
      `;
    }
  }}
`;

const Edge = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  height: calc(100% - 30px);
  width: 30px;
  transition: box-shadow 0.3s;
  pointer-events: none;
  ${({ isViewPortOverflow, scrollStatus }) => {
    if (isViewPortOverflow && scrollStatus !== "end") {
      return `
        box-shadow: inset -10px 0 8px -8px rgb(5 5 5 / 6%);
      `;
    }
  }}
`;

const Table = (
  {
    onSelection = () => {},
    headerStickyTopOffset = 0,
    selectionMode = "cell",
    leftBrickWidth = 30,
    theme = "light",
    headerData,
    showGrid, // Boolean
    children,
    tableId, // make required
    footer, //Boolean
    hasTotalColumn = true,
    numberFormat = {
      showIn: "none",
      decimalPoints: 2,
      display: "",
    },
  },
  ref
) => {
  const lasColumnRisizeable = false; //just put this in props if want to make the totals resizeable. There is a issue on the resize though.
  useEffect(() => {
    setTheTheme(themes[theme]);
  }, [theme]);

  // ======= refs =======
  const viewportRef = useRef(null);

  // const headerScrollRef = useRef(null);
  // const viewportScrollRef = useRef(null);
  // const tableLayerScrollRef = useRef(null);
  const headerScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const viewportScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const tableLayerScrollRef = useSyncScroller("hScrollingContainer-" + tableId);
  const tableContainerRef = useRef(null);

  // ======= states =======
  const [theTheme, setTheTheme] = useState(themes[theme]);
  const [numberOfDataCols, setNumberOfDataCols] = useState(0);
  const [totalCols, setTotalCols] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(35);
  const [childrenRows, setChildrenRows] = useState([]);
  // viewport states
  const [viewportWidth, setViewportWidth] = useState(0);
  const [scrollStatus, setScrollStatus] = useState("");
  const [isViewPortOverflow, setIsViewPortOverflow] = useState(false);
  // mesurements states
  const [firstColWidth, setfirstColWidth] = useState(150);
  const [tableTopOffset, setTableTopOffset] = useState(0);
  const [totalWidth, setTotalWidth] = useState(1350);
  const [lastColWidth, setLastColWidth] = useState(100);
  const [colHeight, setColHeight] = useState(40);
  const [colWidth, setColWidth] = useState(0);
  const [biggestLabelCellWidth, setBiggestLabelCellWidth] = useState(0);
  const [biggestDataCellWidth, setBiggestDataCellWidth] = useState(0);
  const [biggestTotalCellWidth, setBiggestTotalCellWidth] = useState(0);
  // selection states
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectColDraging, setSelectColDraging] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedSum, setSelectedSum] = useState(0);
  const [selectedMin, setSelectedMin] = useState(0);
  const [selectedMax, setSelectedMax] = useState(0);
  const [selectedAvg, setSelectedAvg] = useState(0);
  // The table matrix is supposed to be set in the col component, where each component inject it self into the matrix, This is not working. We need a better way to do this
  const [tableMatrix, setTableMatrix] = useState([]);
  // Counter to keep track of how many rows are rendered in the table
  const [instanceCount, setInstanceCount] = useState(0);
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    console.log("isViewPortOverflow", isViewPortOverflow);
  }, [isViewPortOverflow]);

  useEffect(() => {
    console.log("scrollstatus", scrollStatus);
  }, [scrollStatus]);

  useCopier(tableMatrix, selectedAreas);

  /**
   * expose method to parent component
   * For this to work, the parent component must pass a ref to this component
   * autoAdjust() will adjust the width of the table data cols to fit the data
   * usage in app: tableRef.current.autoAdjust()
   */
  useImperativeHandle(ref, () => ({
    cleartSelection() {
      cleartSelectionTable();
    },
    autoAdjust() {
      autoAdjustTable();
    },
  }));

  /**
   * When the selection mode changes, clear the selected areas
   */
  useEffect(() => {
    cleartSelectionTable();
  }, [selectionMode]);

  /**
   *
   * Computes the minimun size allowed to the table without overflowing the numbers
   */
  const getAdjustedSize = useCallback(() => {
    const minSize =
      (firstColWidth ? firstColWidth : biggestLabelCellWidth) +
      leftBrickWidth +
      biggestTotalCellWidth +
      biggestDataCellWidth * numberOfDataCols;
    const tableContainerSize = tableContainerRef?.current?.offsetWidth;
    return tableContainerSize > minSize ? tableContainerSize : minSize;
  }, [
    biggestLabelCellWidth,
    biggestTotalCellWidth,
    biggestDataCellWidth,
    firstColWidth,
    leftBrickWidth,
    numberOfDataCols,
    hasTotalColumn,
  ]);

  const cleartSelectionTable = () => {
    setSelectedAreas([]);
  };

  const autoAdjustTable = () => {
    const adjustedSize = getAdjustedSize();
    if (adjustedSize !== totalWidth) setTotalWidth(getAdjustedSize());

    if (!firstColWidth) autoAdjustFirstColWidth();
    autoAdjustLastColWidth();
    autoAdjustDataColWidth();

    setTableTopOffset(tableContainerRef.current.offsetTop);
    measureViewport();
    setTimeout(() => {
      setInitialLoaded(true);
    }, 1);
  };

  /**
   * When we need to clean selection
   * */
  useEffect(() => {
    cleartSelectionTable();
  }, [tableMatrix]);

  /**
   * when the width of the table changes, recalculate the width of the data cols
   */
  useLayoutEffect(() => {
    console.log("Adjust table?");
    autoAdjustTable();
  }, [
    totalCols,
    firstColWidth,
    totalWidth,
    biggestLabelCellWidth,
    biggestDataCellWidth,
    numberOfDataCols,
    biggestTotalCellWidth,
    leftBrickWidth,
    hasTotalColumn,
  ]);

  useEffect(() => {
    const callback = () => {
      setTotalWidth(getAdjustedSize());
    };
    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);

  /**
   * Messure the viewport width and height.
   * the width may vary based on the css applied to parent elements or the browser window width
   */
  const measureViewport = useCallback(() => {
    const element = viewportRef.current;
    if (!element) return;

    if (viewportRef?.current?.offsetWidth) {
      setViewportWidth(viewportRef.current.offsetWidth);
      if (viewportRef.current.offsetWidth < totalWidth) {
        setIsViewPortOverflow(true);
      }
    }

    const handleScroll = debounce(() => {
      if (element.scrollLeft === 0) {
        setScrollStatus("start");
      } else if (
        Math.ceil(element.scrollLeft) + element.offsetWidth >=
        element.scrollWidth
      ) {
        setScrollStatus("end");
      } else {
        setScrollStatus("middle");
      }
    }, 100);

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [viewportRef, totalWidth]);

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
    if (hasTotalColumn) {
      setLastColWidth(biggestTotalCellWidth);
    } else {
      setBiggestTotalCellWidth(0);
      setLastColWidth(0);
    }
  }, [biggestTotalCellWidth, hasTotalColumn]);

  /**
   * This function auto adjusts the width of the data cols to fit the biggest data cell
   */
  const autoAdjustDataColWidth = () => {
    const extraColSpace = getExtraColSpace();
    console.log("extraColSpace", extraColSpace);
    if (extraColSpace > 0) {
      if (!numberOfDataCols) {
        setColWidth(0);
      } else {
        setColWidth(biggestDataCellWidth + extraColSpace / numberOfDataCols);
      }
    } else {
      setColWidth(biggestDataCellWidth);
    }
  };

  const getExtraColSpace = useCallback(() => {
    return (
      totalWidth -
      (firstColWidth ? firstColWidth : biggestLabelCellWidth) -
      biggestDataCellWidth * numberOfDataCols -
      biggestTotalCellWidth -
      leftBrickWidth
    );
  }, [
    totalCols,
    totalWidth,
    firstColWidth,
    biggestLabelCellWidth,
    biggestDataCellWidth,
    numberOfDataCols,
    biggestTotalCellWidth,
    leftBrickWidth,
    hasTotalColumn,
  ]);

  /**
   * callback function for the label col resizer
   */
  const onFirstColResize = useCallback((width) => {
    const extraColSpace = getExtraColSpace();
    if (extraColSpace - (width - firstColWidth) > 0) {
      setfirstColWidth(width);
      setTotalWidth(getAdjustedSize());
    } else {
      setfirstColWidth(width);
      setTotalWidth(getAdjustedSize());
    }
  });

  /**
   * callback function for the total col resizer
   */
  const onLastColResize = useCallback((width) => {
    setLastColWidth(width);
  }, []);

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
            let value =
              tableMatrix[rowIndex][colIndex].current.getAttribute(
                "data-value"
              );

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
          setTotalCols,
          setNumberOfDataCols,
          cleartSelectionTable,
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
          hasTotalColumn,
          biggestDataCellWidth,
          biggestLabelCellWidth,
          biggestTotalCellWidth,
          tableId,
          theTheme,
          showGrid,
          totalCols,
          lasColumnRisizeable,
        },
      })
    );
  }, [
    totalCols,
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
      <Wrapper
        id={tableId}
        version="1.07"
        scrollStatus={scrollStatus}
        style={{ opacity: !initialLoaded ? 0 : 1 }}
      >
        {/* {"AAAAAAAAAAAAA" + JSON.stringify(totalCols)}
        {"AAAAAAAAAAAAA" + JSON.stringify(numberOfDataCols)} */}
        {headerData ? (
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
            totalCols={totalCols}
            theTheme={theTheme}
            data={headerData}
            hasTotalColumn={hasTotalColumn}
            stickyTopOffset={headerStickyTopOffset}
            showGrid={showGrid}
            autoAdjustFirstColWidth={autoAdjustFirstColWidth}
            autoAdjustLastColWidth={autoAdjustLastColWidth}
            lasColumnRisizeable={lasColumnRisizeable}
          />
        ) : null}

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
            <LeftBrickSpace
              scrollStatus={scrollStatus}
              className="leftBrickSpace"
              width={leftBrickWidth}
            />
          </div>

          <SelectedArea
            numberOfCols={totalCols}
            selectionMode={selectionMode}
            tableId={tableId}
            setSelectColDraging={setSelectColDraging}
            setSelectedCount={setSelectedCount}
            setSelectedAreas={setSelectedAreas}
            tableMatrix={tableMatrix}
          />

          <Scroller active={selectColDraging} tableId={tableId} />
          <LeftEdge scrollStatus={scrollStatus} offsetLeft={leftBrickWidth} />
          <Edge
            isViewPortOverflow={isViewPortOverflow}
            scrollStatus={scrollStatus}
          />
        </ViewPort>
        <div className="table-end"></div>
        <Footer
          numberFormat={numberFormat}
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
              // selectionString={JSON.stringify(selectedAreas)}
              selectedAreas={selectedAreas}
              colWidth={colWidth}
              colHeight={colHeight}
              leftOffset={leftBrickWidth}
              firstColWidth={firstColWidth}
              lastColWidth={lastColWidth}
              numberOfCols={totalCols}
              selectionMode={selectionMode}
              totalWidth={totalWidth}
              lasColumnRisizeable={lasColumnRisizeable}
              theTheme={theTheme}
              headerHeight={headerHeight}
              tableMatrix={tableMatrix}
              tableTopOffset={tableTopOffset}
            />
          </div>
        </div>
      </Wrapper>
      {/* {JSON.stringify(selectedAreas)} */}
    </div>
  );
};

export default React.forwardRef(Table);
