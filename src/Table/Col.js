//react component  
import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { debounce} from 'lodash';

const Column = styled.div`
    background: #fff;
    box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: ${props => props.horizontalAlign};
    background: ${props => props.selected ? '#e9f0fd' : 'white'};
    position: absolute;
    user-select: none;
`;

const SpaceAround = styled.div`
    padding: 0 5px;
`;

const Col = React.forwardRef((props, ref) => {
    const { 
        horizontalAlign='right',
        children, 
        style={}, 
        id,
    } = props;

    const [selected, setSelected] = useState(false);
    
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        // document.addEventListener('mousemove', mouseMoveHandler);
        // document.addEventListener('mouseup', mouseUpHandler);
    },[selected]);

    
    const mouseDownHandler = (e, id) => {
        console.log(e.clientX);
        console.log(id);
        setSelected(true);
    }

    const mouseUpHandler = (e, id) => {
        console.log(id)
    }

    const mouseMoveHandler = (e, id) => {
        console.log(id)
    }
    const debounceMouseUpHandler = debounce(mouseMoveHandler, 100);
    
    return (
        <Column 
            horizontalAlign={horizontalAlign}
            style={{...style}} 
            ref={ref}
            id={id} 
            onMouseDown={(e)=>mouseDownHandler(e,id)}
            onMouseUp={(e)=>mouseUpHandler(e, id)}
            onMouseMove={(e)=>debounceMouseUpHandler(e, id)}
            selected={selected}
            className={'tableCol'}
        >
            <SpaceAround>
                {children}
            </SpaceAround>
        </Column>
    )
});

export default Col;