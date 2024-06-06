import React from 'react';
import produce from 'immer';

import useLayout from './useLayout';

const usePushDrawer = () => {
  const { setDrawers, siders } = useLayout();

  return (component, root = false) => {
    if (siders.length > 0 && root) {
      setDrawers([]);
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
