import { min } from "lodash";
import { v4 as uuidv4 } from "uuid";

export const getRowId = (draggableId) => {
  if (!draggableId) return draggableId;
  return draggableId.split("_")[0];
};

export const getColumnId = (draggableId) => {
  if (!draggableId) return draggableId;
  return draggableId.split("_")[1];
};

export function useController(data, setData, maxCols) {
  function addRow(rowId) {
    const newRow = {
      rowId: uuidv4(),
      columns: [
        {
          columnId: uuidv4(),
          width: 1,
          data: [{}],
        },
      ],
    };

    const newData = [...data];

    const index = newData.findIndex((row) => row.rowId === rowId);

    if (index === -1) {
      newData.push(newRow);
    } else {
      newData.splice(index, 0, newRow);
    }

    setData(newData);
  }

  function removeRow(rowId) {
    const newData = [...data];

    const index = newData.findIndex((row) => row.rowId === rowId);

    newData.splice(index, 1);

    setData(newData);
  }

  function addColumn(rowId, columnId) {
    const rowIndex = data.findIndex((row) => row.rowId === rowId);

    if (data[rowIndex].columns.length < maxCols) {
      const result = [...data];
      const rowIndex = result.findIndex((row) => row.rowId === rowId);

      const row = { ...result[rowIndex] };

      const columnIndex = row.columns.findIndex((c) => c.columnId === columnId);

      row.columns.splice(columnIndex + 1, 0, {
        columnId: uuidv4(),
        data: [{}],
        width: 1 / row.columns.length + 1,
      });

      result[rowIndex] = { ...row };

      setData([...result]);
    }
  }

  function removeColumn(rowId, columnId) {
    const result = [...data];

    const rowIndex = result.findIndex((row) => row.rowId === rowId);

    result[rowIndex].columns = result[rowIndex].columns.filter(
      (c) => c.columnId !== columnId
    );
    result[rowIndex].columns = result[rowIndex].columns.map((c) => {
      c.width = 1 / result[rowIndex].columns.length;
      return c;
    });

    setData([...result]);
  }

  return {
    addRow,
    removeRow,
    addColumn,
    removeColumn,
  };
}

export function compute(dimensions) {
  const { widths, minWidth, size } = dimensions;

  if (size.width >= minWidth) {
    increasing(dimensions);
  } else {
    // decrease previous columns when below minimum width and increase next columns
    // for (let i = index - 1; i >= 0; i--) {
    //   const result = widths[i] - newWidth;
    //   if (result >= minimumWidth) {
    // }
    decreasing(dimensions);
  }

  return widths.map(toFloat);
}

function decreasing(dimensions) {
  const { widths, minimumWidth, index, size, offsetWidth } = dimensions;
  let newWidth = toInterger(size.width / offsetWidth);
  if (index > 0) {
    widths[index + 1] += widths[index] - minimumWidth;
    widths[index] = minimumWidth;

    for (let i = index - 1; i >= 0; i--) {
      if (widths[i] >= minimumWidth) {
        widths[i] -= minimumWidth - newWidth;
        widths[index + 1] += minimumWidth - newWidth;
        return;
      }
    }
  }
}

export class Dimensions {
  constructor(widths, index, size, minWidth, offsetWidth) {
    this.widths = widths.map(toInterger);
    this.index = index;
    this.size = size;
    this.minWidth = minWidth;
    this.offsetWidth = offsetWidth;
    this.minimumWidth = toInterger(minWidth / offsetWidth);
  }
}

const toInterger = (v) => v * 100;
const toFloat = (v) => v / 100;

function increasing({ index, widths, minimumWidth, size, offsetWidth }) {
  let maximumWidth = 0,
    i = index + 1;
  for (; i < widths.length; i++) {
    maximumWidth += widths[i] - minimumWidth;
  }
  maximumWidth += widths[index];

  let newWidth = toInterger(size.width / offsetWidth);

  if (newWidth >= maximumWidth) {
    newWidth -= newWidth - maximumWidth;
  }
  let diff = newWidth - widths[index];

  widths[index] = newWidth;

  for (let i = index + 1; i < widths.length; i++) {
    if (widths[i] >= minimumWidth) {
      if (diff <= widths[i] - minimumWidth) {
        widths[i] -= diff;
        break;
      } else {
        const temp = widths[i] - minimumWidth;
        widths[i] -= temp;
        diff -= temp;
      }
    }
  }
}

export function snap(totalWidth, size) {
  const cols = 6;
  const w = totalWidth / cols;
  const breakpoints = Array.from({ length: cols }).map((_, i) => (i + 1) * w);
  const twentyPercent = w * 0.2;
  const closestFromW = breakpoints.reduce((prev, curr) => {
    return Math.abs(curr - size.width) < Math.abs(prev - size.width)
      ? curr
      : prev;
  });

  if (closestFromW !== size.width) {
    if (Math.abs(closestFromW - size.width) < twentyPercent) {
      size.width = closestFromW;
    }
  }

  return size;
}
