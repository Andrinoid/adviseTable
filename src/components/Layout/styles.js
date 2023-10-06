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

export const SiderTop = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid rgb(232, 232, 232); // put into a variable
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 ${(props) => props.padding}px;
  font-size: 15px;
  cursor: pointer;

  & > img {
    width: 100%;
    height: auto;
    max-width: 60px;
  }
`;

SiderTop.defaultProps = {
  padding: 20, // Set default padding value to 20
};

export const SiderItem = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }

  & > img {
    width: 100%;
    height: auto;
    max-width: 60px;
  }
`;

export const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  cursor: pointer;
  // background-color: #f6f6f6;
  font-size: 19px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
