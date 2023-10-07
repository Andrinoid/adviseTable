import React from "react";
import useLayout from "../../hooks/useLayout";

const Siders = ({ children }) => {
  const { siders } = useLayout();

  return (
    <>
      {children}

      {siders.map((sider, siderIndex) => {
        return <>{sider[sider.length - 1](siderIndex)}</>;
      })}
    </>
  );
};

export default Siders;
