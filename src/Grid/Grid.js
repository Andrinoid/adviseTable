import React, {
  Children,
  cloneElement,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";
import Item from "./Item";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  
  grid-template-columns: repeat(${(props) => props.columns || 21}, 1fr);
  ${({ gap }) => {
    if (!gap) return "";

    return `gap: ${gap}px;`;
  }}
  box-sizing: border-box;
`;

const Grid = (props, ref) => {
  const { columns, layout: providedLayout, children, gap } = props;
  const [layout, setLayout] = useState([...providedLayout]);

  const changePosition = (sourceId, targetId) => {
    const source = layout.find((item) => item.i === sourceId);
    const target = layout.find((item) => item.i === targetId);

    const xStart = source.x;
    const yStart = source.y;
    const width = source.w;
    const height = source.h;

    source.x = target.x;
    source.y = target.y;
    source.w = target.w;
    source.h = target.h;

    target.x = xStart;
    target.y = yStart;
    target.w = width;
    target.h = height;

    setLayout([...layout]);
  };

  useImperativeHandle(ref, () => ({
    changePosition,
  }));

  return (
    <Container columns={columns} gap={gap} data-testid="grid">
      {Children.map(children, (child, i) => {
        if (i + 1 > columns) return null;

        const info = layout.find((item) => item.i === child.props.id);

        if (info) {
          const column = info.x + 1 + " / " + (info.x + 1 + info.w);
          const row = info.y + 1 + " / " + (info.y + 1 + info.h);

          return (
            <Item column={column} row={row}>
              {cloneElement(child, { ...child.props })}
            </Item>
          );
        }
      })}
    </Container>
  );
};

export default forwardRef(Grid);
