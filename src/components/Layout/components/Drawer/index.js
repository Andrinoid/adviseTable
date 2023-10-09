import React from "react";
import { Container } from "./styles";
import useLayout from "../../hooks/useLayout";

const Drawer = () => {
  const { drawers } = useLayout();

  return drawers.length > 0 ? (
    <Container>{drawers[drawers.length - 1]}</Container>
  ) : null;
};

export default Drawer;
