import React, { forwardRef } from "react";
import { Column, Inner, Toolbar, ToolbarItem, DraggableElm } from "./styled";
import "react-resizable/css/styles.css";
import { Draggable } from "react-beautiful-dnd";
import DragHandle from "../../../icons/DragHandle";
import Plus from "../../../icons/Plus";
import { DataContext } from "../Grid";
import { useContext } from "react";
import { Cursor } from "../Section/styled";
import { copyColumn, getRowId, useController } from "../hooks";
import { debounce } from "lodash";
import Copy from "../../../icons/Copy";

function Col({
  width,
  index,
  columnId,
  rowId,
  sectionRef,
  children,
  breakpoint,
}) {
  const { colId, data, setData, maxCols, isResizing, editing } =
    useContext(DataContext);
  const { addColumn, removeColumn } = useController(data, setData, maxCols);

  const draggableId = rowId + "_" + columnId;

  const debouncedAdd = debounce(() => addColumn(rowId, columnId), 300);

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
          <Column
            id={"col_" + columnId}
            $isDragging={draggableId == colId}
            style={{
              width: width * sectionRef.current?.offsetWidth || 0,
              flex: width * sectionRef.current?.offsetWidth || 0,
              height: "100%",
            }}
            breakpoint={breakpoint}
            editing={editing}
          >
            {editing && (
              <Toolbar className="grid-toolbar">
                <ToolbarItem {...draggableProvided.dragHandleProps}>
                  {" "}
                  <DragHandle />
                </ToolbarItem>
                <Cursor type="pointer">
                  <ToolbarItem
                    onClick={() => {
                      debouncedAdd();
                    }}
                  >
                    <Plus />
                  </ToolbarItem>
                </Cursor>
                <Cursor type="pointer">
                  <ToolbarItem
                    onClick={() => {
                      removeColumn(rowId, columnId);
                    }}
                  >
                    <Plus style={{ transform: "rotate(45deg)" }} />
                  </ToolbarItem>
                </Cursor>
                <Cursor type="pointer">
                  <ToolbarItem
                    onClick={() => {
                      setData(copyColumn(data, columnId));
                    }}
                  >
                    <Copy style={{ fontSize: "0.7em" }} />
                  </ToolbarItem>
                </Cursor>
              </Toolbar>
            )}

            <Inner>{children}</Inner>
          </Column>
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
