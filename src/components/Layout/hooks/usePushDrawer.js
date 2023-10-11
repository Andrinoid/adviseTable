import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const usePushDrawer = () => {
  const { drawers, setDrawers, setWidth } = useLayout();

  return (component, width) => {
    if (width) {
      setWidth(width);
    }

    setDrawers(
      produce(drawers, (draft) => {
        draft = [component];

        return draft;
      })
    );
  };
};

export default usePushDrawer;
