import styled from "styled-components";

export const Container = styled.div`
    background-color: transparent;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;

    @media (max-width: 700px) {
        width: calc(100vw - 60px);
    }
`;

export const Mask = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.45);
    pointer-events: auto;
`;
