import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "./styles";
import useLayout from "../../hooks/useLayout";
import PropTypes from "prop-types";

const Drawer = () => {
  const { drawers } = useLayout();

  return (
    <AnimatePresence>
      {drawers.length > 0 ? (
        <Container style={{ zIndex: 10 }}>
          <motion.div
            key={`${drawers.length - 1}`}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 10 }}
          >
            {drawers[drawers.length - 1]}
          </motion.div>
        </Container>
      ) : null}
    </AnimatePresence>
  );
};

Drawer.propTypes = {
  width: PropTypes.number,
};

export default Drawer;
