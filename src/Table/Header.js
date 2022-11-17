//react component  
import React, { useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { default as mo } from "../data/months";
import ResizablelCol from './ResizablelCol';
import ResizableTable from './ResizableTable';
import Col from './Col';

const RowElm = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
`;

const Label = styled.div`
    padding: 5px;
    font-weight: bold;
`;

const Header = React.forwardRef(({
    colWidth, toolBoxWidth, labelColWidth, totalColWidth, colHeight, selectedMonths, totalMonths, totalWidth, viewportHeight, onLabelColResize, onTotalColResize, onTableResize
}, ref) => {


    
    //map trhough months and pick values from system
    let months = mo.map((m) => m.system);
    // select range of months based on selectedMonths
    let monthRange = months.slice(selectedMonths[0] - 1, selectedMonths[1]);

    const leftOffset = toolBoxWidth + labelColWidth;

    
    return (
        <RowElm style={{ height: colHeight }} ref={ref}>
            <Col 
                style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }} 
                selectable={false}
            ></Col>
            <ResizablelCol 
                style={{ width: labelColWidth, height: colHeight, top: 0, left: toolBoxWidth}}
                onResize={onLabelColResize}
                viewportHeight={viewportHeight}
                type="label"
                selectable={false}
            >
            </ResizablelCol>

            {/* map through the months and return cols */}
            {monthRange.map((month, index) => {
                const left = leftOffset + index * colWidth;
                return (
                    <Col 
                        key={index} 
                        selectable={false}
                        style={{ width: colWidth, height: colHeight, top: 0, left: left }}
                    ><Label>{month}</Label></Col>
                )
            })}

            {/* <Col style={{ width: totalColWidth, height: colHeight, top: 0, left: leftOffset + (totalMonths * colWidth) }}>Total</Col> */}
            <ResizablelCol
                style={{ width: totalColWidth, height: colHeight, top: 0, left: leftOffset + (totalMonths * colWidth) }}
                onResize={onTotalColResize}
                direction="left"
                viewportHeight={viewportHeight}
                type="total"
                selectable={false}
            >
                <Label>Total</Label>
            </ResizablelCol>

            <ResizableTable width={totalWidth} onResize={onTableResize}/>

        </RowElm>
    )
});


export default Header;