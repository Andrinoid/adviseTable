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
  const [isResizing, setIsResizing] = useState(null);

  /**
   * Because the grid is responsive, we need to update the dimensions since the
   * resizable library only supports absolute units.
   *
   * We also need to keep track of the initial dimensions so we can check if the
   * item is increasing or decreasing in size.
   */
  useEffect(() => {
    const initializeDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });

        if (initialDimensions.current === null) {
          initialDimensions.current = { width, height };
        }
      }
    };

    if (ref.current) {
      initializeDimensions();
    }

    window.addEventListener("resize", initializeDimensions);

    return () => {
      window.removeEventListener("resize", initializeDimensions);
    };
  }, []);

  /**
   * When the item is being resized, we need to check if the item is increasing
   * or decreasing in size. If it's increasing, we need to update the dimensions
   */
  const onResize = (_, { size: measures }) => {
    setIsResizing(true);

    setDimensions({ width: measures.width, height: dimensions.height });
  };

  /**
   * When the item is done being resized, we need to check if the item is
   * increasing or decreasing in size. If it's increasing, we need to update the
   * dimensions
   *  */
  const onResizeStop = (_, { size }) => {
    setIsResizing(false);

    const end = Math.round(size.width / columnWidthPixel);
    const itemColumns = end - getItemStart();
    const itemWidth = itemColumns * columnWidthPixel;

    setDimensions({
      width: itemWidth,
      height: dimensions.height,
    });
  };

  function getItemStart() {
    const [start] = column.split("/").map((item) => {
      return parseInt(item.trim());
    });

    return start - 1;
  }

  return (
    <Item column={column} ref={ref} {...rest}>
      <ResizeableContainer
        resizing={isResizing}
        height={dimensions.height}
        width={dimensions.width}
      >
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

  ${({ resizing }) => {
    if (resizing === false) {
      return `
        transition: width 0.05s ease-in;
      `;
    }
  }}
`;

export default ({ resizable, children, ...rest }) => {
  if (resizable) {
    return <ResizeableItem {...rest}>{children}</ResizeableItem>;
  }

  return <Item {...rest}>{children}</Item>;
};
