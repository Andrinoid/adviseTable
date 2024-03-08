import React from 'react';
import { produce } from 'immer';

import useLayout from './useLayout';

const useStackPop = () => {
  const { siders, setSiders, setDrawers, drawers } = useLayout();

  return (index) => {
    if (siders[index] && siders[index].length > 1) {
      setSiders(
        produce(siders, (draft) => {
          draft[index].pop();

          if (drawers.length > 0) {
            setDrawers(null);
          }

          return draft;
        }),
      );
    }
  };
};

export default useStackPop;
