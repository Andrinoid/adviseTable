import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow: auto;
  height: 100%;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`;
