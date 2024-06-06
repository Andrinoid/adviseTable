import React from 'react';
import produce from 'immer';

import useLayout from './useLayout';

const usePushDrawer = () => {
  const { setDrawers, siders, clear } = useLayout();
  return (component, root = false) => {
    if (siders.length > 0 && root) {
      setTimeout(() => {
        setDrawers((previous) =>
          produce(previous, (draft) => {
            draft.push(component);

            return draft;
          }),
        );
      }, 200);
      setDrawers((prev) => {
        if (prev.length == 0 || prev.length == 1) return prev;
        return prev.filter((_, i) => i != 0);
      });
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
