import React from 'react';
import produce from 'immer';

import useLayout from './useLayout';

const usePopSider = () => {
  const { siders, setSiders, setDrawers, drawers } = useLayout();

  return (index = null) => {
    setSiders((previous) =>
      produce(previous, (draft) => {
        if (!index && typeof index != 'number') {
          draft.pop();
        } else {
          if (Array.isArray(draft)) {
            draft = draft.slice(0, index);
          }
        }

        if (drawers.length > 0) {
          setDrawers([]);
        }

        return draft;
      }),
    );
  };
};

export default usePopSider;
