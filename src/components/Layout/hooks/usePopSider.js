import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const usePopSider = () => {
  const { siders, setSiders, setDrawers } = useLayout();

  return (index) => {
    setSiders(
      produce(siders, (draft) => {
        if (!index && typeof index != "number") {
          draft.pop();
        } else {
          if (Array.isArray(draft)) {
            draft = draft.slice(0, index);
          }
        }

        setDrawers([]);

        return draft;
      })
    );
  };
};

export default usePopSider;
