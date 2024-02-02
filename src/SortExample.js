import React from "react";
import { SortableView, SortableItem } from "./components/Sortable";

function SortExample() {
    return (
        // Your JSX code goes here
        <div>
            <SortableView draggable={true}>
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
                <div>Item 5</div>
                <div>Item 6</div>
            </SortableView>
        </div>
    );
}

export default SortExample;
