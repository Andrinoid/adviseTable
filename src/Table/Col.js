//react component  
import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { debounce, throttle} from 'lodash';
import { TableContext } from './context';
import Cell from './Cell';


const Column = styled.div`
    //background: ${props => props.selected ? '#e9f0fd' : 'white'};
    // background: white;
    // box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: ${props => props.horizontalAlign};
    position: absolute;
    user-select: none;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    box-sizing: border-box;
    &.hightlighted {
        background: #e9f0fd;
    }
    &.outline-left {
        // box-shadow: inset 2px 0px 0 1px #65b2fe;
        border-left: 1px solid #65b2fe;
    }
    &.outline-right {
        // box-shadow: inset -1px 0px 0 1px #65b2fe;
        border-right: 1px solid #65b2fe;
    }
    &.outline-top {
        // box-shadow: inset 0px 1px 0 1px #65b2fe;
        border-top: 1px solid #65b2fe;
    }
    &.outline-bottom {
        // box-shadow: inset 0px -1px 0 1px #65b2fe;
        border-bottom: 1px solid #65b2fe;
    }
   

`;

const Col = React.forwardRef(({
    horizontalAlign = 'right',
    children,
    style = {},
    selectable = true,
    type,
    id,
    x,
    y,
}, ref) => {

    const {
        setSelectColDraging,
        setMouseDownColCord, 
        setMouseMoveColCord, 
        setMouseUpColCord,
        selectColDraging,
        mouseDownColCord,
        mouseMoveColCord,
        mouseUpColCord,
        setSelectedCol,
        selectedCol,
        setSelectedArea,
        selectedArea,
        theTheme,
    } = useContext(TableContext); 

    const [selected, setSelected] = useState(false);

    
    const mouseDownHandler = (e, cord) => {
        if (!selectable) {
            setSelected(false);
            setSelectedCol(null);
            return;
        };
        setSelected(true);
        setSelectedCol({x: x, y: y, id: id, style: style});
        setSelectColDraging(true);
        setMouseDownColCord(cord);
    }
    
    const mouseMoveHandler = (e, cord) => {
        if (!selectable) return;
        // if (!selectColDraging) return;
        setMouseMoveColCord(cord);
    }

    const mouseUpHandler = (e, cord) => {
        if (!selectable) return;
        setSelectColDraging(false);
        setMouseUpColCord(cord);
    }

    const clickHandler = (cord) => {
        
    }

    const debounceMouseUpHandler = debounce(mouseMoveHandler, 70);

    const createOutlineClasses = (minX, maxX, minY, maxY) => {
        let classes = [];
        if (y === minY) classes.push('outline-left');
        if (y === maxY) classes.push('outline-right');
        if (x === minX) classes.push('outline-top');
        if (x === maxX) classes.push('outline-bottom');
        classes.push('hightlighted');
        return classes.join(' ');
    }

    /**
	 * Calculate the selected area
	 * Note that we can not draw the selected area here, because we are in a single column component
     * Selected rectange needs to be on a higher level component
	 */
    const isHightlighted = () => {

        if (!selectable) return false;
        if (!selectColDraging) return false; 
     
        let isX = false;
        let isY = false;
        let minX;
        let maxX;
        let minY;
        let maxY;

        if(mouseDownColCord) {
            // Find the min and max of the mouseDownColCord and mouseMoveColCord
            minX = Math.min(mouseDownColCord[0], mouseMoveColCord[0]);
            maxX = Math.max(mouseDownColCord[0], mouseMoveColCord[0]);
            minY = Math.min(mouseDownColCord[1], mouseMoveColCord[1]);
            maxY = Math.max(mouseDownColCord[1], mouseMoveColCord[1]);


            // Check if the current column is in the selected area
            if(x >= minX && x <= maxX) {
                isX = true;
            }
            if(y >= minY && y <= maxY) {  
                isY = true;
            }
        }
        if(isX && isY) { 
            return createOutlineClasses(minX, maxX, minY, maxY, x, y);


            return true
        }        
        return false;
    }
    
    return (
        <Column 
            horizontalAlign={horizontalAlign}
            style={{...theTheme.col, ...style}} 
            ref={ref}
            x={x}
            y={y}
            id={id}
            onMouseDown={(e)=>mouseDownHandler(e, [x, y])}
            onMouseUp={(e)=>mouseUpHandler(e, [x, y])}
            onMouseMove={(e)=>debounceMouseUpHandler(e, [x, y])}
            onClick={()=>clickHandler([x,y])}
            selected={selected}
            className={`tableCol ${isHightlighted()}`}
        >
            <Cell parentWidth={style.width} parentType={type}>
                {children}
            </Cell>
        </Column>
    )
});

export default Col;