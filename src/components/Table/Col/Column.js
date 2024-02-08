import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Column = ({ children, onClick, onDoubleClick, ...rest }, ref) => {
  const [count, setCount] = useState(0);
  const [firstClickTime, setFirstClickTime] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setFirstClickTime(Date.now());
  };

  useEffect(() => {
    let timeout = null;

    if (firstClickTime !== 0) {
      timeout = setTimeout(() => {
        if (count === 1) {
          if (onClick) onClick();
        } else {
          if (onDoubleClick) onDoubleClick();
        }
        setCount(0);
        setFirstClickTime(0);
      }, 300);
    }

    return () => {
      if (timeout != null) {
        clearTimeout(timeout);
      }
    };
  }, [firstClickTime, count, onClick, onDoubleClick]);

  return (
    <Wrapper ref={ref} {...rest} onClick={handleClick}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
  align-items: center;
  justify-content: ${(props) => props.horizontalAlign};
  text-align: ${(props) => props.horizontalAlign};
  overflow: ${(props) => (props.type === 'first' ? 'hidden' : 'visible')};
  user-select: none;
  box-sizing: border-box;
  ${({ showGrid, theme }) => {
    if (showGrid) {
      return theme.grid;
    }
  }}
`;

export default forwardRef(Column);
