import React from "react";
import useLayout from "../../hooks/useLayout";
import { AnimatePresence, motion } from "framer-motion";

const Siders = ({ children }) => {
  const { siders } = useLayout();

  const transition = {
    stiffness: 10,
    duration: 0.025,
  };

  return (
    <>
      {children}
      <AnimatePresence>
        {siders.map((sider, siderIndex) => (
          <motion.div
            key={siderIndex}
            transition={transition}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
          >
            {sider[sider.length - 1](siderIndex)}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default Siders;
