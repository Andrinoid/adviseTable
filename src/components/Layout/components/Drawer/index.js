import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Mask } from './styles';
import useLayout from '../../hooks/useLayout';
import PropTypes from 'prop-types';
import useControls from '../../hooks';
import useSmallScreen from '../../hooks/useSmallScreen';
import usePlatform from '../../hooks/usePlatform';

const MotionMask = motion(Mask);

const Drawer = ({ onDrawerMaskClick }) => {
  const { drawers } = useLayout();
  const controls = useControls();

  const slideInAnimation = {
    initial: { x: '-50px' }, // Start off-screen to the left
    animate: { x: 0 }, // End at x: 0, which is the normal position
    //exit: { opacity: 0 }, // You can adjust this for exit animation
    transition: { type: 'linear', duration: 0.2 }, // Customizable transition
  };

  const smallScreen = useSmallScreen();
  const platform = usePlatform();
  return (
    <AnimatePresence>
      {drawers.length > 0 ? (
        <>
          <Container
            smallScreen={smallScreen}
            platform={platform}
            className="layout-drawer"
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
          {!smallScreen ? (
            <MotionMask
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              //exit={{ opacity: 0 }}
              transition={{ type: 'linear', duration: 0.2 }}
              onClick={onDrawerMaskClick}
              onTouchStart={onDrawerMaskClick}
            />
          ) : null}
        </>
      ) : null}
    </AnimatePresence>
  );
};

Drawer.propTypes = {
  width: PropTypes.number,
};

export default Drawer;
