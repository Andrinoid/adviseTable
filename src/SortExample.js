import React from "react";
import { SortableView, SortableItem } from "./components/Sortable";

const list = ["Item 1", "Item 2", "Item 3", "Item 4"];

function SortExample() {
  return (
    // Your JSX code goes here
    <div>
      <SortableView draggable={true}>
        {list.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </SortableView>
    </div>
  );
}

export default SortExample;
