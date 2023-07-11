import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import Item from "./Item";

const Grid = ({
  layout,
  children,
  cols = 21,
  gap = 10,
  onLayoutChange = (layout) => {},
}) => {
  const [items, setItems] = useState([...layout]);
  const [gridWidth, setGridWidth] = useState(0);

  const containerRef = useRef(null);
  const itemsRefs = useRef([]);

  const updateItem = useCallback(
    (id, x, w) => {
      let values = [...items];
      const index = values.findIndex((v) => v.i === id);

      if (index !== -1) {
        const value = { ...items[index] };
        value.x = x;
        value.w = w;
        values[index] = value;

        values = fixCollisions(values, value);

        setItems(values);
      }
    },
    [items]
  );

  function fixCollisions(values, value) {
    const collision = values.find(
      (v) =>
        v.i !== value.i &&
        v.x < value.x + value.w &&
        v.x + v.w > value.x &&
        v.y < value.y + value.h &&
        v.y + v.h > value.y
    );

    if (collision) {
      for (let i = 0; i < values.length; i++) {
        if (values[i].i === value.i) continue;

        if (values[i].i === collision.i) {
          // values[i].y +
        }
      }
    }

    return values;
  }

  useEffect(() => {
    onLayoutChange(items);
  }, [items]);

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

        const found = items.find((item) => item.i === child.props.id);

        if (found) {
          const column = found.x + 1 + " / " + (found.x + 1 + found.w);
          const row = found.y + 1 + " / " + (found.y + 1 + found.h);

          const { id, ...rest } = child.props;

          return (
            <Item
              id={id}
              ref={(el) => {
                itemsRefs.current.push(el);
              }}
              updateItem={updateItem}
              key={i}
              row={row}
              column={column}
              columnWidthPixel={gridWidth / cols}
            >
              {cloneElement(child, { ...rest })}
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
