import React from 'react';

import useCollapse from './useCollapse';
import useCollapsed from './useCollapsed';
import useExpand from './useExpand';
import usePopDrawer from './usePopDrawer';
import usePopSider from './usePopSider';
import usePushDrawer from './usePushDrawer';
import usePushSider from './usePushSider';
import useStackPop from './useStackPop';
import useStackPush from './useStackPush';
import useLayout from './useLayout';
import useClear from './useClear';

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
  const clear = useClear();

  return new Controls({
    collapse,
    collapsed,
    expand,
    popDrawer,
    popSider,
    pushDrawer,
    pushSider,
    stackPop,
    stackPush,
    clear,
    ...layout,
  });
};

class Controls {
  constructor(obj) {
    this.collapse = obj.collapse || (() => {});
    this.collapsed = obj.collapsed || false;
    this.expand = obj.expand || (() => {});
    this.popDrawer = obj.popDrawer || (() => {});
    this.popSider = obj.popSider || ((index = null) => {});
    this.pushDrawer = obj.pushDrawer || ((component, width) => {});
    this.pushSider = obj.pushSider || ((value, reset = null) => {});
    this.stackPop = obj.stackPop || ((index) => {});
    this.stackPush = obj.stackPush || ((index, component) => {});
    this.clear = obj.clear || (() => {});
    this.siders = obj.siders || [];
    this.setSiders = obj.setSiders || (() => {});
    this.backup = obj.backup || [];
    this.setBackup = obj.setBackup || (() => {});
    this.drawers = obj.drawers || [];
    this.setDrawers = obj.setDrawers || (() => {});
    this.width = obj.width || [];
    this.setWidth = obj.setWidth || (() => {});
    this.links = obj.links || [];
    this.setLinks = obj.setLinks || (() => {});
    this.mobile = obj.mobile;
  }
}

export default useControls;
