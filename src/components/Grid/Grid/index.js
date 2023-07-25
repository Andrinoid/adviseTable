import React, {
  createContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Section from "../Section";
import { useSectionCRUD } from "../Section/hooks";

export const DataContext = createContext(null);

function Grid(
  { layout, onChange, maxCols = 10, minWidth = 200, breakpoint = 768 },
  ref
) {
  const [data, setData] = useState(layout);
  const [droppableRowId, setDroppableRowId] = useState(null);
  const [draggedFullId, setDraggedFullId] = useState(null);
  const [resizingColumnId, setResizingColumnId] = useState(null);

  const { addRow } = useSectionCRUD(data, setData);

  useImperativeHandle(ref, () => ({
    addRow,
  }));

  useEffect(() => {
    if (draggedFullId === null) {
      setDroppableRowId(null);
    }
  }, [draggedFullId]);

  function id(data) {
    return data.droppableId.split("_")[1];
  }

  function index(data, id) {
    return data.findIndex((row) => row.rowId === id);
  }

  function recomputeWidths(data) {
    return data.map((row) => {
      row.columns = row.columns.map((col) => {
        col.width = 1 / row.columns.length;
        return col;
      });
      return row;
    });
  }

  const reorder = (data, source, destination, type) => {
    const result = Array.from(data);

    if (type !== "col") {
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);

      return result;
    }

    const sourceIndex = index(result, id(source));
    const destIndex = index(result, id(destination));
    const [removed] = result[sourceIndex].columns.splice(source.index, 1);

    result[destIndex].columns.splice(destination.index, 0, removed);

    if (result[sourceIndex].columns.length === 0) {
      result.splice(sourceIndex, 1);
    }

    return recomputeWidths(result);
  };

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        droppableRowId,
        draggedFullId,
        maxCols,
        minWidth,
        resizingColumnId,
        setResizingColumnId,
        setDraggedFullId,
      }}
    >
      <DragDropContext
        onDragStart={(e) => {
          setDraggedFullId(e.draggableId);
          setDroppableRowId(e.draggableId.split("_")[1]);

          if (e.type === "col") {
            const id = e.draggableId.split("_")[0];
            setDroppableRowId(id);
          }
        }}
        onBeforeDragStart={(e) => {
          setDraggedFullId(e.draggableId);
        }}
        onDragEnd={(e) => {
          setDraggedFullId(null);
          const { destination, source, type } = e;

          if (!destination) {
            return;
          }

          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }

          if (type === "col") {
            setData(reorder(data, source, destination, "col"));

            return;
          }

          const reordered = reorder(data, source, destination);

          setData([...reordered]);
        }}
      >
        <Droppable droppableId={"grid"}>
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {data.map((row, index) => (
                <Section
                  key={row.rowId}
                  row={row}
                  isBeforeDragging={draggedFullId !== null}
                  widths={row.columns.map((col) => col.width)}
                  index={index}
                  breakpoint={breakpoint}
                />
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DataContext.Provider>
  );
}

export default forwardRef(Grid);
