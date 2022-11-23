//react component  
import React from 'react';
import styled from 'styled-components';
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
    colWidth,
    toolBoxWidth,
    labelColWidth,
    totalColWidth,
    colHeight,
    totalWidth,
    viewportHeight,
    onLabelColResize,
    onTotalColResize,
    onTableResize,
    data,
}, ref) => {

    const leftOffset = toolBoxWidth + labelColWidth;
    const numberOfDataCols = data.length - 2;
    return (
        <RowElm style={{ height: colHeight }} ref={ref}>
            <Col
                style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}
                selectable={false}
            ></Col>

            {data.map((item, index) => {
                // we need index to be zero after label col
                let i = index - 1;
                const left = leftOffset + (i * colWidth);
                return (
                    <React.Fragment key={index}>
                        {index === 0 &&
                            <ResizablelCol
                                style={{ width: labelColWidth, height: colHeight, top: 0, left: toolBoxWidth }}
                                onResize={onLabelColResize}
                                viewportHeight={viewportHeight}
                                type="label"
                                selectable={false}
                            >
                            </ResizablelCol>
                        }
                        {index > 0 && index < data.length - 1 &&
                            <Col
                                selectable={false}
                                style={{ width: colWidth, height: colHeight, top: 0, left: left }}
                            ><Label>{item.title}</Label></Col>
                        }
                        {index === data.length - 1 &&
                            <ResizablelCol
                                style={{ width: totalColWidth, height: colHeight, top: 0, left: leftOffset + (numberOfDataCols * colWidth) }}
                                onResize={onTotalColResize}
                                direction="left"
                                viewportHeight={viewportHeight}
                                type="total"
                                selectable={false}
                            >
                                <Label>Total</Label>
                            </ResizablelCol>
                        }
                    </React.Fragment>
                )
            })}

            <ResizableTable width={totalWidth} onResize={onTableResize} />

        </RowElm>
    )
});


export default Header;