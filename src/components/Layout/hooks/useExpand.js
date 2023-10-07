import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const useExpand = () => {
  const { setBackup, setSiders, backup } = useLayout();

  return () => {
    setBackup([]);
    setSiders(
      produce(backup, (draft) => {
        draft = [];
        return draft;
      })
    );
  };
};

export default useExpand;
