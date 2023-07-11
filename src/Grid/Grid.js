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
    ({ id, x, size }) => {
      let values = [...items];
      const found = values.find((v) => v.i === id);

      if (found) {
        const w = updateItemInnerState(id, size);

        found.x = x;
        found.w = w;

        values = fixCollisions(values, found);

        setItems(values);
      }
    },
    [items, gridWidth, cols]
  );

  function updateItemInnerState(id, size) {
    const ref = itemsRefs.current.find((r) => r.getId() === id);

    const widthPixels = gridWidth / cols;
    const columns = Math.round(size.width / widthPixels);
    const width = columns * widthPixels - 5;

    ref.setWidth(width);

    return columns;
  }

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
                itemsRefs.current[i] = el;
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

  .react-resizable-handle {
    background: none;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -6px;
    position: absolute;
    cursor: col-resize;
    transform: none;
    top: 0;
    margin: 0;
    z-index: 1;
  }
`;

export default Grid;
