import React from "react";
import { Container, PaddingBottom } from "./styles";

const Footer = ({ children, ...rest }) => {
  return (
    <PaddingBottom>
      <Container {...rest}>{children}</Container>
    </PaddingBottom>
  );
};

export default Footer;
