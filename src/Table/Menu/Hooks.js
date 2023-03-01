import React, { useRef, useEffect, useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function HandlePositioning(controller) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  controller.setPosition = setPosition;

  return [position, setPosition];
}

export function HandleDevtoolsOpening(controller) {
  useHotkeys("f12", controller.close, {
    enabled: true,
    preventDefault: false,
  });
}

export function HandleMenuItems(menuComponent, children, controller) {
  const [items, setItems] = useState(null);

  function getItemsFrom(children) {
    const subComponentList = Object.keys(menuComponent);

    return subComponentList.map((key) => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return child.type.name === key ? child : null;
        }
        return null;
      });
    });
  }

  useEffect(() => {
    if (items && children && items.length !== children.length) {
      setTimeout(() => {
        setItems(getItemsFrom(children));
      }, controller.duration * 3);
    } else {
      setItems(getItemsFrom(children));
    }
  }, [items, children]);

  return items;
}

export function HandleMenuOpening(controller) {
  const [className, setClassName] = useState(null);

  useEffect(() => {
    if (controller.isOpen) {
      setTimeout(() => {
        setClassName("open");
      }, 1);
    } else {
      setTimeout(() => {
        setClassName("close");
      }, 1);
    }
  }, [controller.isOpen]);

  return className;
}

export function HandleControllerExecution(controller) {
  let lastClientX = useRef(null);
  let lastClientY = useRef(null);

  const execute = useCallback(
    (position) => {
      if (
        lastClientX.current !== lastClientX ||
        lastClientY.current !== lastClientY
      ) {
        controller.execute(position.clientX, position.clientY);

        lastClientX.current = position.clientX;
        lastClientY.current = position.clientY;
      }
    },
    [lastClientX, lastClientY, controller.menu, controller.viewport]
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
