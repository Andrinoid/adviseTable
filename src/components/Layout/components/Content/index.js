import React, { useEffect, useRef } from "react";
import { Container } from "./styles";
import useLayout from "../../hooks/useLayout";

const Content = ({ children }) => {
  const { width } = useLayout();
  const ref = useRef(null);

  return (
    <Container width={width} ref={ref}>
      {children}
    </Container>
  );
};

export default Content;
