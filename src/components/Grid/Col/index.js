import React, { forwardRef } from "react";
import { Resizable } from "react-resizable";
import { Column, Inner, Toolbar, ToolbarItem, DraggableElm } from "./styled";
import "react-resizable/css/styles.css";
import { Draggable } from "react-beautiful-dnd";
import DragHandle from "../../../icons/DragHandle";
import Plus from "../../../icons/Plus";
import { DataContext } from "../Grid";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Cursor } from "../Section/styled";

function Col({
  width,
  index,
  columnId,
  rowId,
  onResize,
  sectionRef,
  isLast,
  children,
  breakpoint,
}) {
  const { colId, data, setData, maxCols, minWidth, setColId } =
    useContext(DataContext);

  function addColumn(rowId, columnId) {
    const rowIndex = data.findIndex((row) => row.rowId === rowId);

    if (data[rowIndex].columns.length < maxCols) {
      const result = [...data];
      const rowIndex = result.findIndex((row) => row.rowId === rowId);

      const row = { ...result[rowIndex] };

      const columnIndex = row.columns.findIndex((c) => c.columnId === columnId);

      row.columns.splice(columnIndex + 1, 0, {
        columnId: uuidv4(),
        data: [{}],
        width: 1 / row.columns.length + 1,
      });

      result[rowIndex] = { ...row };

      setData([...result]);
    }
  }

  function removeColumn(rowId, columnId) {
    const result = [...data];

    const rowIndex = result.findIndex((row) => row.rowId === rowId);

    result[rowIndex].columns = result[rowIndex].columns.filter(
      (c) => c.columnId !== columnId
    );

    result[rowIndex].columns = result[rowIndex].columns.map((c) => {
      c.width = 1 / result[rowIndex].columns.length;
      return c;
    });

    setData([...result]);
  }

  const draggableId = rowId + "_" + columnId;

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
          isResizing={colId === draggableId}
          styled={colId !== draggableId}
        >
          {isLast ? (
            <Column
              $isDragging={draggableId == colId}
              style={{
                width: width * sectionRef.current?.offsetWidth || 0,
                flex: width * sectionRef.current?.offsetWidth || 0,
                height: "100%",
              }}
              breakpoint={breakpoint}
            >
              <Toolbar className="grid-toolbar">
                <ToolbarItem {...draggableProvided.dragHandleProps}>
                  {" "}
                  <DragHandle />
                </ToolbarItem>
                <Cursor type="pointer">
                  <ToolbarItem
                    onClick={() => {
                      addColumn(rowId, columnId);
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
              </Toolbar>

              <Inner>{children}</Inner>
            </Column>
          ) : (
            <Resizable
              key={index}
              width={width * (sectionRef.current?.offsetWidth || 0)}
              height={100} // Add a fixed height here
              onResizeStart={(event, data) => {
                setColId(draggableId);
              }}
              onResizeStop={(event, data) => {
                setColId(null);
              }}
              onResize={(event, data) => onResize(index, event, data)}
              resizeHandles={["se"]}
              minConstraints={[minWidth]} // Set minimum width in pixels
            >
              <Column
                $isDragging={draggableId == colId}
                style={{
                  width: width * sectionRef.current?.offsetWidth || 0,
                  flex: width * sectionRef.current?.offsetWidth || 0,
                  height: "100%",
                }}
                breakpoint={breakpoint}
              >
                <Toolbar className="grid-toolbar">
                  <ToolbarItem {...draggableProvided.dragHandleProps}>
                    {" "}
                    <DragHandle />
                  </ToolbarItem>
                  <Cursor type="pointer">
                    <ToolbarItem
                      onClick={() => {
                        addColumn(rowId, columnId);
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
                </Toolbar>
                <Inner>{children}</Inner>
              </Column>
            </Resizable>
          )}
        </DraggableElement>
      )}
    </Draggable>
  );
}

const DraggableElement = forwardRef(
  ({ children, styled = false, ...rest }, ref) => {
    if (styled) {
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

export default Col;
