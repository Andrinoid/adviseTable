import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Resizable from './Resizeable';

const Sider = ({
  children,
  width,
  maxWidth,
  borderLeft,
  resizeable = true,
  ...rest
}) => {
  if (resizeable && !Number.isNaN(width)) {
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

  return (
    <Container
      {...rest}
      style={{ width: !Number.isNaN(width) ? width : '100%' }}
    >
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
