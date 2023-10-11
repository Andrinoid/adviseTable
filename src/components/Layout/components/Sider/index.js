import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";
import Resizable from "./Resizeable";
import useLayout from "../../hooks/useLayout";

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
