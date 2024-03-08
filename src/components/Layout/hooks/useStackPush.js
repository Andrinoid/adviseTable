import React from 'react';
import { produce } from 'immer';

import useLayout from './useLayout';

const useStackPush = () => {
  const { siders, setSiders, setDrawers, drawers } = useLayout();

  return (index, component) => {
    if (siders[index]) {
      setSiders(
        produce(siders, (draft) => {
          draft[index].push(component);

          if (drawers.length > 0) {
            setDrawers(null);
          }

          return draft;
        }),
      );
    }
  };
};

export default useStackPush;
