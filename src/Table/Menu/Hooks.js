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

    let uniqueElements = getUniqueElementsTable(tableMatrix);


    const adjustedLabels = getAdjustedLabelRowsTable(uniqueElements, headerData);
    
    const textMatrix = adjustedLabels.filter(row => row[0].current != null).map((row) => {
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

function getAdjustedLabelRowsTable(uniqueElements, headerData) {
  const adjustedLabels = [];
  const validAttributes = ['data-rowtype', 'data-spanselection', 'type', 'data-selectable', 'class', 'style'];

  uniqueElements.forEach((row, uniqueIndex) => {
    if (row.length == headerData.length) {
      adjustedLabels[uniqueIndex] = row;
    } else {
      adjustedLabels[uniqueIndex] = [];

      for (let i = 0; i < headerData.length && row.length > 0; i++) {
        const cell = row.find((cell) => cell.current.dataset.x == i);
        if (cell) {
          adjustedLabels[uniqueIndex][i] = cell;
        } else {
          const previous = adjustedLabels[uniqueIndex][i - 1].current;
          const newElement = document.createElement(previous.tagName);
          newElement.setAttribute('x', i);
          newElement.setAttribute('data-x', i);
          newElement.setAttribute('id', 'x' + i + 'y' + previous.getAttribute('y'));
          newElement.setAttribute('y', previous.getAttribute('y'));
          newElement.setAttribute('data-y', previous.getAttribute('data-y'));
          newElement.setAttribute('innerText', '');

          validAttributes.filter(attribute => attribute).forEach((attribute) => {
            newElement.setAttribute(attribute, previous.getAttribute(attribute));
          });

          adjustedLabels[uniqueIndex][i] = { current: newElement };
        }
      }
    }
  });
  return adjustedLabels
}

function getUniqueElementsTable(tableMatrix) {
  let uniqueElements = [];
  tableMatrix.forEach((row, index) => {
    uniqueElements[index] = row.filter((element, index) => {
      return row.indexOf(element) === index;
    });
  });
  return uniqueElements;
}

export function HandlePositioning(controller) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  controller.setPosition = null;
  controller.setPosition = setPosition;

  return [{ ...position }, setPosition];
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
    setItems(getItemsFrom(children));
  }, [children]);

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
