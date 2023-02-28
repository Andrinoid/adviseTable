import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Space, Typography } from "antd";

const { Text } = Typography;

export default function Menu(props) {
  const { position, open, data, duration } = props;
  const [className, setClassName] = useState(null);
  const [options, setOptions] = useState(null);

  const menu = useRef(null);

  useEffect(() => {
    if (menu.current) {
      if (open) {
        setTimeout(() => {
          setClassName("open");
        }, 1);
      } else {
        setTimeout(() => {
          setClassName("close");
        }, 1);
      }
    }
  }, [open]);

  useEffect(() => {
    
    if (options && options.length !== data.length) {
      setTimeout(() => {
        setOptions(data);
      }, duration+100);
    } else {
      setOptions(data);
    }
  }, [data, options]);

  return (
    <Container>
      <MenuContainer
        duration={duration}
        ref={menu}
        position={position}
        style={{ display: open ? "block" : "none" }}
        className={className}
      >
        <Space direction="vertical">
          {options && options.map((item, index) => {
            const Icon = item.icon;
            return (
              <Option
                key={index}
                onClick={() => {
                  if (item.onClick) item.onClick();
                }}
              >
                <div>
                  {Icon && <Icon className="icon" />}
                  <Text>{item.label}</Text>
                </div>
                <Text>{item.command || ""}</Text>
              </Option>
            );
          })}
        </Space>
      </MenuContainer>
    </Container>
  );
}

const width = 240;
const padding = 15;
const color = "#000000E0";

const Container = styled.div`
  .open {
    opacity: 1;
  }

  .close {
    opacity: 0;
  }
`;

const Option = styled.button`
  background: none;
  border: 1px solid transparent;
  outline: none;
  list-style: none;
  padding: 7.5px ${padding + 7.5}px;
  cursor: pointer;
  text-align: left;
  color: ${color} !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${width}px;
  margin: 0;

  div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  span.icon {
    font-size: 16px;
    margin-top: 4px;
  }

  div > span:nth-child(2) {
    width: ${width - 120}px;
    padding-left: 10px;
  }

  span {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgb(0 0 0 / 0%);
    letter-spacing: 0.2px;
    visibility: visible;
    color: ${color} !important;
  }

  & > span:last-child {
    justify-self: flex-end;
    color: grey;
  }

  &:hover {
    background-color: rgba(238, 238, 238, 1);
  }
`;

const MenuContainer = styled.div`
  cursor: default;
  position: absolute;
  top: ${({ position }) => position.y - 145}px;
  left: ${({ position }) => position.x - 175 - 50 - 22}px;
  z-index: 1000;
  background-color: rgb(249, 250, 251);
  width: ${width}px;
  height: 45vh;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 14%), 0 6px 16px 0 rgb(0 0 0 / 10%),
    0 9px 28px 8px rgb(0 0 0 / 7%);
  backdrop-filter: blur(5px);
  border: 1px solid transparent;
  padding: ${padding}px 0 ${padding}px 0px;
  transition: all ${({ duration }) => duration / 1000}s ease-in-out;
`;
