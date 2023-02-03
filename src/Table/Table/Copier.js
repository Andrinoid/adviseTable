import React, { useEffect } from "react";
import copy from "copy-to-clipboard";
import { getContainedArea } from "./SelectedAreas";

let _table;
let _selections;

const options = { format: "text/plain" };

class Copier {
  constructor(table, selections) {
    _table = table;
    _selections = selections;
  }

  copy() {
    const result = this.stringifyTable();

    if (result != "") copy(result, options);
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
          result += _table[i][j].current.innerText;
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

    document.addEventListener("keydown", handleCopy);

    return () => {
      document.removeEventListener("keydown", handleCopy);
    };
  }, [tableMatrix, selectedAreas]);
}
