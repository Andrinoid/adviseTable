import React from 'react';
import produce from 'immer';

import useLayout from './useLayout';
import useClear from './useClear';

const usePushDrawer = () => {
  const { setDrawers, siders } = useLayout();
  const clear = useClear();

  return (component, root = false) => {
    if (siders.length > 0 && root) {
      clear();
      setTimeout(() => {
        setDrawers((previous) =>
          produce(previous, (draft) => {
            draft.push(component);

            return draft;
          }),
        );
      }, 200);
    } else {
      setDrawers((previous) =>
        produce(previous, (draft) => {
          draft.push(component);

          return draft;
        }),
      );
    }
  };
};

export default usePushDrawer;
