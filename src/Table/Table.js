//jsx component
import React, { useState, useRef, useLayoutEffect, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components';

import { useSyncScroller } from "./useSyncScroller";

import Header from './Header';
import Footer from './Footer';
import { TableContext } from './context';
import SelectedCol from './SelectedCol';
import Scroller from './Scroller';
import themes from './themes';

const Wrapper = styled.div`
width: 100%;
padding: 20px;
box-sizing: border-box;

.viewPort {
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    position: relative;
    min-width: 0;
    flex-direction: row;
    display: flex;
    flex: 1 1 auto;
}
.container {
    position: relative;
}
`;


const Table = ({ headerData, theme = "default", children, onSelection = () => { } }, ref) => {
    //TODO
    // if multiple instances of this table are rendered on the same page, event listeners will be added multiple times
    // fix table resizer

    const viewportRef = useRef(null);
    const [theTheme, setTheTheme] = useState(themes[theme]);

    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [labelColWidth, setlabelColWidth] = useState(150);
    const [numberOfDataCols, setNumberOfDataCols] = useState(headerData.length - 2);
    const [headerHeight, setHeaderHeight] = useState(35);
    const [colHeight, setColHeight] = useState(40);
    // const [totalHeight, setTotalHeight] = useState(view.length * colHeight + headerHeight);
    const [totalWidth, setTotalWidth] = useState(1350);
    const [toolBoxWidth, setToolBoxWidth] = useState(50);
    const [totalColWidth, setTotalColWidth] = useState(100);
    const [colWidth, setColWidth] = useState((totalWidth - labelColWidth - toolBoxWidth - totalColWidth) / numberOfDataCols);

    const [mouseDownColCord, setMouseDownColCord] = useState(null);
    const [mouseMoveColCord, setMouseMoveColCord] = useState(null);
    const [mouseUpColCord, setMouseUpColCord] = useState(null);

    const [selectColDraging, setSelectColDraging] = useState(false);
    const [selectedCol, setSelectedCol] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);

    const [tableMatrix, setTableMatrix] = useState([]);

    const [biggestLabelCellWidth, setBiggestLabelCellWidth] = useState(0);
    const [biggestDataCellWidth, setBiggestDataCellWidth] = useState(0);
    const [biggestTotalCellWidth, setBiggestTotalCellWidth] = useState(0);

    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedSum, setSelectedSum] = useState(0);
    const [selectedMin, setSelectedMin] = useState(0);
    const [selectedMax, setSelectedMax] = useState(0);
    const [selectedAvg, setSelectedAvg] = useState(0);

    // create unique id for each table. Used for seperating events
    const tableId = Math.random().toString(36).substr(2, 9);
    const headerScrollRef = useSyncScroller('hScrollingContainer-' + tableId);
    const viewportScrollRef = useSyncScroller('hScrollingContainer-' + tableId);


    useImperativeHandle(ref, () => ({
        autoAdjust() {
            autoAdjustDataColWidth();
        }
    }));

    useEffect(() => {
        setColWidth(calcColWidth);
    }, [labelColWidth, totalColWidth, totalWidth]);

    useLayoutEffect(() => {
        setViewportWidth(viewportRef.current.offsetWidth);
        setViewportHeight(viewportRef.current.offsetHeight);
    }, []);

    useEffect(() => {
        getSelectedArea(mouseDownColCord, mouseMoveColCord);
    }, [mouseDownColCord, mouseMoveColCord]);

    const autoAdjustLabelColWidth = () => {
        setlabelColWidth(biggestLabelCellWidth);
    }

    const autoAdjustTotalColWidth = () => {
        setTotalColWidth(biggestTotalCellWidth);
    }

    const autoAdjustDataColWidth = () => {
        setTotalWidth(labelColWidth + toolBoxWidth + totalColWidth + (biggestDataCellWidth * numberOfDataCols));
    }

    const onLabelColResize = (width) => {
        setlabelColWidth(width);
    }

    const onTotalColResize = (width) => {
        setTotalColWidth(width);
    }

    const onTableResize = (width) => {
        setTotalWidth(width);
    }

    const calcColWidth = () => {
        return (totalWidth - labelColWidth - toolBoxWidth - totalColWidth) / numberOfDataCols;
    }

    const getSelectedArea = (startCord, endCord) => {

        if (!startCord || !endCord) return null;
        const startY = startCord[1];
        const endY = endCord[1];
        const startX = startCord[0];
        const endX = endCord[0];

        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);

        const selectedArea = [];
        let count = 0;
        let sum = 0;
        let min = 0;
        let max = 0;
        let avg = 0;
        //pick the selected area from the table matrix
        for (let i = minY; i <= maxY; i++) {
            for (let j = minX; j <= maxX; j++) {

                selectedArea.push(tableMatrix[i][j]);
                try {
                    let value = tableMatrix[i][j].current.innerText;
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
                    console.error(error);
                }

                count++
            }
        }
        if (count > 0) {
            setSelectedCount(count);
            setSelectedSum(sum);
            setSelectedMin(min);
            setSelectedMax(max);
            setSelectedAvg(avg);
        }

        return selectedArea;

    }

    return (
        <TableContext.Provider value={{
            setSelectColDraging,
            setMouseDownColCord,
            setMouseMoveColCord,
            setMouseUpColCord,
            setTotalWidth,
            setlabelColWidth,
            setTotalColWidth,
            setBiggestDataCellWidth,
            setBiggestLabelCellWidth,
            setBiggestTotalCellWidth,
            autoAdjustLabelColWidth,
            autoAdjustTotalColWidth,
            setSelectedCol,
            setSelectedArea,
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
            selectedArea,
            theTheme,
        }}>
            <Wrapper ref={ref} className={'table-viewport'}>

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
                />

                <div className='viewPort scrollable' ref={(el) => { viewportRef.current = el; viewportScrollRef.current = el; }}>
                    <div
                        className='container'
                        style={{ width: totalWidth }}>
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
                            }
                        })}
                    </div>

                    <SelectedCol onSelection={onSelection} />
                    <Scroller active={selectColDraging} />
                </div>
                <div className='table-end'></div> 
                <Footer maxWidth={totalWidth} count={selectedCount} sum={selectedSum} min={selectedMin} max={selectedMax} avg={selectedAvg} />

            </Wrapper>
        </TableContext.Provider>
    )
}

export default React.forwardRef(Table);
