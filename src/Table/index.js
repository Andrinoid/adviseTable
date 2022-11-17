//jsx component
import React, { useState, useRef, useLayoutEffect, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSyncScroller } from "./useSyncScroller";

import Header from './Header';
import Row from './Row';
import { TableContext } from './context';
import SelectedCol from './SelectedCol';
//DUMMY DATA
import { view, ui_prefs } from '../data/example2';

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

const Table = ({ mode }, ref) => {

    const viewportRef = useRef(null);

    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [labelColWidth, setlabelColWidth] = useState(150);
    const [selectedMonths, setSelectedMonths] = useState(ui_prefs.months);
    const [totalMonths, setTotalMonths] = useState(selectedMonths[1] - selectedMonths[0] + 1);
    const [headerHeight, setHeaderHeight] = useState(35);
    const [colHeight, setColHeight] = useState(50);
    const [totalHeight, setTotalHeight] = useState(view.length * colHeight + headerHeight);
    const [totalWidth, setTotalWidth] = useState(950);
    const [toolBoxWidth, setToolBoxWidth] = useState(50);
    const [totalColWidth, setTotalColWidth] = useState(100);
    const [colWidth, setColWidth] = useState((totalWidth - labelColWidth - toolBoxWidth - totalColWidth) / totalMonths);

    const [mouseDownColCord, setMouseDownColCord] = useState(null);
    const [mouseMoveColCord, setMouseMoveColCord] = useState(null);
    const [mouseUpColCord, setMouseUpColCord] = useState(null);
    const [selectColDraging, setSelectColDraging] = useState(false);

    const [biggestLabelCellWidth , setBiggestLabelCellWidth] = useState(0);
    const [biggestDataCellWidth, setBiggestDataCellWidth] = useState(0);
    const [biggestTotalCellWidth, setBiggestTotalCellWidth] = useState(0);

    const [selectedCol, setSelectedCol] = useState(null);

    const headerScrollRef = useSyncScroller('hScrollingContainer');
    const viewportScrollRef = useSyncScroller('hScrollingContainer');

    useEffect(() => {
        console.log('biggestDataCellWidth', biggestDataCellWidth);
    }, [biggestDataCellWidth]);

    useImperativeHandle(ref, () => ({

        autoAdjust() {
            autoAdjustDataColWidth();
        }

      }));

    // useEffect(()=> {
    //     console.log('selectColDraging', selectColDraging);
    // }, [selectColDraging])

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
        setTotalWidth(labelColWidth + toolBoxWidth + totalColWidth + (biggestDataCellWidth * totalMonths));
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
        return (totalWidth - labelColWidth - toolBoxWidth - totalColWidth) / totalMonths;
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        // const items = Array.from(viewd);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);
        // updateview(items);
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
                        selectedMonths={selectedMonths}
                        totalMonths={totalMonths}
                        totalWidth={totalWidth}
                        viewportHeight={viewportHeight}
                        onLabelColResize={onLabelColResize}
                        onTotalColResize={onTotalColResize}
                        onTableResize={onTableResize}
                    />
            <div className='viewPort scrollable' ref={(el)=> {viewportRef.current=el; viewportScrollRef.current=el;}}>
                     
                    <div 
                        className='container' 
                        style={{ width: totalWidth }}>

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters" >
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        view.map((row, i) => {
                                            return (
                                                <Draggable
                                                    key={'id-' + row.id}
                                                    draggableId={'id-' + row.id}
                                                    index={i}
                                                    isDragDisabled={mode === 'static'}
                                                >
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps}>
                                                            <Row
                                                                key={i}
                                                                index={i}
                                                                row={row}
                                                                colWidth={colWidth}
                                                                colHeight={colHeight}
                                                                labelColWidth={labelColWidth}
                                                                toolBoxWidth={toolBoxWidth}
                                                                totalColWidth={totalColWidth}
                                                                topOffset={headerHeight}
                                                                selectedMonths={selectedMonths}
                                                                totalMonths={totalMonths}
                                                                handleProps={{...provided.dragHandleProps}}
                                                                mode={mode}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    

                </div>
                    
                    {selectedCol && <SelectedCol width={colWidth} height={colHeight} offsetLeft={toolBoxWidth} offsetTop={0} />}

            </div>
           
         
        </Wrapper>
        </TableContext.Provider>
    )
}

export default React.forwardRef(Table);