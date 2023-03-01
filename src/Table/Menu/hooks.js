import React, { useRef } from "react";

export function useMenuController(gateway) {
  let lastClientX = useRef(null);
  let lastClientY = useRef(null);

  return (position) => {
    if (
      lastClientX.current !== lastClientX ||
      lastClientY.current !== lastClientY
    ) {
      gateway.updatePosition(position.clientX, position.clientY);

      lastClientX.current = position.clientX;
      lastClientY.current = position.clientY;
    }
  };
}
