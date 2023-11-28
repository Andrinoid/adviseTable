import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: ${({ width }) => {
        if (width && typeof width == "number") {
            return `${width}px`;
        }

        if (width && typeof width == "string" && width.includes("%")) {
            return width;
        }
    }};
    border-right: 1px solid #e8eaed;
    background: #ffffff;
    flex-shrink: 0;
    z-index: 2;
    border-left-width: ${({ borderLeftWidth }) => borderLeftWidth}px;
    border-right-width: ${({ borderRightWidth }) => borderRightWidth}px;
    pointer-events: initial;
`;
