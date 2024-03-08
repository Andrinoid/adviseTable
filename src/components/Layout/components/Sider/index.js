import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Resizable from './Resizeable';
import useControls from '../../hooks';

const Sider = ({
  children,
  width,
  maxWidth,
  borderLeft,
  resizeable = false,
  ...rest
}) => {
  const { mobile } = useControls();

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

  return (
    <Container mobile={mobile} {...rest}>
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
