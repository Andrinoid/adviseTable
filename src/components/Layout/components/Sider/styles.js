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

    return "60px";
  }};
  background-color: #242a43;
  border-right: 1px solid #e8eaed;
  border-left: 1px solid #e8eaed;
  background: #f8fafb;
  flex-shrink: 0;
  z-index: 2;
`;
