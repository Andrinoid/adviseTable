import React from "react";
import { produce } from "immer";

import useLayout from "./useLayout";

const usePushSider = () => {
  const { siders, setSiders, setDrawers } = useLayout();

  return (value) => {
    setSiders(
      produce(siders, (draft) => {
        const exists = siders.some(
          (sider) => sider[0] && sider[0](0).type === value(0).type
        );

        if (!exists) {
          draft = [...draft, [value]];

          setDrawers([]);
        }

        return draft;
      })
    );
  };
};

export default usePushSider;
