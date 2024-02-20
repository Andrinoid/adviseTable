import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Mask } from './styles';
import useLayout from '../../hooks/useLayout';
import PropTypes from 'prop-types';
import useControls from '../../hooks';

const MotionMask = motion(Mask);

const Drawer = () => {
  const { drawers } = useLayout();
  const controls = useControls();

  const slideInAnimation = {
    initial: { x: '-50px' }, // Start off-screen to the left
    animate: { x: 0 }, // End at x: 0, which is the normal position
    //exit: { opacity: 0 }, // You can adjust this for exit animation
    transition: { type: 'linear', duration: 0.2 }, // Customizable transition
  };

  return (
    <AnimatePresence>
      {drawers.length > 0 ? (
        <>
          <Container
            className="layout-drawer"
            style={{
              zIndex: 1001,
              height: '100%',
              width: '100%',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              key={`${drawers.length - 1}`}
              {...slideInAnimation}
              //exit={{ opacity: 0 }}
              style={{
                zIndex: 10,
                height: '100%',
                width: '100%',
              }}
            >
              {drawers[drawers.length - 1]}
            </motion.div>
          </Container>
          <MotionMask
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            //exit={{ opacity: 0 }}
            transition={{ type: 'linear', duration: 0.2 }}
            onClick={() => {
              controls.popDrawer();
            }}
            onTouchStart={() => {
              controls.popDrawer();
            }}
          />
        </>
      ) : null}
    </AnimatePresence>
  );
};

Drawer.propTypes = {
  width: PropTypes.number,
};

export default Drawer;
