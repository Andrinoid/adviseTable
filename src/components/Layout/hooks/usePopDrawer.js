import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const usePopDrawer = () => {
  const { drawers, setDrawers } = useLayout();

  return () => {
    setDrawers(
      produce(drawers, (draft) => {
        draft.pop();

        return draft;
      })
    );
  };
};

export default usePopDrawer;
