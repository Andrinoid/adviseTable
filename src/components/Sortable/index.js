import React, { useState, useCallback } from 'react';

function SortableView({
  draggable,
  children,
  onOrderChange,
  onBeforeDragStart,
}) {
  const [fromIndex, setFromIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const onDragStart = useCallback((e) => {
    if (onBeforeDragStart) {
      onBeforeDragStart();
    }
    const key = parseInt(e.target.getAttribute('data-draggablekey'), 10);
    setFromIndex(key);
  }, []);

  const onDragEndCapture = useCallback(() => {
    setHoverIndex(null);
  });

  const onDragOver = useCallback(
    (e) => {
      cancelDefault(e);
      const overIndex = parseInt(e.currentTarget.dataset.draggablekey, 10);
      if (overIndex !== hoverIndex) {
        setHoverIndex(overIndex);
      }
    },
    [hoverIndex],
  );

  const onDrop = useCallback(
    (e) => {
      cancelDefault(e);
      const toIndex = parseInt(e.currentTarget.dataset.draggablekey, 10);
      // if (fromIndex === toIndex) return;

      if (typeof onOrderChange === 'function') {
        onOrderChange(fromIndex, toIndex);
      }
      //Reset states after drop
      setFromIndex(null);
      setHoverIndex(null);
    },
    [fromIndex, onOrderChange],
  );

  const cancelDefault = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const indicatorStyle = {
    height: '2px',
    backgroundColor: 'blue',
    margin: '4px 0',
  };

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <>
          <div
            draggable={draggable}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEndCapture={onDragEndCapture}
            key={index}
            data-draggablekey={index}
          >
            {child}
          </div>
          {hoverIndex === index && (
            <div
              style={indicatorStyle}
              data-draggablekey={`indicator-${index}`}
            ></div>
          )}
        </>
      ))}
    </div>
  );
}

export default SortableView;
