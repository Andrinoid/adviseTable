import React, { useContext } from 'react';
import { TableContext } from '../../TableContext';

const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

export default useTableContext;
