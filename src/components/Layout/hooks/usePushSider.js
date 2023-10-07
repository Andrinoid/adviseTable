import React from "react";
import { produce } from "immer";
import useLayout from "./useLayout";

const usePushSider = () => {
  const { siders, setSiders } = useLayout();

  return (value) => {
    setSiders(
      produce(siders, (draft) => {
        draft = [...draft, [value]];

        return draft;
      })
    );
  };
};

export default usePushSider;
