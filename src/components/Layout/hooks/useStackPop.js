import React from "react";
import { produce } from "immer";

import useLayout from "./useLayout";

const useStackPop = () => {
  const { siders, setSiders, setDrawers } = useLayout();

  return (index) => {
    if (siders[index] && siders[index].length > 1) {
      setSiders(
        produce(siders, (draft) => {
          draft[index].pop();

          setDrawers([]);

          return draft;
        })
      );
    }
  };
};

export default useStackPop;
