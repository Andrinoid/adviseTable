import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Drawer from '../Drawer';
import useControls from '../../hooks';

const Layout = ({ children, containDrawer = false, ...rest }) => {
  const { mobile } = useControls();
  return (
    <Container {...rest}>
      {containDrawer && !mobile ? <Drawer /> : null}

      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
};

export default Layout;
