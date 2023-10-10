import React from "react";
import produce from "immer";

import useLayout from "./useLayout";

const usePopAllSiders = () => {
  const { setSiders } = useLayout();

  return () => {
    setSiders([]);
  };
};

export default usePopAllSiders;
