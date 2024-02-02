import React from "react";

function SortableView({ draggable, children }) {
    const onDragstart = (e) => {
        console.log("dragstart", e.target);
        const key = e.target.getAttribute("data-draggablekey");
        console.log("key", key);
        e.dataTransfer.setData("text/plain", key);
    };

    const onDrop = (e) => {
        console.log("drop", e.target);
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        console.log("data", data);
        const target = e.target;
        target.appendChild(document.getElementById(data));
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
