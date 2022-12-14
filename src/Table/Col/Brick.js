import React, {useContext} from "react";
import styled from "styled-components";
import { TableContext } from '../context';

const BrickElm = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    user-select: none;
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 14px;
    justify-content: ${props => props.horizontalAlign};
`;
/**
 * The Brick component is the Columns of the table that does not hold data
 */
const Brick = ({
    horizontalAlign = 'right',
    children,
    style, 
}) => {

    // Get the context we need
    const {
        theTheme,
    } = useContext(TableContext);

    return (
        <BrickElm 
            className="brick"
            horizontalAlign={horizontalAlign}
            style={{ ...theTheme.col, ...style }}
        >
            {children}
        </BrickElm>
    );
}

export default Brick;