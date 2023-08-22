import React, { useContext } from "react";
import { Toolbar, ToolbarItem } from "./styled";
import DragHandle from "../../../icons/DragHandle";
import Plus from "../../../icons/Plus";
import { Cursor } from "../Section/styled";
import { copyColumn, useController } from "../hooks";
import Copy from "../../../icons/Copy";
import { DataContext } from "../Grid";

export default function Tools({ rowId, columnId, hidden, dragHandleProps }) {
  const { data, setData, maxCols } = useContext(DataContext);

  const { addColumn, removeColumn } = useController(data, setData, maxCols);

  return (
    <Toolbar
      className="grid-toolbar"
      style={{ display: hidden ? "none" : "flex" }}
    >
      <ToolbarItem {...dragHandleProps}>
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
  );
}
