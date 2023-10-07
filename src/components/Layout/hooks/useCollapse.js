import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const useCollapse = () => {
  const { setBackup, setSiders, siders } = useLayout();

  return () => {
    setBackup(siders);
    setSiders(
      produce(siders, (draft) => {
        draft = [];
        return draft;
      })
    );
  };
};

export default useCollapse;
