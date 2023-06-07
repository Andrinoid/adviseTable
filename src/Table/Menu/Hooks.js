import React, { useRef, useEffect, useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { utils, write } from "xlsx-js-style";
import { TableMatrixHandler } from './Utils.js'

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
      const openElements = document.querySelectorAll('.menu-container div.open');
      const element = document.querySelector(`#${tableId}-menu`);

      if (openElements.length == 0 ||
        (openElements.length == 1 && element.classList.contains('open'))
      ) {
        setTimeout(() => {
          execute({
            pageX: e.pageX,
            pageY: e.pageY,
          });
        }, 80);
      }
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

    const handler = new TableMatrixHandler(tableMatrix);

    const textMatrix = handler.getAdjustedRows(headerData.length);
    textMatrix.unshift(textHeader);
    const workbook = utils.book_new();
    const sheet = utils.aoa_to_sheet(textMatrix);
    utils.book_append_sheet(workbook, sheet, "Sheet1");

    // Generate XLSX file as Blob
    const wbout = write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    let url = window.URL.createObjectURL(file);
    let w = window.open(url);
  }, []);

  return function (tableMatrix, headerData) {
    downloadExcelFile(tableMatrix, headerData);
  };
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