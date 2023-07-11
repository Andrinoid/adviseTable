import React, {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Item from "./Item";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  ${({ gap }) => {
    if (!gap) return "";

    return `gap: ${gap}px;`;
  }}
  box-sizing: border-box;
`;

const Grid = ({ layout, children, cols = 21, gap = 10 }, ref) => {
  const [measures] = useState([...layout]);
  const [gridWidth, setGridWidth] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const e = containerRef.current;
      const r = e.getBoundingClientRect();
      setGridWidth(r.width);
    }
  }, []);

  return (
    <Container ref={containerRef} columns={cols} gap={gap} data-testid="grid">
      {Children.map(children, (child, i) => {
        if (i + 1 > cols) return null;

        const found = measures.find((item) => item.i === child.props.id);

        if (found) {
          const column = found.x + 1 + " / " + (found.x + 1 + found.w);
          const row = found.y + 1 + " / " + (found.y + 1 + found.h);

          const isLastColumn = found.x + found.w == cols || found.x == cols;

          return (
            <Item
              resizable={!isLastColumn}
              key={i}
              column={column}
              row={row}
              containerWidth={gridWidth}
              columns={cols}
            >
              {cloneElement(child, { ...child.props })}
            </Item>
          );
        }
      })}
    </Container>
  );
};

export default forwardRef(Grid);
