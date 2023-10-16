import styled from "styled-components";

export const Container = styled.div`
  background-color: rgb(248, 250, 251);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  border-right: 1px solid rgb(232, 234, 237);

  @media (max-width: 700px) {
    width: calc(100vw - 60px);
  }

  ${({ width }) => {
    if (width) {
      return `width: ${width}px;`;
    }

    return "";
  }}
`;
