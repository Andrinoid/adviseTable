import React, { useState } from "react";
import styled from "styled-components";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

const Box = styled.div`
  background-color: lightblue;
  border: 1px solid #369;
`;

function DummyWidget({ initialHeight, style }) {
  const [height, setHeight] = useState(initialHeight);

  const onResize = (event, { element, size }) => {
    setHeight(size.height);
  };

  return (
    <div style={style}>
      <Resizable
        height={height}
        width={100}
        onResize={onResize}
        resizeHandles={["s"]} // Vertical handle only
      >
        <Box style={{ height: height, width: "100%" }}>Widget</Box>
      </Resizable>
    </div>
  );
}

export default DummyWidget;
