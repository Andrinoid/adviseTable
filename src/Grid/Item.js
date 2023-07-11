import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";


const Container = styled.div`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  box-sizing: border-box;
  height: ${(props) => typeof props.height == 'number' ? props.height + 'px' : props.height};
  width: ${(props) => typeof props.width == 'number' ? props.width + 'px' : props.width};
`;



const Item = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Container ref={ref} {...rest}>
      {children}
    </Container>
  );
});


const ResizeableItem = ({ children, containerWidth, columns, ...rest }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef(null);



  useEffect(() => {
    if (ref.current) {
      const e = ref.current;
      const r = e.getBoundingClientRect();
      setSize({ width: r.width, height: r.height });
    }
  }, []);


  const onResize = (event, { element, size: measures, handle }) => {
    setSize({ width: measures.width, height: size.height });
  };



  return (
    <Item
      ref={ref}
      {...rest}
      width={!!size.width ? size.width : "100%"}
      height={!!size.height ? size.height : '100%'}
    >
      <Resizable
        width={size.width}
        height={size.height}
        onResize={onResize}
        resizeHandles={["se"]}
        minConstraints={[200]}
      >
        {children}
      </Resizable>
    </Item>
  );
};


export default ({ resizable, children, ...rest }) => {
  if (resizable) {
    return <ResizeableItem {...rest}>{children}</ResizeableItem>;
  }

  return <Item {...rest}>{children}</Item>;
}
