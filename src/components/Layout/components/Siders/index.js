import React, { useEffect, useState, useRef } from 'react';
import useLayout from '../../hooks/useLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Sheet } from 'react-modal-sheet';
import useControls from '../../hooks';
import styled from 'styled-components';

const StyledSheetHeader = styled(Sheet.Header)`
  margin-top: -39px;
  .react-modal-sheet-drag-indicator {
    background: #333 !important;
  }
`;

const snapPoints = [-80, 0.6, 150];

function ModelSheetContainer({
  sheet,
  openAt = 'middle',
  onClose,
  siderIndex,
  transition,
  children,
}) {
  const { siders, popSider } = useControls();
  const [open, setOpen] = useState(false);
  const [initialSnap, setInitialSnap] = useState(0);
  const sheetRef = useRef();

  const slideInAnimation = {
    initial: { x: '-50px' }, // Start off-screen to the left
    animate: { x: 0 }, // End at x: 0, which is the normal position
    //exit: { opacity: 0 }, // You can adjust this for exit animation
    transition: { type: 'linear', duration: 0.2 }, // Customizable transition
  };

  useEffect(() => {
    if (siders.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [siders]);

  useEffect(() => {
    if (openAt === 'top') {
      setInitialSnap(0);
    } else if (openAt === 'middle') {
      setInitialSnap(1);
    } else if (openAt === 'bottom') {
      setInitialSnap(2);
    }
  }, [openAt]);

  if (!sheet) {
    return (
      <motion.div
        key={`${siderIndex}`}
        transition={{ ...transition, ease: 'easeIn' }}
        {...slideInAnimation}
        style={{ position: 'relative', zIndex: 50 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Sheet
      ref={sheetRef}
      isOpen={open}
      onClose={() => {
        popSider(0);
        onClose && onClose();
      }}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
    >
      <Sheet.Container>
        <StyledSheetHeader />
        {/* <div>
          header content before scroll container
        </div> */}
        <Sheet.Content style={{ paddingBottom: sheetRef.current?.y }}>
          <Sheet.Scroller draggableAt="both">{children}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}

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

          const currentOptions = sider[sider.length - 1].options;
          const current = sider[sider.length - 1].value(siderIndex);

          return (
            <ModelSheetContainer
              sheet={currentOptions.sheet}
              openAt={currentOptions.openAt}
              onClose={currentOptions.onClose}
              initialSnap={currentOptions?.initialSnap}
              siderIndex={siderIndex}
              transition={transition}
              key={siderIndex}
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
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 9,
                      }
                    : { height: '100%', zIndex: 9 }
                }
              >
                {current}
              </motion.div>
            </ModelSheetContainer>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default Siders;
