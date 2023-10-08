import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: hidden;

  ${({ vertical, reverse }) => {
    if (vertical && reverse) {
      return "flex-direction: column-reverse;";
    }

    if (vertical) {
      return "flex-direction: column;";
    }

    if (reverse) {
      return "flex-direction: row-reverse;";
    }

    return "flex-direction: row;";
  }}
`;
