import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styles";

const Layout = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

Layout.propTypes = {
  vertical: PropTypes.bool,
};

export default Layout;
