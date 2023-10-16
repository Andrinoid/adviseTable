import React, { useEffect, useState } from "react";
import useControls from "../../hooks";

const SiderItems = ({ children, besides, ...rest }) => {
  const { drawers, siders, links } = useControls();
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (drawers.length == 0 && siders.length == 0 && links.length == 0) {
      setActive(null);
    }
  }, [siders, drawers, links]);

  console.log(active);
  return (
    <div {...rest}>
      {React.Children.map(children, (child) => {
        const obj = {
          onClick: () => {
            setActive(child.props.id);

            if (child.props.onClick) {
              child.props.onClick();
            }
            // }
          },
          active: child.props.id && child.props.id === active,
        };

        return React.cloneElement(child, obj);
      })}
    </div>
  );
};

export default SiderItems;
