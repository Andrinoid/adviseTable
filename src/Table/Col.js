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
    &.hightlighted {
        background: #e9f0fd;
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

    const isHightlighted = () => {

        if (!selectable) return false;
        if (!selectColDraging) return false; 
     
        let isX = false;
        let isY = false;
        if(mouseDownColCord) {
            // Find the min and max of the mouseDownColCord and mouseMoveColCord
            const minX = Math.min(mouseDownColCord[0], mouseMoveColCord[0]);
            const maxX = Math.max(mouseDownColCord[0], mouseMoveColCord[0]);
            const minY = Math.min(mouseDownColCord[1], mouseMoveColCord[1]);
            const maxY = Math.max(mouseDownColCord[1], mouseMoveColCord[1]);

            if(x >= minX && x <= maxX) {
                isX = true;
            }
            if(y >= minY && y <= maxY) {  
                isY = true;
            }
        }
        if(isX && isY) { 
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
            className={`tableCol ${isHightlighted() ? 'hightlighted' : ''}`}
        >
            <Cell parentWidth={style.width} parentType={type}>
                {children}
            </Cell>
        </Column>
    )
});

export default Col;