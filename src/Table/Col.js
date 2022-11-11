//react component  
import React from 'react';
import styled from 'styled-components';

const Column = styled.div`
    background: #fff;
    box-shadow: inset 0px 0px 0 0.5px #ebebeb;
    display: flex;
    align-items: center;
    justify-content: left;
    position: absolute;
`;

const Col = ({style, children, id}) => {
    return (
        <Column style={{...style}} id={id}>
            {children}
        </Column>
    )
}
export default Col;