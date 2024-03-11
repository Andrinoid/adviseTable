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
  style,
  main,
  ...rest
}) => {
  const { mobile } = useControls();

  if (resizeable && !mobile) {
    return (
      <Resizable initialWidth={width} maxWidth={maxWidth || Infinity}>
        <Container
          {...rest}
          style={style}
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
      style={{
        ...style,
        width:
          mobile && !main
            ? 'calc(100vw - 73px)'
            : style && style.width
            ? style.width
            : 'initial',
        maxWidth:
          mobile && !main
            ? 'calc(100vw - 73px)'
            : style && style.maxWidth
            ? style.maxWidth
            : 'initial',
      }}
      {...rest}
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
