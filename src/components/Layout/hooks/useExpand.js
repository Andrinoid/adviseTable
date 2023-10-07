import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const useExpand = () => {
  const { setBackup, setSiders, backup } = useLayout();

  return () => {
    setSiders(backup);

    setBackup([]);
  };
};

export default useExpand;
