import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  //Maybe we should have overflow-x auto and remove the overflow-y hidden
  position: relative;
  ${({ vertical }) => {
    if (vertical) {
      return 'flex-direction: column;';
    }

    return 'flex-direction: row;';
  }}
`;
