import React from "react";

import useLayout from "./useLayout";

const useCollapsed = () => {
  const { backup, siders } = useLayout();

  return backup.length > 0 || siders.length == 0;
};

export default useCollapsed;
