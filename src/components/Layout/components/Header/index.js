import React from "react";
import { Container } from "./styles";

const Header = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Header;
