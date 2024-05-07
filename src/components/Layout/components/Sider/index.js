import React from 'react';
import PropTypes from 'prop-types';

import { Container, MobileContainer } from './styles';
import Resizable from './Resizeable';
import useMobile from '../../hooks/useMobile';

const Sider = ({
  children,
  width,
  maxWidth,
  borderLeft,
  resizeable = false,
  main = false,
  ...rest
}) => {
  const mobile = useMobile();

  if (resizeable && !mobile) {
    return (
      <Resizable initialWidth={width} maxWidth={maxWidth || Infinity}>
        <Container
          {...rest}
          borderLeftWidth={0}
          borderRightWidth={1}
          width={'100%'}
        >
          {children}
        </Container>
      </Resizable>
    );
  }

  if (mobile && !main) {
    return <MobileContainer {...rest}>{children}</MobileContainer>;
  }

  return <Container {...rest}>{children}</Container>;
};

Sider.propTypes = {
  width: PropTypes.number,
  resizeable: PropTypes.bool,
  borderLeft: PropTypes.number,
};

export default Sider;
