import React from "react";
import useLayout from "../../hooks/useLayout";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "antd";

const Siders = ({ children }) => {
  const { siders } = useLayout();

  const transition = {
    duration: 0.1,
  };

  return (
    <>
      {children}
      <AnimatePresence>
        {siders.map((sider, siderIndex) => {
          const containsPrevious = sider.length > 1;

          const previous = containsPrevious
            ? sider[sider.length - 2](siderIndex)
            : null;

          const current = sider[sider.length - 1](siderIndex);

          return (
            <motion.div
              key={`${siderIndex}`}
              transition={{ ...transition, ease: "easeIn" }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              style={{ position: "relative" }}
            >
              {/* These code here ensures that when stacking, the stacked element
            kindof fadein overlaying the previous element. But these doesnt happens
            when adding a siderbar, only when stacking on the sidebar */}
              {previous}

              <motion.div
                key={`${sider.length - 1}`}
                transition={
                  containsPrevious
                    ? { ...transition, duration: 0.1 }
                    : transition
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={
                  containsPrevious
                    ? {
                        height: "100%",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: 9,
                      }
                    : { height: "100%", zIndex: 9 }
                }
              >
                {current}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default Siders;
