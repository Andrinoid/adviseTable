import React from "react";

import useCollapse from "./useCollapse";
import useCollapsed from "./useCollapsed";
import useExpand from "./useExpand";
import usePopDrawer from "./usePopDrawer";
import usePopSider from "./usePopSider";
import usePushDrawer from "./usePushDrawer";
import usePushSider from "./usePushSider";
import useStackPop from "./useStackPop";
import useStackPush from "./useStackPush";
import useLayout from "./useLayout";

const useControls = () => {
  const collapse = useCollapse();
  const collapsed = useCollapsed();
  const expand = useExpand();
  const popDrawer = usePopDrawer();
  const popSider = usePopSider();
  const pushDrawer = usePushDrawer();
  const pushSider = usePushSider();
  const stackPop = useStackPop();
  const stackPush = useStackPush();
  const layout = useLayout();

  return {
    collapse,
    collapsed,
    expand,
    popDrawer,
    popSider,
    pushDrawer,
    pushSider,
    stackPop,
    stackPush,
    ...layout,
  };
};

export default useControls;
