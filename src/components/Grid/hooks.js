import { produce } from "immer";
import { v4 as uuid } from "uuid";

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
      rowId: uuid(),
      columns: [
        {
          columnId: uuid(),
          width: 1,
          data: [
            {
              id: uuid(),
            },
          ],
        },
      ],
    };

    setData((data) =>
      produce(data, (draft) => {
        // console.log(JSON.stringify(draft));
        const index = draft.findIndex((row) => row.rowId === rowId);
        if (index === -1) {
          draft.push(newRow);
        } else {
          draft.splice(index, 0, newRow);
        }
      })
    );
  }

  function removeRow(rowId) {
    setData((data) =>
      produce(data, (draft) => {
        const index = draft.findIndex((row) => row.rowId === rowId);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      })
    );
  }

  function addColumn(rowId, columnId) {
    setData((data) =>
      produce(data, (draft) => {
        const rowIndex = draft.findIndex((row) => row.rowId === rowId);
        if (rowIndex !== -1 && draft[rowIndex].columns.length < maxCols) {
          const row = draft[rowIndex];

          const columnIndex = row.columns.findIndex(
            (c) => c.columnId === columnId
          );

          if (columnIndex !== -1) {
            row.columns.splice(columnIndex + 1, 0, {
              columnId: uuid(),
              data: [{ id: uuid() }],
              width: 1 / (row.columns.length + 1),
            });

            row.columns.forEach((c) => {
              c.width = 1 / row.columns.length;
            });
          }
        }
      })
    );
  }

  function removeColumn(rowId, columnId) {
    setData((data) =>
      produce(data, (draft) => {
        const rowIndex = draft.findIndex((row) => row.rowId === rowId);

        if (rowIndex !== -1) {
          const row = draft[rowIndex];
          row.columns = row.columns.filter((c) => c.columnId !== columnId);

          row.columns.forEach((c) => {
            c.width = 1 / row.columns.length;
          });

          if (row.columns.length === 0) {
            draft.splice(rowIndex, 1);
          }
        }
      })
    );
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
  let maximumWidth = maxWidth(index, widths, minimumWidth);

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

export function maxWidth(index, widths, minimumWidth) {
  let maximumWidth = 0,
    i = index + 1;
  for (; i < widths.length; i++) {
    maximumWidth += widths[i] - minimumWidth;
  }
  maximumWidth += widths[index];
  return maximumWidth;
}

export function snap(totalWidth, size, x, range = 0.2) {
  const breakpoints = getBreakpoints(totalWidth);

  const w = totalWidth / breakpoints.length;

  // console.log("w", w);
  const pixels = w * range;
  // 200 * 0.2 = 40

  const closestFromX = breakpoints.reduce((prev, curr) => {
    return Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev;
  });

  if (closestFromX !== x) {
    if (Math.abs(closestFromX - x) <= pixels) {
      if (x < closestFromX) {
        size.width += closestFromX - x;
      } else {
        size.width -= x - closestFromX;
      }
    }
  }

  return size;
}

export function getBreakpoints(totalWidth) {
  const cols = 6;
  const w = totalWidth / cols;
  const breakpoints = Array.from({ length: cols }).map((_, i) => (i + 1) * w);
  return breakpoints;
}

export function copyColumn(layout, columnId) {
  return produce(layout, (draft) => {
    for (let i = 0; i < draft.length; i++) {
      const section = draft[i];

      for (let j = 0; j < section.columns.length; j++) {
        const column = section.columns[j];

        if (column.columnId === columnId) {
          const newColumn = {
            ...column,
            columnId: uuid(),
            data: column.data.map((item) => ({
              ...item,
              id: uuid(),
            })),
          };

          draft[i].columns.splice(j + 1, 0, newColumn);

          draft[i].columns = draft[i].columns.map((c) => ({
            ...c,
            width: 1 / draft[i].columns.length,
          }));

          return;
        }
      }
    }
  });
}
