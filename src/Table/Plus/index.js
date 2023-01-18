import React, { useState } from "react";
import styled from "styled-components";

const Plus = ({ onClick }) => {
  const [clicked, setCliked] = useState(false);

  function handleOnClick() {
    setCliked((previous) => !previous);
    if (onClick) {
      onClick();
    }
  }

  return (
    <RectContainer type="button" onClick={handleOnClick}>
      <Rect horizontal />
      <Rect className={clicked ? "rotate" : ""} />
    </RectContainer>
  );
};

const RectContainer = styled.button`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;

  .rotate {
    transform: rotate(90deg);
  }
`;

const Rect = styled.div`
  position: absolute;
  width: 1.5px;
  height: ${(props) => (props.height ? props.height : "14px")};
  background-color: rgb(89, 89, 89);
  border-radius: 0.5px;
  transform: rotate(${(props) => (props.horizontal ? "90deg" : "0deg")});
  transition: transform 0.5s;
`;

export default Plus;
