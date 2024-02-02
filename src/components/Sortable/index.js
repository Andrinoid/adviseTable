import { element } from "prop-types";
import React from "react";

function SortableView({ draggable, children }) {
  const [childElements, setChildElements] = React.useState([]);
  const [fromIndex, setFromIndex] = React.useState(null);

  const onDragstart = (e) => {
    // console.log("dragstart", e.target);
    // const key = e.target.getAttribute("data-draggablekey");
    // console.log("key", key);
    childElements.findIndex((element, index) => {
      if (element.current === e.target) {
        setFromIndex(index);
      }
    });
  };

  const onDrop = (e) => {
    // e.preventDefault();
    // const data = e.dataTransfer.getData("text/plain");
    // const movedElement = childElements[data].current;
    // const target = e.target;
    // target.after(movedElement);

    cancelDefault(e);

    // get new and old index
    const dragged = childElements[fromIndex].current;
    const parent = dragged.parentNode;
    const toIndex = Array.from(parent.children).indexOf(dragged);

    // // remove dropped items at old place
    // let dropped = $(this).parent().children().eq(oldIndex).remove();
    let dropped = parent.children[fromIndex];
    parent.removeChild(dropped);

    // // insert the dropped items at new place
    if (toIndex < fromIndex) {
      dragged.before(dropped);
    } else {
      dragged.after(dropped);
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
        const elementRef = React.createRef();
        const element = (
          <div
            ref={elementRef}
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
        childElements.push(elementRef);
        return element;
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
