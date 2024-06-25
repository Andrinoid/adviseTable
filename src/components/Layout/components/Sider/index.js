import React from 'react';
import PropTypes from 'prop-types';

import { Container, MobileContainer, SmallScreenContainer } from './styles';
import Resizable from './Resizeable';
import useSmallScreen from '../../hooks/useSmallScreen';
import usePlatform from '../../hooks/usePlatform';

const Sider = ({
  children,
  width,
  maxWidth,
  borderLeft,
  resizeable = false,
  main = false,
  ...rest
}) => {
  const smallScreen = useSmallScreen();
  const platform = usePlatform();

  if (resizeable && !smallScreen) {
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

  if ((smallScreen || platform === 'mobile') && !main) {
    return <MobileContainer {...rest}>{children}</MobileContainer>;
  }

  return (
    <Container width={{ width }} {...rest}>
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
