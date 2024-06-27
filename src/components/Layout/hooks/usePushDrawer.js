import React from 'react';
import produce from 'immer';

import useLayout from './useLayout';

const usePushDrawer = () => {
  const { setDrawers, siders, clear } = useLayout();
  return (component, root = false) => {
    if (root) {
      setTimeout(() => {
        setDrawers((previous) =>
          produce(previous, (draft) => {
            draft.push(component);

            return draft;
          }),
        );

        setDrawers((previous) => {
          if (previous.length == 0 || previous.length <= 2) return previous;
          return previous.filter((_, i) => i != 0 && previous.length - 1 == i);
        });
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
