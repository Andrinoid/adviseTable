import React from 'react';

function SortableView({ draggable, children, onDropCallback }) {
  const [fromIndex, setFromIndex] = React.useState(null);

  const onDragstart = (e) => {
    const key = e.target.getAttribute('data-draggablekey');
    setFromIndex(key);
  };

  const onDrop = (e) => {
    cancelDefault(e);
    // alert(`Moved from ${fromIndex} to ${e.currentTarget.dataset.draggablekey}`);
    if (onDropCallback) {
      onDropCallback(fromIndex, e.currentTarget.dataset.draggablekey);
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

export { SortableView };

// let items = document.querySelectorAll('#items-list > li')

// items.forEach(item => {
//   $(item).prop('draggable', true)
//   item.addEventListener('dragstart', dragStart)
//   item.addEventListener('drop', dropped)
//   item.addEventListener('dragenter', cancelDefault)
//   item.addEventListener('dragover', cancelDefault)
// })

// function dragStart (e) {
//   var index = $(e.target).index()
//   e.dataTransfer.setData('text/plain', index)
// }

// function dropped (e) {
//   cancelDefault(e)

//   // get new and old index
//   let oldIndex = e.dataTransfer.getData('text/plain')
//   let target = $(e.target)
//   let newIndex = target.index()

//   // remove dropped items at old place
//   let dropped = $(this).parent().children().eq(oldIndex).remove()

//   // insert the dropped items at new place
//   if (newIndex < oldIndex) {
//     target.before(dropped)
//   } else {
//     target.after(dropped)
//   }
// }

// function cancelDefault (e) {
//   e.preventDefault()
//   e.stopPropagation()
//   return false
// }
