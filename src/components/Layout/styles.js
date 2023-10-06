import styled from "styled-components";

export const Tabs = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const Tab = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
