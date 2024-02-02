import React, { useState, useCallback } from 'react';

function SortableView({ draggable, children, onOrderChange }) {
  const [fromIndex, setFromIndex] = useState(null);

  const onDragStart = useCallback((e) => {
    const key = parseInt(e.target.getAttribute('data-draggablekey'), 10);
    setFromIndex(key);
  }, []);

  const onDrop = useCallback((e) => {
    cancelDefault(e)
    const toIndex = parseInt(e.currentTarget.dataset.draggablekey, 10);
    if (typeof onOrderChange === 'function') {
      onOrderChange(fromIndex, toIndex);
    }
    setFromIndex(null); // Reset fromIndex after drop
  }, [fromIndex, onOrderChange]);

  const cancelDefault = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div
          draggable={draggable}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDragOver={cancelDefault}
          key={index}
          data-draggablekey={index}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default SortableView;
