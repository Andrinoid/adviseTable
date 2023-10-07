import React, { useContext } from "react";

import { LayoutContext } from "../LayoutContext";

const useLayout = () => {
  return useContext(LayoutContext);
};

export default useLayout;
