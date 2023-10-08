import React from "react";
import { produce } from "immer";

import useLayout from "./useLayout";

const useStackSider = () => {
  const { siders, setSiders } = useLayout();

  return (index, component) => {
    if (siders[index]) {
      setSiders(
        produce(siders, (draft) => {
          draft[index].push(component);

          return draft;
        })
      );
    }
  };
};

export default useStackSider;
