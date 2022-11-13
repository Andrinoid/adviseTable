//jsx component
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from './Header';
import Row from './Row';
import { TableContext } from './context';
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
    background: lightblue;
    border: 2px solid lightblue;
}
`;

const ToolBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${props => props.width}px;
    background: green;
`;


//TODO
// hide total option
// dragability on table

const Table = ({ mode }) => {

    const viewportRef = useRef(null);

    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [labelColWidth, setlabelColWidth] = useState(150);
    const [selectedMonths, setSelectedMonths] = useState(ui_prefs.months);
    const [totalMonths, setTotalMonths] = useState(selectedMonths[1] - selectedMonths[0] + 1);
    const [headerHeight, setHeaderHeight] = useState(35);
    const [colHeight, setColHeight] = useState(50);
    const [totalHeight, setTotalHeight] = useState(view.length * colHeight + headerHeight);
    const [totalWidth, setTotalWidth] = useState(1350);
    const [toolBoxWidth, setToolBoxWidth] = useState(50);
    const [totalColWidth, setTotalColWidth] = useState(100);
    const [colWidth, setColWidth] = useState((totalWidth - labelColWidth - toolBoxWidth - totalColWidth) / totalMonths);

    const [mouseDownColCord, setMouseDownColCord] = useState(null);
    const [mouseMoveColCord, setMouseMoveColCord] = useState(null);
    const [mouseUpColCord, setMouseUpColCord] = useState(null);
    const [selectColDraging, setSelectColDraging] = useState(false);

    useEffect(()=> {
        console.log('selectColDraging', selectColDraging);
    }, [selectColDraging])

    useEffect(() => {
        setColWidth(calcColWidth);
    }, [labelColWidth, totalColWidth, totalWidth]);

    useLayoutEffect(() => {
        setViewportWidth(viewportRef.current.offsetWidth);
        setViewportHeight(viewportRef.current.offsetHeight);
    }, []);

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
            selectColDraging,
            mouseDownColCord,
            mouseMoveColCord,
            mouseUpColCord,
        }}>
        <Wrapper>
            <div className='viewPort' ref={viewportRef}>
                <div className='container' style={{ width: totalWidth }}>

                    <Header
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
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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

            </div>
            <div>
                <p>mouseDownCol:{mouseDownColCord}</p>
                <p>mouseMoveCol:{mouseMoveColCord}</p>
                <p>mouseUpCol:{mouseUpColCord}</p>
            </div>
            <p>Todo</p>
            <ul>
                <li>selectable cols</li>
                <li>Detect overflow on Cols and auto adjust table width</li>
                <li>Control styles</li>
                <li>expandable cols</li>
                <li>Hightlight types of rows</li>
                <li>Hide total option</li>
                <li>Drag handle</li>
                <li>Min and max size on cols</li>
            </ul>
        </Wrapper>
        </TableContext.Provider>
    )
}

export default Table;