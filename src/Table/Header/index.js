//react component  
import React from 'react';
import styled from 'styled-components';
import ResizablelCol from '../Col/ResizablelCol';
import ResizableTable from './ResizableTable';
import Brick from '../Col/Brick';

const RowElm = styled.div`
    position: sticky;
    top: ${({ stickyTopOffset }) => stickyTopOffset}px;
    z-index: 101;
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
    numberOfDataCols,
    stickyTopOffset = 0,
    theTheme,
    data,
}, ref) => {

    const leftOffset = toolBoxWidth + labelColWidth;

    return (
        <RowElm  ref={ref} stickyTopOffset={stickyTopOffset}>
            <div style={{...theTheme.header, height: colHeight, width: totalWidth, boxSizing: 'border-box'}}>
            <Brick
                style={{ width: toolBoxWidth, height: colHeight, top: 0, left: 0 }}
            ></Brick>

            {data.map((item, index) => {
                // we need index to be zero after the first col wich has it's own width
                let i = index - 1;
                const left = leftOffset + (i * colWidth);
                return (
                    // we need to use the verbose syntax here because we need to set the key
                    <React.Fragment key={index}>
                        {index === 0 &&
                            <ResizablelCol
                                onResize={onLabelColResize}
                                viewportHeight={viewportHeight}
                                type="first"
                                horizontalAlign="left"
                                selectable={false}
                                style={{width: labelColWidth, height: colHeight, top: 0, left: toolBoxWidth }}
                            >
                                <Label>{item.title}</Label>
                            </ResizablelCol>
                        }
                        {index > 0 && index < data.length - 1 &&
                            <Brick
                                selectable={false}
                                type="middle"
                                style={{width: colWidth, height: colHeight, top: 0, left: left }}
                            ><Label>{item.title}</Label></Brick>
                        }
                        {index === data.length - 1 &&
                            <ResizablelCol
                                onResize={onTotalColResize}
                                direction="left"
                                viewportHeight={viewportHeight}
                                type="last"
                                selectable={false}
                                style={{width: totalColWidth, height: colHeight, top: 0, left: leftOffset + (numberOfDataCols * colWidth) }}
                            >
                                <>
                                <Label>{item.title}</Label>
                                <ResizableTable width={totalWidth} onResize={onTableResize} />
                                </>
                            </ResizablelCol>
                        }
                    </React.Fragment>
                )
            })}

            </div>
        </RowElm>
    )
});


export default Header;