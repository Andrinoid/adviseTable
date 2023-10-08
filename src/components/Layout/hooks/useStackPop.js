import React from "react";
import { produce } from "immer";

import useLayout from "./useLayout";

const useStackPop = () => {
  const { siders, setSiders } = useLayout();

  return (index) => {
    if (siders[index] && siders[index].length > 1) {
      setSiders(
        produce(siders, (draft) => {
          draft[index].pop();

          return draft;
        })
      );
    }
  };
};

export default useStackPop;
