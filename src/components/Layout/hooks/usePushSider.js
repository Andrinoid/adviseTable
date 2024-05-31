import React from 'react';
import { produce } from 'immer';
import useLayout from './useLayout';

const usePushSider = () => {
  const { siders, setSiders, setDrawers, drawers } = useLayout();

  const pushSider = (value, reset = false, options = {}) => {
    setSiders((previous) => {
      const updatedSiders = produce(previous, (draft) => {
        if (reset) {
          return [[{ options, value }]];
        }

        const exists = siders.some(
          (sider) =>
            sider[0] &&
            sider[0].value &&
            sider[0].value(0).type === value(0).type &&
            sider[0].value(0).props.name === value(0).props.name,
        );

        if (!exists) {
          draft.push([{ options, value }]);
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
