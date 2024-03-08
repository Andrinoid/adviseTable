import React from 'react';
import useLayout from './useLayout';

const useClear = () => {
  const { setLinks, links, setDrawers, drawers, setSiders, siders } =
    useLayout();

  return () => {
    if (links.length > 0) setLinks([]);

    if (siders.length > 0) setSiders([]);

    if (drawers) setDrawers(null);
  };
};

export default useClear;
