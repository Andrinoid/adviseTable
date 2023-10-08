import styled from "styled-components";

export const Container = styled.div`
  height: 38px;
  background-color: #f8fafb;
  box-shadow: inset 0px 1px 0px #e8eaed;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding-bottom: 38px;
  position: relative;

  ${({ height }) => {
    if (height) {
      return `height: ${height}px;`;
    }
  }}
`;
