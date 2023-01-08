import React, { useState } from 'react';
import Example from './Example';

export const App = () => {
  const [tableTheme, setTableTheme] = useState('light');
  const [draggable, setDraggable] = useState(false);
  const [autoAdjustTrigger, setAutoAdjustTrigger] = useState(0);
  const [selectionMode, setSelectionMode] = useState('cell');
  const [footerVissible, setFooterVissible] = useState(true);
  const [headerOffset] = useState(0);

  return (
          <Example
            theme={tableTheme}
            draggable={draggable}
            autoAdjustTrigger={autoAdjustTrigger}
            selectionMode={selectionMode}
            footerVissible={footerVissible}
            headerOffset={headerOffset}
          />
  );
};