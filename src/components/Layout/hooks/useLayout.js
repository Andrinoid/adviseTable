import React, { useContext } from "react";
import { LayoutContext } from "../LayoutContext";

const useLayout = () => {
  const { siders, setSiders } = useContext(LayoutContext);

  return [siders, setSiders];
};

export default useLayout;
