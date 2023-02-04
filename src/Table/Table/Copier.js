import React, { useEffect } from "react";
import { getContainedArea } from "./SelectedAreas";

let _table;
let _selections;

const options = { format: "text/plain" };
/**
 * TODO
 * 1. Solve the problem of the colspan between normal cells copying the wrong value
 */
export class Copier {
  constructor(table, selections) {
    _table = table;
    _selections = selections;
  }

  copy() {
    const result = this.stringifyTable();

    if (result != "") navigator.clipboard.writeText(result);
  }

  stringifyTable() {
    let result = "",
      minY,
      minX,
      maxY,
      maxX;

    _selections.forEach((sel) => {
      if (minY != null) {
        minY = Math.min(minY, sel.fromY, sel.toY);
      } else {
        minY = Math.min(sel.fromY, sel.toY);
      }

      if (maxY != null) {
        maxY = Math.max(maxY, sel.fromY, sel.toY);
      } else {
        maxY = Math.max(sel.fromY, sel.toY);
      }

      if (minX != null) {
        minX = Math.min(minX, sel.fromX, sel.toX);
      } else {
        minX = Math.min(sel.fromX, sel.toX);
      }

      if (maxX != null) {
        maxX = Math.max(maxX, sel.fromX, sel.toX);
      } else {
        maxX = Math.max(sel.fromX, sel.toX);
      }
    });

    for (let i = minY; i <= maxY; i++) {
      for (let j = minX; j <= maxX; j++) {
        if (getContainedArea(_selections, { x: j, y: i }) != null) {
          const element = _table[i][j].current;
          const colspan = element.getAttribute("data-colspan");

          if (colspan != null) {
            let actualColspan = colspan;

            if (j === 0) {
              actualColspan = colspan - 1;
            }

            for (let k = 0; k < actualColspan; k++) {
              result += "\t";
            }
            result += element.innerText;
            j += colspan - 1;
            continue;
          }

          result += element.innerText;
        } else {
          result += " ";
        }

        if (j < maxX) {
          result += "\t";
        }
      }

      result += "\n";
    }

    return result;
  }

  // mockTable() {
  //   const newTable = [];
  //   for (let i = 0; i < _table.length; i++) {
  //     newTable.push([]);

  //     for (let j = 0; j < _table[i].length; j++) {
  //       if (_table[i][j].current) {
  //         newTable[i].push({
  //           current: {
  //             innerText: `${_table[i][j].current.innerText}`,
  //             getAttribute(attr) {
  //               if ("data-colspan") {
  //                 return this.colspan;
  //               }
  //               return null;
  //             },
  //             colspan: _table[i][j].current.getAttribute("data-colspan"),
  //           },
  //         });
  //       } else {
  //         newTable[0].push(null);
  //       }
  //     }
  //   }
  // }
}

export default function useCopier(tableMatrix, selectedAreas) {
  useEffect(() => {
    function handleCopy(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "c") {
        // console.log(JSON.stringify(selectedAreas));
        const copier = new Copier(tableMatrix, selectedAreas);
        copier.copy();
      }
    }

    window.addEventListener("keydown", handleCopy);

    return () => {
      window.removeEventListener("keydown", handleCopy);
    };
  }, [tableMatrix, selectedAreas]);
}
