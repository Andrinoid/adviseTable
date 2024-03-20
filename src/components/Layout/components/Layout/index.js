import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Drawer from '../Drawer';

const Layout = ({
  children,
  containDrawer = false,
  onDrawerMaskClick = () => {},
  ...rest
}) => {
  return (
    <Container {...rest}>
      {containDrawer ? <Drawer onDrawerMaskClick={onDrawerMaskClick} /> : null}

      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
};

export default Layout;
