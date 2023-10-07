import React from "react";

import useLayout from "./useLayout";

const useCollapse = () => {
  const { setBackup, setSiders, siders } = useLayout();

  return () => {
    setBackup(siders);
    setSiders([]);
  };
};

export default useCollapse;
