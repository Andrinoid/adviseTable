import React, { useEffect } from "react";
import { getContainedArea } from "./SelectedAreas";

let _table;
let _selections;

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
          const previousColspan =
            _table[i][j - 1]?.current?.getAttribute("data-colspan");

          if (colspan != null) {
            let originalColspan = colspan;

            if (j === 0 || previousColspan == null) {
              originalColspan = colspan - 1;
            }

            for (let k = 0; k < originalColspan; k++) {
              result += "\t";
            }

            result += element.innerText;

            j += colspan - 1;
            continue;
          }

          if (previousColspan != null) {
            result += "\t";
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
}

export default function useCopier(tableMatrix, selectedAreas) {
  useEffect(() => {
    function handleCopy(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "c") {
        console.log(JSON.stringify(selectedAreas));
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
