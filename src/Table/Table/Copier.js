import copy from "copy-to-clipboard";
import { getContainedArea } from "./SelectedAreas";

let _table;
let _selections;

const options = { format: "text/plain" };

export class Copier {
  constructor(table, selections) {
    _table = table;
    _selections = selections;
  }

  copy() {
    const result = this.stringifyTable();

    if (result != "") copy(result, options);
  }

  stringifyTable() {
    let result = "";

    if (_selections.length === 1) {
      _table.forEach((row, rowIndex) => {
        let rowResult = this.stringifyRow(row, rowIndex);

        if (rowResult.length > 2) {
          result += rowResult + "\n";
        }
      });
    }

    return result;
  }

  stringifyRow(rows, rowIndex) {
    let rowResult = "";

    rows.forEach((cell, colIndex) => {
      let containedArea = getContainedArea(_selections, {
        x: colIndex,
        y: rowIndex,
      });

      if (containedArea && !containedArea.isExclusion) {
        rowResult += _table[rowIndex][colIndex].current.innerText;

        if (colIndex < this.rowLength()) rowResult += "\t";
      }
    });

    return rowResult;
  }

  rowLength() {
    let result = _selections[0].toX - _selections[0].fromX;
    if (_selections[0].fromX != 0) result += 1;
    return result;
  }
}
