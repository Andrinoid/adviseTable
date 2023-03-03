//react component
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  useEffect,
} from "react";
import styled from "styled-components";
import Cell from "./Cell";
import HoverIndicator from "./HoverIndicator";

const Column = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
  align-items: center;
  justify-content: ${(props) => props.horizontalAlign};
  text-align: ${(props) => props.horizontalAlign};
  overflow: ${(props) => (props.type === "first" ? "hidden" : "visible")};
  user-select: none;
  box-sizing: border-box;
  ${({ showGrid, theme }) => {
    if (showGrid) {
      return theme.grid;
    }
  }}
`;

const Col = ({
  // internal props from Row
  children,
  id,
  y,
  x,
  left,
  type,
  rowType,
  internalStyle = {}, // style from the parent row is only for width, height, and left position. other styles are from the theme
  setTableMatrix,
  tableMatrix,
  setTotalCols,
  setNumberOfDataCols,
  theTheme,
  colspan,
  showGrid,
  totalWidth,
  hasTotalColumn,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  setBiggestTotalCellWidth,
  selectable,
  cleartSelectionTable,
  totalCols,
  // outer props
  dataValue,
  spanSelection = true,
  empty = false,
  horizontalAlign = "right",
  style,
  onClick,
  allowEdition = false,
  inputType = "text",
  onSubmitCallback,
}) => {
  const currentColRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(
    dataValue ? dataValue : typeof children == "number" ? children : ""
  );
  const [initialValue, setInitialValue] = useState(
    dataValue ? dataValue : children
  );

  const setEditionState = (editable) => {
    if (editable && !allowEdition) return;

    if (editable) {
      setInitialValue(dataValue ? dataValue : children);
    }
    setIsEditable(editable);
  };

  const cleanMatrix = (tableMatrix) => {
    let lastColumn = null;
    for (let rowIndex = 0; rowIndex < tableMatrix.length; rowIndex++) {
      const row = tableMatrix[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const col = row[colIndex];
        if (col && col.current && col.current.dataset.x === colIndex) {
          lastColumn = lastColumn > colIndex ? lastColumn : colIndex;
        }
      }
    }

    for (let rowIndex = 0; rowIndex < tableMatrix.length; rowIndex++) {
      tableMatrix[rowIndex] = tableMatrix[rowIndex].slice(0, lastColumn + 1);
    }

    console.log(tableMatrix)
    return tableMatrix;
  };
  /*
   *  Construct the matrix. if the row is not created, create it. If the row is created, push the column to the row
   *  The table matrix is used for calculating the selected area and has other opportunities for future features
   */
  useLayoutEffect(() => {
    cleartSelectionTable();
    setTableMatrix((prev) => {
      let { colspan } = currentColRef.current.dataset;
      if (colspan === "fullwidth") {
        colspan = totalCols;
      }
      let nextValue = prev;
      let index = x;
      if (prev[y]) {
        for (index; index <= (colspan ? x + (colspan - 1) : x); index++) {
          prev[y][index] = currentColRef;
        }
        nextValue = prev;
      } else if (y != null) {
        prev[y] = [];
        for (index; index <= (colspan ? x + (colspan - 1) : x); index++) {
          prev[y][index] = currentColRef;
        }
        nextValue = prev;
      }

      setTotalCols((prev) => {
        setNumberOfDataCols((prev) => {
          let newValue = hasTotalColumn ? index - 2 : index - 1;
          return newValue > prev ? newValue : prev;
        });
        return index > prev ? index : prev;
      });
      return nextValue;
    });
    return () => {
      setTableMatrix((prev) => {
        let nextValue = prev;
        if (nextValue[y]) {
          nextValue[y][x] = null;
        }
        for (let index = 0; index < nextValue.length; index++) {
          const row = nextValue[index];

          if (row && row[x] != null && row[x].current && parseInt(row[x].current.dataset.x) === x) {
            return nextValue;
          }
        }
        if (nextValue.length > 0) {
          nextValue = cleanMatrix(nextValue);
          setTotalCols((prev) => {
            setNumberOfDataCols((prevDataCols) => {
              return hasTotalColumn
                ? nextValue[0].length - 2
                : nextValue[0].length - 1;
            });
            return nextValue[0].length;
          });
        }
        return nextValue;
      });
    };
  }, [y, x, totalCols]);

  const handleDoubleClick = (e) => {
    setEditionState(true);
  };

  const onValueUpdate = (resetValue = false) => {
    setInitialValue((initialValue) => {
      setInputValue((inputValue) => {
        if (resetValue) {
          inputValue = initialValue;
        } else {
          if (onSubmitCallback && initialValue != inputValue) {
            onSubmitCallback(inputValue);
          }
          initialValue = inputValue;
        }
        return inputValue;
      });
      return initialValue;
    });
    setEditionState(false);
  };

  useEffect(() => {
    currentColRef.current.performUpdateValue = (value, force = false) => {
      if (!allowEdition) throw new Error("This column is not editable");

      if (initialValue != inputValue || force) {
        setEditionState(true);
        setInputValue(value);
        onValueUpdate();
      }
    };
    currentColRef.current.focus = () => {
      setEditionState(true);
    };
    currentColRef.current.blur = onValueUpdate;
    currentColRef.current.isEditable = () => {
      return isEditable;
    };
  }, [isEditable, allowEdition]);

  return (
    <Column
      horizontalAlign={horizontalAlign}
      style={{ ...style, ...internalStyle }}
      theme={theTheme}
      showGrid={showGrid}
      ref={currentColRef}
      x={x}
      y={y}
      // ↓ In SelectionAreas component we use the dom to get the selected area. Data attr are simpler to get
      data-x={x}
      data-y={y}
      data-rowtype={rowType}
      data-colspan={colspan}
      data-spanselection={spanSelection}
      type={type}
      id={id}
      data-selectable={selectable}
      className={`tableCol`}
      data-value={inputValue}
      onClick={onClick}
      // editInput={'some text'}
      onDoubleClick={handleDoubleClick}
      onFocus={handleDoubleClick}
    >
      <HoverIndicator className="hoverIndicator" />

      {!empty && (
        <Cell
          parentWidth={internalStyle.width}
          parentType={type}
          totalWidth={totalWidth}
          setBiggestDataCellWidth={setBiggestDataCellWidth}
          setBiggestLabelCellWidth={setBiggestLabelCellWidth}
          setBiggestTotalCellWidth={setBiggestTotalCellWidth}
          editable={isEditable}
          setIsEditable={setIsEditable}
          tabindex="100"
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputType={inputType}
          onBlur={currentColRef.current ? currentColRef.current.blur : () => {}}
          allowEdition={allowEdition}
        >
          {children}
        </Cell>
      )}
      {/* empty Col's are used by ResizableCols for a child ref as I could not manage to have two ref on the cell,
       * one for the matrix and another for the resize. The solution is to use empty col in resizeCol and fill the space
       * with a child for mesurements
       */}
      {empty && <>{children}</>}
      {/* y:{y} x:{x} */}
    </Column>
  );
};

export default Col;
