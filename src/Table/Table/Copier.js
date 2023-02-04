import React, { useEffect } from "react";
import { getContainedArea } from "./SelectedAreas";

let _table;
let _selections;

const options = { format: "text/plain" };
/**
 * TODO
 * 1. Solve the problem of the colspan between normal cells copying the wrong value
 */
class Copier {
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

    let length = maxX - minX;

    if (minX != 0) length += 1;

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

        if (j < length) {
          result += "\t";
        }
      }

      result += "\n";
    }

    return result;
  }
}

export default function useCopier(tableMatrix, selectedAreas) {
  useEffect(() => {
    function handleCopy(event) {
      if (event.ctrlKey && event.key === "c") {
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
