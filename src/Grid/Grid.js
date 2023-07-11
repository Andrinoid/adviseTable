import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import Item from "./Item";

const Grid = ({ layout, children, cols = 21, gap = 10 }) => {
  const [measures] = useState([...layout]);
  const [gridWidth, setGridWidth] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    const resize = () => {
      const e = containerRef.current;
      const r = e.getBoundingClientRect();
      setGridWidth(r.width);
    };

    if (containerRef.current) {
      resize();
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
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
              key={i}
              row={row}
              column={column}
              resizable={!isLastColumn}
              columnWidthPixel={gridWidth / cols}
            >
              {cloneElement(child, { ...child.props })}
            </Item>
          );
        }
      })}
    </Container>
  );
};

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

export default Grid;
