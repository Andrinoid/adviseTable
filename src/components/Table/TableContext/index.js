import React, { createContext, useState, useEffect } from 'react';

const TableContext = createContext();

const TableProvider = ({ children }) => {
  // Use an object to track each table's state separately
  const [tables, setTables] = useState({});

  const registerTable = (tableId, initialState) => {
    setTables((prev) => ({ ...prev, [tableId]: initialState }));
  };

  const setTableViewPortWidth = (tableId, width) => {
    setTables((prev) => ({
      ...prev,
      [tableId]: { ...prev[tableId], tableViewportWidth: width },
    }));
  };

  const setTableTotalWidth = (tableId, width) => {
    setTables((prev) => ({
      ...prev,
      [tableId]: { ...prev[tableId], tableTotalWidth: width },
    }));
  };

  const getTableViewPortWidth = (tableId) => {
    return tables[tableId]?.tableViewportWidth || 0;
  };

  const getTableTotalWidth = (tableId) => {
    return tables[tableId]?.tableTotalWidth || 0;
  };

  const value = {
    tables,
    registerTable,
    setTableViewPortWidth,
    setTableTotalWidth,
    getTableViewPortWidth,
    getTableTotalWidth,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export { TableProvider, TableContext };
