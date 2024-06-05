import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #e8eaed;
  background: #ffffff;
  flex-shrink: 0;
  width: ${({ width }) => width || 250}px;
  border-left-width: ${({ borderLeftWidth }) => borderLeftWidth || 1}px;
  border-right-width: ${({ borderRightWidth }) => borderRightWidth || 1}px;
  pointer-events: initial;
  z-index: 11;
`;

export const SmallScreenContainer = styled(Container)`
  width: calc(100vw - 74px);
  position: absolute;
`;

export const MobileContainer = styled(Container)`
  width: 100vw;
  position: absolute;
`;
