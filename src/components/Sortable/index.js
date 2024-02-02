import React from 'react';

function SortableView({ draggable, children, onOrderChange }) {
  const [fromIndex, setFromIndex] = React.useState(null);

  const onDragstart = (e) => {
    const key = e.target.getAttribute('data-draggablekey');
    setFromIndex(key);
  };

  const onDrop = (e) => {
    cancelDefault(e);
    // alert(`Moved from ${fromIndex} to ${e.currentTarget.dataset.draggablekey}`);
    if (onOrderChange) {
      onOrderChange(fromIndex, e.currentTarget.dataset.draggablekey);
    }
  };

  const onDragEnter = (e) => {
    cancelDefault(e);
  };

  const onDragOver = (e) => {
    cancelDefault(e);
  };

  const cancelDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div>
      {React.Children.map(children, (child, index) => {
        return (
          <div
            draggable={draggable}
            onDragStart={onDragstart}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            key={index}
            data-draggablekey={index}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

export default SortableView;
