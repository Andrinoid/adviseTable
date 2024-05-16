import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 11;

  ${({ smallScreen, platform }) => {
    if (platform === 'mobile') {
      return `
      left: 0;
      width: 100vw;
      z-index: 1000 !important;
  `;
    }

    if (smallScreen) {
      return `
      left: 0;
      z-index: 1000 !important;
      width: calc(100vw - 74px);
  `;
    }

    return ``;
  }}
`;

export const Mask = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: auto;
  z-index: 10;
`;
