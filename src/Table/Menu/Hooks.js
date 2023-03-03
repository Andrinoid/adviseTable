import React, { useRef, useEffect, useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { utils, writeFile } from "xlsx-js-style";

export function HandleControllerExecution(controller, tableId) {
  let lastPageX = useRef(null);
  let lastPageY = useRef(null);

  const execute = useCallback(
    (position) => {
      if (lastPageX.current !== lastPageX || lastPageY.current !== lastPageY) {
        controller.execute(position.pageX, position.pageY);

        lastPageX.current = position.pageX;
        lastPageY.current = position.pageY;
      }
    },
    [lastPageX, lastPageY, controller.menu, controller.viewport, tableId]
  );

  useEffect(() => {
    const container = document.querySelector(`#${tableId}-container`);

    function handleContextMenu(e) {
      e.preventDefault();

      setTimeout(() => {
        
        execute({
          pageX: e.pageX,
          pageY: e.pageY,
        });
      }, 80);
    }

    container.addEventListener("contextmenu", handleContextMenu);
  }, [execute, tableId]);
}

export function HandleExporting() {
  const downloadExcelFile = useCallback((tableMatrix, headerData) => {
    const textHeader = headerData.map((col) => {
      return {
        v: col.title,
        t: "s",
        s: {
          font: {
            bold: true,
            color: { rgb: "000000" },
          },
          fill: {
            fgColor: { rgb: "fafafa" },
          },
          alignment: {
            wrapText: true,
            horizontal: "right",
            vertical: "center",
          },
        },
      };
    });

    const textMatrix = tableMatrix.map((row) => {
      return row.map((cell) => {
        return cell.current.innerText;
      });
    });

    textMatrix.unshift(textHeader);

    const workbook = utils.book_new();
    const sheet = utils.aoa_to_sheet(textMatrix);
    utils.book_append_sheet(workbook, sheet, "Sheet1");
    writeFile(workbook, "example.xlsx", { bookType: "xlsx", type: "buffer" });
  }, []);

  return function (tableMatrix, headerData) {
    downloadExcelFile(tableMatrix, headerData);
  };
}

export function HandlePositioning(controller) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  controller.setPosition = null;
  controller.setPosition = setPosition;

  return [{...position}, setPosition];
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
