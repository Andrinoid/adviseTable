import React from 'react';
import produce from 'immer';

import useLayout from './useLayout';

const usePushDrawer = () => {
  const { setDrawers, siders } = useLayout();

  return (component, root = false) => {
    if (siders.length > 0 && root) {
      setTimeout(() => {
        setDrawers((previous) =>
          produce(previous, (draft) => {
            draft.push(component);

            return draft;
          }),
        );
        setTimeout(() => {
          setDrawers((prev) => prev.filter((_, i) => i != prev.length - 1));
        }, 200);
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
