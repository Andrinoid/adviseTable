import React, { useCallback } from 'react';
import { utils, writeFile } from 'xlsx';

export function HandleExporting() {
  const downloadExcelFile = useCallback((tableMatrix, headerData) => {
    const textHeader = headerData.map((col) => {
      return {
        v: col.title,
        t: 's',
        s: {
          font: {
            bold: true,
            color: { rgb: '000000' },
          },
          fill: {
            fgColor: { rgb: 'fafafa' },
          },
          alignment: {
            wrapText: true,
            horizontal: 'right',
            vertical: 'center',
          },
        },
      };
    });

    const handler = new TableMatrixHandler(tableMatrix);

    const textMatrix = handler.getAdjustedRows(headerData.length);
    textMatrix.unshift(textHeader);
    const workbook = utils.book_new();
    const sheet = utils.aoa_to_sheet(textMatrix);
    utils.book_append_sheet(workbook, sheet, 'Sheet1');

    // Save the file
    writeFile(workbook, 'advise.xlsx');
  }, []);

  return function (tableMatrix, headerData) {
    downloadExcelFile(tableMatrix, headerData);
  };
}

class TableMatrixHandler {
  constructor(tableMatrix) {
    this.matrix = tableMatrix;
  }

  uniqueElementsMatrix() {
    return this.matrix.map((r) => r.filter((c, i) => r.indexOf(c) === i));
  }

  getAdjustedRows(length) {
    return this.uniqueElementsMatrix()
      .map((r) => (r.length == length ? r : this.labelRow(length, r)))
      .filter((r) => r[0].current != null)
      .map((r) =>
        r.map((c, i) => {
          const value =
            c.current.getAttribute('data-value') || c.current.innerText;
          return {
            v: value,
            t: Number.isNaN(+value) ? 's' : 'n',
          };
        }),
      );
  }

  labelRow(length, row) {
    if (row.length == 0) return row.length > 0;

    const result = [];
    for (let i = 0; i < length; i++) {
      const c = row.find((c) => c.current.dataset.x == i);
      if (c) result[i] = c;
      else {
        result[i] = this.makeElementFrom(result[i - 1].current, i);
      }
    }

    return result;
  }

  makeElementFrom(previous, position) {
    const VALID_ATTRIBUTES = [
      'data-rowtype',
      'data-spanselection',
      'type',
      'data-selectable',
      'class',
      'style',
    ];

    const newElement = document.createElement(previous.tagName);
    newElement.setAttribute('x', position);
    newElement.setAttribute('data-x', position);
    newElement.setAttribute(
      'id',
      'x' + position + 'y' + previous.getAttribute('y'),
    );
    newElement.setAttribute('y', previous.getAttribute('y'));
    newElement.setAttribute('data-y', previous.getAttribute('data-y'));
    newElement.setAttribute('innerText', '');

    VALID_ATTRIBUTES.forEach((attribute) => {
      newElement.setAttribute(attribute, previous.getAttribute(attribute));
    });

    return { current: newElement };
  }
}
