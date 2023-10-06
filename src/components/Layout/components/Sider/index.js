import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";
import Resizable from "./Resizeable";

const Sider = ({
  children,
  width,
  borderLeft,
  resizeable = false,
  ...rest
}) => {
  if (resizeable) {
    return (
      <Resizable initialWidth={width}>
        <Container {...rest} width={"100%"}>
          {children}
        </Container>
      </Resizable>
    );
  }

  return (
    <Container {...rest} width={width}>
      {children}
    </Container>
  );
};

Sider.propTypes = {
  width: PropTypes.number,
  resizeable: PropTypes.bool,
  borderLeft: PropTypes.number,
};

export default Sider;
