import React from "react";
import produce from "immer";

import useLayout from "./useLayout";
import useClear from "./useClear";

const usePushDrawer = () => {
  const { drawers, setDrawers, siders } = useLayout();
  const clear = useClear();

  return (component, root = false) => {
    if (siders.length > 0 && root) {
      clear();
      setTimeout(() => {
        setDrawers(
          produce(drawers, (draft) => {
            draft = [component];

            return draft;
          })
        );
      }, 200);
    } else {
      setDrawers(
        produce(drawers, (draft) => {
          draft = [component];

          return draft;
        })
      );
    }
  };
};

export default usePushDrawer;
