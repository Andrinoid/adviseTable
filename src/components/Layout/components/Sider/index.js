import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

const Sider = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

Sider.propTypes = {
  width: PropTypes.number,
};

export default Sider;
