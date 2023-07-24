import { v4 as uuidv4 } from "uuid";

export function useSectionCRUD(data, setData) {
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

  return {
    addRow,
    removeRow,
  };
}
