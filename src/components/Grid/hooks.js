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

export function compute(values, index, size, offsetWidth, minWidth) {
  const widths = values.map((w) => w * 100);
  const minimumWidth = (minWidth / offsetWidth) * 100;

  let maximumWidth = 0,
    i = index + 1;
  for (; i < widths.length; i++) {
    maximumWidth += widths[i] - minimumWidth;
  }
  maximumWidth += widths[index];

  let newWidth = (size.width / offsetWidth) * 100;

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

  return widths.map((w) => w / 100);
}
