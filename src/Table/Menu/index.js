import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Space } from "antd";

export default function Menu(props) {
  const { position, open, children } = props;
  console.log("Meu component started");
  console.log("children", children);
  const mappedChildren = React.Children.map(children, (child) => {
    const { onClick } = child.props;

    return (
      <Option
        onClick={() => {
          if (onClick && typeof onClick === "function") onClick();
        }}
      >
        {child}
      </Option>
    );
  });

  console.log("mappedchildren", children);
  console.log("open", open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          exit={{ scale: 0 }}
          style={{
            position: "absolute",
            top: position.y - 145,
            left: position.x - 175 - 50 - 22,
            zIndex: 1000,
            padding: "25px 0",
            backgroundColor: "rgba(221, 221, 221, 0.49)",
            width: "175px",
            height: "250px",
            boxSizing: "border-box",
            borderRadius: "12px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Space direction="vertical">{mappedChildren}</Space>
        </motion.div>
      )}
    </AnimatePresence>
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
