//jsx component
import React, { useState, useRef, useLayoutEffect, useEffect, useImperativeHandle, Children } from 'react';
import styled from 'styled-components';

import { useSyncScroller } from "./useSyncScroller";

import Header from './Header';
import { TableContext } from './context';
import SelectedCol from './SelectedCol';
//DUMMY DATA


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
.pinnedRightContainer {
    background: #f5f5f5;
    width: 150px;
    max-width: 150px;
    min-width: 150px;
    direction: ltr;
}
}
.sub {
    position: absolute;
    white-space: nowrap;
    width: 100%;
    overflow-y: auto;
    .col {
        background: #f5f5f5;
    }
}
.container {
    position: relative;
}
`;

const Table = ({ mode, header, children }, ref) => {

    const viewportRef = useRef(null);

    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [labelColWidth, setlabelColWidth] = useState(150);
    // const [selectedMonths, setSelectedMonths] = useState(months);
    // const [totalMonths, setTotalMonths] = useState(selectedMonths[1] - selectedMonths[0] + 1);
    const [numberOfDataCols, setNumberOfDataCols] = useState(header.length-2);
    const [headerHeight, setHeaderHeight] = useState(35);
    const [colHeight, setColHeight] = useState(50);
    // const [totalHeight, setTotalHeight] = useState(view.length * colHeight + headerHeight);
    const [totalWidth, setTotalWidth] = useState(950);
    const [toolBoxWidth, setToolBoxWidth] = useState(50);
    const [totalColWidth, setTotalColWidth] = useState(100);
    const [colWidth, setColWidth] = useState((totalWidth - labelColWidth - toolBoxWidth - totalColWidth) / numberOfDataCols);

    const [mouseDownColCord, setMouseDownColCord] = useState(null);
    const [mouseMoveColCord, setMouseMoveColCord] = useState(null);
    const [mouseUpColCord, setMouseUpColCord] = useState(null);
    const [selectColDraging, setSelectColDraging] = useState(false);

    const [biggestLabelCellWidth, setBiggestLabelCellWidth] = useState(0);
    const [biggestDataCellWidth, setBiggestDataCellWidth] = useState(0);
    const [biggestTotalCellWidth, setBiggestTotalCellWidth] = useState(0);

    const [selectedCol, setSelectedCol] = useState(null);

    const headerScrollRef = useSyncScroller('hScrollingContainer');
    const viewportScrollRef = useSyncScroller('hScrollingContainer');

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
            selectedCol,
        }}>
            <Wrapper ref={ref}>

                <Header
                    width={viewportWidth}
                    ref={headerScrollRef}
                    className="scrollable"
                    colHeight={headerHeight}
                    colWidth={colWidth}
                    labelColWidth={labelColWidth}
                    toolBoxWidth={toolBoxWidth}
                    totalColWidth={totalColWidth}
                    // selectedMonths={selectedMonths}
                    totalMonths={numberOfDataCols}
                    totalWidth={totalWidth}
                    viewportHeight={viewportHeight}
                    onLabelColResize={onLabelColResize}
                    onTotalColResize={onTotalColResize}
                    onTableResize={onTableResize}
                    data={header}
                />
                <div className='viewPort scrollable' ref={(el) => { viewportRef.current = el; viewportScrollRef.current = el; }}>

                    <div
                        className='container'
                        style={{ width: totalWidth }}>


                        {children({
                            rowProps: {
                                colWidth: colWidth,
                                colHeight: colHeight,
                                labelColWidth: labelColWidth,
                                toolBoxWidth: toolBoxWidth,
                                totalColWidth: totalColWidth,
                                topOffset: headerHeight,
                                // selectedMonths: selectedMonths,
                                totalMonths: numberOfDataCols,
                                mode: mode
                            }
                        })}

                    </div>

                    {selectedCol && <SelectedCol width={colWidth} height={colHeight} offsetLeft={toolBoxWidth} offsetTop={0} />}

                </div>


            </Wrapper>
        </TableContext.Provider>
    )
}

export default React.forwardRef(Table);