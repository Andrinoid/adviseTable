import styled from "styled-components";

export const Container = styled.div`
    border: none;
    background: ${({ active }) =>
        active ? "rgba(0, 0, 0, 0.04)" : "transparent"};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    font-size: 15px;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

    img {
        width: 100%;
        height: auto;
        max-width: 60px;
    }
`;
