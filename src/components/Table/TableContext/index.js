import React, { createContext, useState } from 'react';

const TableContext = createContext();

const TableProvider = ({ children }) => {
  const [tableViewportWidth, setTableViewPortWidth] = useState(0);
  const [tableTotalWidth, setTableTotalWidth] = useState(0);
  const [tableId, setTableId] = useState(0);
  return (
    <TableContext.Provider
      value={{
        tableViewportWidth,
        setTableViewPortWidth,
        tableTotalWidth,
        setTableTotalWidth,
        tableId,
        setTableId,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableProvider, TableContext };
