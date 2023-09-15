import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: block;
`;

export const Handler = styled.div`
  position: absolute;
  top: 0;
  width: 10px;
  height: 100%;
  left: ${({ x }) => x}px;
  background-color: transparent;
  cursor: ${({ editing }) => (editing ? "col-resize" : "default")};
  z-index: 3;
  cursor: col-resize;

  &:hover {
    border-right: 1px solid #64b2fe;
  }
`;
