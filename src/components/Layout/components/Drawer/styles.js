import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 11;

  ${({ mobile }) => {
    if (!mobile) {
      return '';
    }

    return `
        left: 0;
        width: calc(100vw - 74px);
        z-index: 1000 !important;
    `;
  }}
`;

export const Mask = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: auto;
  z-index: 10;
`;
