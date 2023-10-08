import React from "react";
import { Container, PaddingBottom, PositionRelative } from "./styles";

const Footer = ({ children, ...rest }) => {
  return (
    <PositionRelative>
      <PaddingBottom>
        <Container {...rest}>{children}</Container>
      </PaddingBottom>
    </PositionRelative>
  );
};

export default Footer;
