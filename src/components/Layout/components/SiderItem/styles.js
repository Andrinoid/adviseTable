import styled from "styled-components";

export const Container = styled.div`
    border: none;
    background: ${({ active }) => (active ? "#f5f5f5" : "transparent")};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    font-size: 15px;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: #f5f5f5;
    }

    img {
        width: 100%;
        height: auto;
        max-width: 60px;
    }
`;
