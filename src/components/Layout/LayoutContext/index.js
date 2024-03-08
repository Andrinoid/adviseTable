import React, { createContext, useEffect, useState } from 'react';
import getOS from '../utils/getOS';

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [backup, setBackup] = useState([]);
  const [siders, setSiders] = useState([]);
  const [drawers, setDrawers] = useState(null);
  const [links, setLinks] = useState([]);
  const [mobile, setMobile] = useState(false);

  let navbars = siders.slice();

  if (mobile && drawers) {
    navbars.push(drawers);
  }

  useEffect(() => {
    function handleResize() {
      const os = getOS();

      if (window.innerWidth < 768 || os === 'ios' || os === 'android') {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        siders: navbars,
        setSiders,
        backup,
        setBackup,
        drawers,
        setDrawers,
        links,
        setLinks,
        mobile,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, LayoutContext };
