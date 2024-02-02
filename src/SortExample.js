import React, { useState } from "react";
import { SortableView } from "./components/Sortable";

function SortExample() {
  const [list, setList] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const onDropCallback = (fromIndex, toIndex) => {
    const newList = [...list];
    const item = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, item[0]);
    setList(newList);
  };
  return (
    // Your JSX code goes here
    <div>
      <SortableView draggable={true} onDropCallback={onDropCallback}>
        {list.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </SortableView>
    </div>
  );
}

export default SortExample;
