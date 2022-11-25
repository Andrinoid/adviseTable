//jsx component
import React, { useState, useRef, useLayoutEffect, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components';

import { useSyncScroller } from "./useSyncScroller";

import Header from './Header';
import { TableContext } from './context';
import SelectedCol from './SelectedCol';

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

const themes = {
    default: {
        name: 'default',
        table: {
            background: '#fff',
            border: '1px solid #ebebeb',
        },
        header: {
            background: '#fafafa',
            borderBottom: 'solid 1px #ededed',
        },
        row: {
            
        },
        col: {
            // background: 'white',s

        },
        cell: {
            border: '1px solid #ebebeb',
        },
    },
    dark: {
        name: 'dark',
        table: {
            background: '#000',
            border: '1px solid #ebebeb',
        },
        header: {
            background: '#000',
            border: '1px solid #ebebeb',
        },
        row: {
            
        },
        col: {
            background: '#202124',
            color: '#bdc6cf',
            boxShadow: 'inset 0px 0px 0 0.5px #4a4c50',  
            

        },
        cell: {
            border: '1px solid #ebebeb',
        },
    }
}

const Table = ({ mode, headerData, theme="default", children }, ref) => {
    
    const viewportRef = useRef(null);
    const [theTheme, setTheTheme] = useState(themes[theme]);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [labelColWidth, setlabelColWidth] = useState(150);
    const [numberOfDataCols, setNumberOfDataCols] = useState(headerData.length-2);
    const [headerHeight, setHeaderHeight] = useState(35);
    const [colHeight, setColHeight] = useState(40);
    // const [totalHeight, setTotalHeight] = useState(view.length * colHeight + headerHeight);
    const [totalWidth, setTotalWidth] = useState(950);
    const [toolBoxWidth, setToolBoxWidth] = useState(50);
    const [totalColWidth, setTotalColWidth] = useState(100);
    const [colWidth, setColWidth] = useState((totalWidth - labelColWidth - toolBoxWidth - totalColWidth) / numberOfDataCols);

    const [mouseDownColCord, setMouseDownColCord] = useState(null);
    const [mouseMoveColCord, setMouseMoveColCord] = useState(null);
    const [mouseUpColCord, setMouseUpColCord] = useState(null);

    const [selectColDraging, setSelectColDraging] = useState(false);
    const [selectedCol, setSelectedCol] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);

    const [biggestLabelCellWidth, setBiggestLabelCellWidth] = useState(0);
    const [biggestDataCellWidth, setBiggestDataCellWidth] = useState(0);
    const [biggestTotalCellWidth, setBiggestTotalCellWidth] = useState(0);


    // create unique id for each table
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
            setSelectedArea,
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
            selectedArea,
            theTheme,
        }}> 
            <Wrapper ref={ref}>

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