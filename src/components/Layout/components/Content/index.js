import React from "react";
import { Container } from "./styles";
import Drawer from "../Drawer";

const Content = ({ children }) => {
  return (
    <Container>
      <Drawer />
      {children}
    </Container>
  );
};

export default Content;
