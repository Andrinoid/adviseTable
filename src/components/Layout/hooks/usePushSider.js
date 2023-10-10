import React from "react";
import { produce } from "immer";
import useLayout from "./useLayout";

const usePushSider = () => {
  const { siders, setSiders, setDrawers } = useLayout();

  return (value) => {
    const exists = siders.some(
      (sider) =>
        sider[0] &&
        sider[0](0).type === value(0).type &&
        JSON.stringify(sider[0](0).props) === JSON.stringify(value(0).props)
    );

    if (!exists) {
      const updatedSiders = produce(siders, (draft) => {
        draft.push([value]);
      });

      setSiders(updatedSiders);
      setDrawers([]);
    }
  };
};

export default usePushSider;
