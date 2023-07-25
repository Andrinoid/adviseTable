import { v4 as uuidv4 } from "uuid";

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
