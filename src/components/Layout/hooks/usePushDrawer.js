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
    } else {
      setDrawers((previous) =>
        produce(previous, (draft) => {
          draft.push(component);

          return draft;
        }),
      );
    }

    setTimeout(() => {
      setDrawers((previous) => {
        if (previous.length == 0 || previous.length == 1) return previous;
        return previous.filter((_, i) => i != 0);
      });
    }, 210);
  };
};

export default usePushDrawer;
