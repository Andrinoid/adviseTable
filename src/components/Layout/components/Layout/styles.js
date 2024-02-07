import styled from "styled-components";

export const Container = styled.div`
  z-index: 1;
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  ${({ vertical }) => {
    if (vertical) {
      return "flex-direction: column;";
    }

    return "flex-direction: row;";
  }}
`;
