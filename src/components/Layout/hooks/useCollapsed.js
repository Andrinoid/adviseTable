import React from "react";

import useLayout from "./useLayout";

const useCollapsed = () => {
  const { backup } = useLayout();

  return backup.length > 0;
};

export default useCollapsed;
