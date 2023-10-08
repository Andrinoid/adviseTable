import React from "react";
import { Container } from "./styles";

const Footer = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Footer;
