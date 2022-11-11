//jsx component
import React, { Children } from 'react';
import styled from 'styled-components';
import { find } from 'lodash';
import { default as mo } from "./data/months";
import ResizablelCol from './ResizablelCol';

const RowElm = styled.div`
    // position: absolute;
    position: relative;
    white-space: nowrap;
    width: 100%;
`;
const Col = styled.div`
    background: #fff;
    box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: left;
    position: absolute;
`;

//map though months and pick values from system

const Row = ({row, index, selectedMonths, topOffset, colWidth, colHeight, labelColWidth, toolBoxWidth, totalColWidth, totalMonths, hideTotal=false }) => {

    let months = mo.map((m) => m.system);
    // select range of months based on selectedMonths
    let monthRange = months.slice(selectedMonths[0] - 1, selectedMonths[1]);
    // calculate the top position of the row
    const topPosition = (index * 50) + topOffset;

    const getTotal = () => {  
        let mappings = row.totals_mappings || [];
        let mapping = mappings.find((mapping) => {
            return mapping.begin == selectedMonths[0] && mapping.end == selectedMonths[1];
        });

        if (mapping) {
            if (!hideTotal) {
                return mapping.total;
            } 
            // else {
            //     return row[selectedMonths[selectedMonths.length - 1].system];
            // }
        } else {
            return null;
        }
    }

    const leftOffset = toolBoxWidth + labelColWidth;

    return (
        //Þurfum við hæðina hér?
        <RowElm style={{  height: colHeight }} >
            <Col style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}></Col>
            <Col style={{ width: labelColWidth, height: colHeight, top: 0, left: toolBoxWidth }}>{row.name}</Col>
            {/* map through the months and return cols */}
            {monthRange.map((month, index) => {
                const left = leftOffset + index * colWidth;
                return (
                    <Col key={index} style={{ width: colWidth, height: colHeight, top: 0, left: left }}>{row[month]}</Col>        
                )
            })}
            {/* <ResizablelCol 
                viewportHeight={viewportHeight}
                onResize={onTotalColResize}
                style={{ width: totalColWidth, height: colHeight, top: 0, left: leftOffset + (totalMonths * colWidth) }}
            >
                {getTotal()}
            </ResizablelCol> */}
            <Col style={{ width: totalColWidth, height: colHeight, top: 0, left: leftOffset + (totalMonths * colWidth) }}>{getTotal()}</Col>
        </RowElm>
    )
}

export default Row;