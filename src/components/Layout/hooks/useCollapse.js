import React from 'react';

import useLayout from './useLayout';

const useCollapse = () => {
  const { setBackup, setSiders, siders, setDrawers } = useLayout();

  return () => {
    setDrawers(null);
    setBackup(siders);
    setSiders([]);
  };
};

export default useCollapse;
