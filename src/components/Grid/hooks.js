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

export function compute(widths, index, size, offsetWidth, minWidth) {
  const temp = [...widths].map((w) => w * 100);
  const minWidthPercent = (minWidth / offsetWidth) * 100;

  let max = 0,
    i = index + 1;
  for (; i < temp.length; i++) {
    if (temp[i] > minWidthPercent) {
      max += temp[i] - minWidthPercent;
    }
  }
  max += temp[index];

  let newWidth = (size.width / offsetWidth) * 100;

  if (newWidth > max) {
    newWidth = max;
  }

  let diff = newWidth - temp[index];

  temp[index] = newWidth;

  for (let i = index + 1; i < temp.length; i++) {
    if (temp[i] > minWidthPercent) {
      if (diff <= temp[i] - minWidthPercent) {
        temp[i] -= diff;
        break;
      } else {
        const remain = temp[i] - minWidthPercent;
        temp[i] -= remain;
        diff -= remain;
      }
    }
  }

  return temp.map((w) => w / 100);
}
