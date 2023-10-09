import React from "react";
import { produce } from "immer";

import useLayout from "./useLayout";

const usePushSider = () => {
  const { siders, setSiders, setDrawers } = useLayout();

  return (value) => {
    setSiders(
      produce(siders, (draft) => {
        draft = [...draft, [value]];

        setDrawers([]);

        return draft;
      })
    );
  };
};

export default usePushSider;
