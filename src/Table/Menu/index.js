import React from "react";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

import { Space } from "antd";

export default function Menu(props) {
  const { position, open, children } = props;

  const mappedChildren = React.Children.map(children, (child) => {
    const hasSubmenu = child.props?.data && child.props?.data.length > 0;
    return (
      <Option
        onClick={() => {
          if (child.props?.onClick) child.props.onClick();
        }}
        openable={hasSubmenu}
      >
        {child}
        {hasSubmenu && <RightOutlined style={{}} />}
      </Option>
    );
  });

  return (
    <AnimatePresence>
      {open && (
        <Container
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          exit={{ scale: 0 }}
          position={position}
        >
          <Space direction="vertical">{mappedChildren}</Space>
        </Container>
      )}
    </AnimatePresence>
  );
}

const Container = styled(motion.ul)`
  z-index: 1000;
  padding: 25px 0;
  background-color: rgba(221, 221, 221, 0.49);
  width: 175px;
  height: 250px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);
  position: absolute;
  top: ${({ position }) => position.y - 145}px;
  left: ${({ position }) => position.x - 175 - 50 - 22}px;
  /* top: 156px;
  left: 429; */
  backdrop-filter: blur(5px);
`;

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

  ${({ openable }) => {
    if (!openable) return "";

    return `
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
  }}
`;
