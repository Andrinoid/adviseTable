import React, { forwardRef, useContext } from "react";
import { DraggableElm } from "./styled";
import { Draggable } from "react-beautiful-dnd";
import { DataContext } from "../Grid";
import { getRowId } from "../hooks";

export default function DraggableContainer({
  draggableId,
  index,
  breakpoint,
  children,
}) {
  const { colId, isResizing } = useContext(DataContext);

  const dragging = draggableId == colId;

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
          displayFlex={colId === draggableId && isResizing}
          betweenDroppables={getRowId(colId) !== getRowId(draggableId)}
        >
          {children(draggableProvided.dragHandleProps, dragging)}
        </DraggableElement>
      )}
    </Draggable>
  );
}

// Do not allow transform on dragelement between sections
const DraggableElement = forwardRef(
  ({ children, betweenDroppables = false, ...rest }, ref) => {
    if (betweenDroppables) {
      return (
        <DraggableElm {...rest} ref={ref} style={{}}>
          {children}
        </DraggableElm>
      );
    }
    return (
      <DraggableElm {...rest} ref={ref}>
        {children}
      </DraggableElm>
    );
  }
);
