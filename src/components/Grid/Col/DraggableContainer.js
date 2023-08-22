import React, { forwardRef } from "react";
import { DraggableElm } from "./styled";
import { Draggable } from "react-beautiful-dnd";
import { DataContext } from "../Grid";
import { useContext } from "react";
import { getRowId } from "../hooks";

export default function DraggableContainer({
  draggableId,
  index,
  breakpoint,
  children,
}) {
  const { colId, isResizing } = useContext(DataContext);
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(draggableProvided) => (
        <DraggableElement
          style={{ height: "100%" }}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          $isDragging={draggableId == colId} //Only for styling. This is not part of dnd
          breakpoint={breakpoint}
          showHoverHandler={colId === null || colId === draggableId}
          isResizing={colId === draggableId && isResizing}
          styled={getRowId(colId) !== getRowId(draggableId)}
        >
          {children(draggableProvided.dragHandleProps, draggableId == colId)}
        </DraggableElement>
      )}
    </Draggable>
  );
}

// Do not allow transform on dragelement between rows
const DraggableElement = forwardRef(
  ({ children, styled = false, isResizing, ...rest }, ref) => {
    if (styled) {
      return (
        <DraggableElm {...rest} isResizing={isResizing} ref={ref} style={{}}>
          {children}
        </DraggableElm>
      );
    }
    return (
      <DraggableElm {...rest} ref={ref} isResizing={isResizing}>
        {children}
      </DraggableElm>
    );
  }
);
