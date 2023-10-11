import React from "react";
import { Container } from "./styles";
import Drawer from "../Drawer";
import useLayout from "../../hooks/useLayout";

const Content = ({ children }) => {
  const { width } = useLayout();
  return (
    <Container width={width}>
      <Drawer />
      {children}
    </Container>
  );
};

export default Content;
