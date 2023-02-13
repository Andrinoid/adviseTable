import React from "react";
import styled from "styled-components";

const Menu = styled.div`
    position: absolute;
    left: -45px;
    display: none;

    > div {
        background: white;
        width: 40px;
        border: solid 1px #e8e8e8;
        border-radius: 3px;
        box-shadow: 0 0 4px 0px rgb(0 0 0 / 12%);
        left: 0px;
        z-index: 4;
        margin-right: 5px;
        font-size: 16px;
    }
`;

const RowMenu = ({ tableId, children }) => {

    return (
        <Menu className={`${tableId}-rowMenu`}>
            <div>
                {children}
            </div>
        </Menu>
    );
}

export default RowMenu;

