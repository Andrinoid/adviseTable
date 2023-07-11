import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

const Item = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Container ref={ref} {...rest}>
      {children}
    </Container>
  );
});

const ResizeableItem = ({ children, column, columnWidthPixel, ...rest }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef(null);
  const initialDimensions = useRef(null);

  useEffect(() => {
    const resize = () => {
      const e = ref.current;
      const r = e.getBoundingClientRect();
      setDimensions({ width: r.width, height: r.height });

      if (initialDimensions.current === null) {
        initialDimensions.current = { width: r.width, height: r.height };
      }
    };

    if (ref.current) {
      resize();
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const onResize = (_, { size: measures }) => {
    if (
      initialDimensions.current &&
      initialDimensions.current.width < measures.width
    ) {
      setDimensions({ width: measures.width, height: dimensions.height });
    }
  };

  const onResizeStop = (_, { size }) => {
    const isIncreasing = size.width > initialDimensions.current.width;

    if (isIncreasing) {
      const end = Math.round(size.width / columnWidthPixel);
      const itemColumns = end - getItemStart();
      const itemWidth = itemColumns * columnWidthPixel;

      setDimensions({
        width: itemWidth,
        height: dimensions.height,
      });
    }
  };

  function getItemStart() {
    const [start] = column.split("/").map((item) => {
      return parseInt(item.trim());
    });

    return start - 1;
  }

  return (
    <Item column={column} ref={ref} {...rest}>
      <ResizeableContainer height={dimensions.height} width={dimensions.width}>
        <Resizable
          width={dimensions.width}
          height={dimensions.height}
          onResize={onResize}
          onResizeStop={onResizeStop}
          resizeHandles={["se"]}
          minConstraints={[200]}
        >
          {children}
        </Resizable>
      </ResizeableContainer>
    </Item>
  );
};

const Container = styled.div`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  box-sizing: border-box;
`;

const ResizeableContainer = styled.div`
  height: ${(props) =>
    typeof props.height == "number" ? props.height + "px" : props.height};
  width: ${(props) =>
    typeof props.width == "number" ? props.width + "px" : props.width};
  /* transition: width 0.01s ease-in; */
`;

export default ({ resizable, children, ...rest }) => {
  if (resizable) {
    return <ResizeableItem {...rest}>{children}</ResizeableItem>;
  }

  return <Item {...rest}>{children}</Item>;
};
