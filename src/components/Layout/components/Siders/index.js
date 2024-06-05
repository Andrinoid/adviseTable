import React, { useEffect, useState } from 'react';
import useLayout from '../../hooks/useLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Sheet } from 'react-modal-sheet';
import useControls from '../../hooks';

const snapPoints = [-80, 0.45, 80];

function ModelSheetContainer({ sheet, openAt = 'middle', onClose, children }) {
  const { siders, popSider } = useControls();
  const [open, setOpen] = useState(false);
  const [initialSnap, setInitialSnap] = useState(0);

  if (!sheet) {
    return children;
  }

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

  return (
    <Sheet
      isOpen={open}
      onClose={() => {
        popSider(0);
        onClose && onClose();
      }}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
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

          console.log('currentOptions', currentOptions);

          return (
            <ModelSheetContainer
              sheet={currentOptions.sheet}
              openAt={currentOptions.openAt}
              onClose={currentOptions.onClose}
              initialSnap={currentOptions?.initialSnap}
            >
              <motion.div
                key={`${siderIndex}`}
                transition={{ ...transition, ease: 'easeIn' }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                style={{ position: 'relative' }}
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
              </motion.div>
            </ModelSheetContainer>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default Siders;
