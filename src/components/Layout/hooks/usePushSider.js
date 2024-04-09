import React from 'react';
import { produce } from 'immer';
import useLayout from './useLayout';

const usePushSider = () => {
  const { siders, setSiders, setDrawers, drawers } = useLayout();

  const pushSider = (value, reset = false) => {
    setSiders((previous) => {
      const updatedSiders = produce(previous, (draft) => {
        if (reset) {
          return [[value]];
        }

        const exists = siders.some(
          (sider) =>
            sider[0] &&
            sider[0](0).type === value(0).type &&
            sider[0](0).props.name === value(0).props.name,
        );

        if (!exists) {
          draft.push([value]);
        }

        return draft;
      });

      return updatedSiders;
    });

    if (drawers.length > 0) {
      setDrawers([]);
    }
  };

  return pushSider;
};

export default usePushSider;
