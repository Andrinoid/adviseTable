import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const usePushDrawer = () => {
  const { drawers, setDrawers } = useLayout();

  return (component) => {
    setDrawers(
      produce(drawers, (draft) => {
        draft = [component];

        return draft;
      })
    );
  };
};

export default usePushDrawer;
