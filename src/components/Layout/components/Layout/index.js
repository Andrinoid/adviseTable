import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styles";
import Drawer from "../Drawer";

const Layout = ({ children, containDrawer = false, ...rest }) => {
  return (
    <Container {...rest}>
      {containDrawer ? <Drawer /> : null}

      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
};

export default Layout;
