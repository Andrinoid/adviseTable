import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { Space, Typography } from "antd";

const { Text } = Typography;

export default function Menu(props) {
  const { position, open, data } = props;

  const menu = useRef(null);

  useEffect(() => {
    const menuScaling = [{ display: 'none', transform: "scale(0)" }, { display: 'block', transform: "scale(1)" }];

    const menuTiming = {
      duration: 150,
      iterations: 1,
    };

    if (menu.current) {
      if (open) {
        menu.current.animate(menuScaling, menuTiming);
      } else {
        menu.current.animate(menuScaling.reverse(), menuTiming);
      }
    }
  }, [open]);

  return (
    <>
      
        <Container
          ref={menu}
          position={position}
          style={{ display: open ? "block" : "none" }}
        >
          <Space direction="vertical">
            {data.map((item, index) => (
              <Option
                key={index}
                onClick={() => {
                  if (item.onClick) item.onClick();
                }}
              >
                <Text>{item.label}</Text>
              </Option>
            ))}
          </Space>
        </Container>
    </>
  );
}

const Option = styled.button`
  background: none;
  border: none;
  width: 100%;
  outline: none;
  list-style: none;
  padding: 5px 25px;
  cursor: pointer;
  text-align: left;

  span {
    letter-spacing: 0.6px;
    line-height: 20px;
    font-weight: bold;
  }
`;

const Container = styled.div`
  position: absolute;
  top: ${({ position }) => position.y - 145}px;
  left: ${({ position }) => position.x - 175 - 50 - 22}px;
  z-index: 1000;
  padding: 25px 0;
  background-color: rgba(221, 221, 221, 0.49);
  width: 175px;
  height: 250px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(5px);
`;
