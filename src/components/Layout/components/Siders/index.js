import React from "react";
import useLayout from "../../hooks/useLayout";

const Siders = ({ children }) => {
  const [siders] = useLayout();
  return (
    <>
      {children}

      {siders.map((sider) => {
        return <>{sider}</>;
      })}
    </>
  );
};

export default Siders;
