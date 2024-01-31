import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";
import Resizable from "./Resizeable";

const Sider = ({
  children,
  width,
  maxWidth,
  borderLeft,
  resizeable = false,
  ...rest
}) => {
  if (resizeable) {
    return (
      <Resizable initialWidth={width} maxWidth={maxWidth || Infinity}>
        <Container
          {...rest}
          borderLeftWidth={0}
          borderRightWidth={1}
          width={"100%"}
        >
          {children}
        </Container>
      </Resizable>
    );
  }

  return <Container {...rest}>{children}</Container>;
};

Sider.propTypes = {
  width: PropTypes.number,
  resizeable: PropTypes.bool,
  borderLeft: PropTypes.number,
};

export default Sider;
