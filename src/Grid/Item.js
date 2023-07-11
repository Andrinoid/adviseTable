import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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

const ResizeableItem = forwardRef(
  ({ id, updateItem, children, column, columnWidthPixel, ...rest }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isResizing, setIsResizing] = useState(null);

    const containerRef = useRef(null);
    const initialDimensions = useRef(null);

    // useImperativeHandle(ref, () => ({}));

    /**
     * Because the grid is responsive, we need to update the dimensions since the
     * resizable library only supports absolute units.
     *
     * We also need to keep track of the initial dimensions so we can check if the
     * item is increasing or decreasing in size.
     */
    useEffect(() => {
      const initializeDimensions = () => {
        if (containerRef.current) {
          const { width, height } =
            containerRef.current.getBoundingClientRect();

          if (width !== dimensions.width || height !== dimensions.height) {
            setDimensions({ width, height });

            if (initialDimensions.current === null) {
              initialDimensions.current = { width, height };
            }
          }
        }
      };

      initializeDimensions();

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

      const columns = Math.round(size.width / columnWidthPixel);
      const width = columns * columnWidthPixel - 5;

      setDimensions({
        width: width,
        height: dimensions.height,
      });

      updateItem(id, getItemStart(), columns);
    };

    function getItemStart() {
      const [start] = getItemColumns();

      return start - 1;
    }

    function getItemColumns() {
      return column.split("/").map((item) => {
        return parseInt(item.trim());
      });
    }

    return (
      <Item id="container" column={column} {...rest} ref={containerRef}>
        <ResizeableContainer
          resizing={isResizing}
          height={dimensions.height}
          width={dimensions.width}
        >
          <Resizable
            height={dimensions.height}
            width={dimensions.width}
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
  }
);

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

export default ResizeableItem;
