import React, { forwardRef, useEffect, useRef } from "react";
import { Column, Inner, DraggableElm } from "./styled";
import "react-resizable/css/styles.css";
import { Draggable } from "react-beautiful-dnd";
import { DataContext } from "../Grid";
import { useContext } from "react";
import { getRowId } from "../hooks";
import Resizable from "../Resizable";
import Toolbar from "./Toolbar";

function Col({
  width,
  index,
  columnId,
  rowId,
  children,
  breakpoint,
  totalWidth,
  onResizeStart,
  onResizeEnd,
  onResize,
  resizeable,
}) {
  const { colId, isResizing, editing } = useContext(DataContext);
  const resizableRef = useRef(null);

  const draggableId = rowId + "_" + columnId;

  useEffect(() => {
    if (resizableRef.current) {
      resizableRef.current?.initializeHandle();
    }
  }, [width]);

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
          <Resizable
            ref={resizableRef}
            key={index}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
            onResize={onResize}
            enabled={resizeable}
          >
            <Column
              id={"col_" + columnId}
              $isDragging={draggableId == colId}
              style={{
                width: (width || 0) * totalWidth,
                flex: (width || 0) * totalWidth,
                height: "100%",
              }}
              breakpoint={breakpoint}
              editing={editing}
            >
              {editing && (
                <Toolbar
                  dragHandleProps={draggableProvided.dragHandleProps}
                  rowId={rowId}
                  columnId={columnId}
                />
              )}

              <Inner>{children}</Inner>
            </Column>
          </Resizable>
        </DraggableElement>
      )}
    </Draggable>
  );
}

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

export default Col;
