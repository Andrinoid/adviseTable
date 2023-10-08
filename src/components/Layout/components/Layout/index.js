import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "./styles";
import useLayout from "../../hooks/useLayout";

const Layout = ({ children, reverse, ...rest }) => {
  const { setReverse } = useLayout();

  useEffect(() => {
    setReverse(!!reverse);
  }, [reverse]);

  return (
    <Container {...rest} reverse={reverse}>
      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
  reverse: PropTypes.bool,
};

export default Layout;
