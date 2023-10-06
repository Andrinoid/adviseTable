import React from "react";
import { Container } from "./styles";

const Layout = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Layout;
