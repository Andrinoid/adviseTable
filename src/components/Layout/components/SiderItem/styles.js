import styled from 'styled-components';

export const Container = styled.div`
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  position: relative;
  padding: 2px 4px;
  img {
    width: 100%;
    height: auto;
    max-width: 60px;
  }
`;

export const SmallTile = styled.div`
  background: ${(props) =>
    props.outstanding
      ? 'linear-gradient(133deg, rgb(91 247 167 / 80%), rgb(43 94 235 / 80%));'
      : props.active
      ? '#E7F2FC'
      : 'transparent'};
  border-radius: 5px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  svg {
    stroke-width: 1.4;
    stroke: ${(props) =>
      props.outstanding ? '#fff' : props.active ? '#1677ff' : '#4a5058'};
  }

  &:hover {
    background-color: ${(props) => (props.active ? '#228be61a' : '#f8f9fa')};
  }
`;

export const Tile = styled.div`
  background-color: ${(props) => (props.active ? '#228be61a' : 'transparent')};
  border-radius: 5px;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  svg {
    stroke-width: 1.4;
    stroke: ${(props) => (props.active ? '#1677ff' : '#4a5058')};
  }
  color: ${(props) => (props.active ? '#1677ff' : 'inherit')};
  &:hover {
    background-color: ${(props) => (props.active ? '#E7F2FC' : '#f8f9fa')};
  }
`;

export const Icon = styled.span`
  line-height: 0;
`;
