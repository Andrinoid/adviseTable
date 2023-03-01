import React, { useRef, useEffect, useCallback } from "react";

export function useMenuController(gateway) {
  let lastClientX = useRef(null);
  let lastClientY = useRef(null);

  const execute = useCallback(
    (position) => {
      if (
        lastClientX.current !== lastClientX ||
        lastClientY.current !== lastClientY
      ) {
        gateway.updatePosition(position.clientX, position.clientY);

        lastClientX.current = position.clientX;
        lastClientY.current = position.clientY;
      }
    },
    [lastClientX, lastClientY, gateway]
  );

  useEffect(() => {
    const container = document.querySelector("#container");

    function handleContextMenu(e) {
        e.preventDefault();
        execute({
            clientX: e.clientX,
            clientY: e.clientY,
        });
    }

    container.addEventListener("contextmenu", handleContextMenu);
  }, [execute]);
}
