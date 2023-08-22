import React, { useEffect, useRef } from "react";
import { Column, Inner } from "./styled";
import "react-resizable/css/styles.css";
import { DataContext } from "../Grid";
import { useContext } from "react";
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
  const { editing } = useContext(DataContext);
  const resizableRef = useRef(null);

  useEffect(() => {
    if (resizableRef.current) {
      resizableRef.current?.initializeHandle();
    }
  }, [width]);

  return (
    <DraggableContainer
      breakpoint={breakpoint}
      draggableId={rowId + "_" + columnId}
      index={index}
    >
      {(dragHandleProps, dragging) => (
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
            $isDragging={dragging}
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
                dragHandleProps={dragHandleProps}
                rowId={rowId}
                columnId={columnId}
              />
            )}

            <Inner>{children}</Inner>
          </Column>
        </Resizable>
      )}
    </DraggableContainer>
  );
}

export default Col;
