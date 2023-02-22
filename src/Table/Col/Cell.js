import React, { useRef, useState, useEffect, memo } from "react";
import { useLayoutEffect } from "react";
import styled from "styled-components";

const cellPaddingLeftRight = 5;

const StaticCell = styled.div`
  // padding: 0 ${cellPaddingLeftRight}px;
  font-size: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  ${({ parentType }) => {
    if (parentType === "first") {
      return `
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      `;
    }
  }}
`;

const EditableCell = styled.input`
  border: 1px #1f97f3 solid;
  box-shadow: 0 2px 6px 2px rgb(60 64 67 / 15%);
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  margin: 0;
  max-height: 9900px;
  max-width: 9900px;
  width: 100%;
  outline: none;
  overflow: auto;
  padding: 0 2px;
  resize: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 15;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  padding: 1px 2px;
  max-height: 464px;
  // min-width: 84px;
  min-height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
  text-align: inherit;
`;

const Cell = ({
  parentWidth,
  parentType,
  totalWidth,
  setBiggestDataCellWidth,
  setBiggestLabelCellWidth,
  setBiggestTotalCellWidth,
  editable = false,
  setIsEditable,
  inputValue,
  setInputValue,
  inputType,
}) => {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [refOffsetWidth, setRefOffsetWidth] = useState(
    ref && ref.current ? ref.current.offsetWidth : null
  );
  const [isOverflowing, setIsOverflowing] = useState(false);

  /**
   * This function gets the total width of an element, we use it to check if the cell is overflowing
   */
  function getElementWidth(element) {
    const style = element.currentStyle || window.getComputedStyle(element);
    const width = element.offsetWidth;
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const padding =
      parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const border =
      parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    return width + margin + padding + border;
  }

  useLayoutEffect(() => {
    setRefOffsetWidth(getElementWidth(ref.current));
  }, [ref?.current?.offsetWidth]);

  /**
   * Find the widest cell and update the state so we can use it to auto adjust the width of the columns
   */
  useLayoutEffect(() => {
    if (parentType === "middle") {
      setBiggestDataCellWidth((value) => {
        return refOffsetWidth > value ? refOffsetWidth : value;
      });
    }
    if (parentType === "first") {
      setBiggestLabelCellWidth((value) => {
        if (refOffsetWidth > value) {
          return refOffsetWidth;
        } else {
          return value;
        }
      });
    }
    if (parentType === "last") {
      setBiggestTotalCellWidth((value) => {
        if (refOffsetWidth > value) {
          return refOffsetWidth;
        } else {
          return value >= 80 ? value : 80;
        }
      });
    }
  }, [refOffsetWidth]);

  useEffect(() => {
    if (editable) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editable]);

  /**
   * Check if the cell is overflowing and set the state
   */
  useEffect(() => {
    if (ref.current.offsetWidth > parentWidth) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [parentWidth, totalWidth]);

  const handleOnInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnBlur = () => {
    setIsEditable(false);
  };

  // const handleOnFocus = () => {
  //   setIsEditable(true);
  // };

  return (
    <>
      <StaticCell
        ref={ref}
        isOverflowing={isOverflowing}
        parentType={parentType}
        style={{ display: editable ? "none" : "flex" }}
      >
        {inputValue}
      </StaticCell>
      <EditableCell
        type={inputType}
        style={{ display: editable ? "block" : "none" }}
        onChange={handleOnInput}
        onBlur={handleOnBlur}
        // onFocus={handleOnFocus}
        ref={inputRef}
        value={inputValue}
      />

      {/* <InputBox
        style={{ display: editable ? "inline-grid" : "none" }}
        onChange={handleOnInput}
        onBlur={handleOnBlur}
        ref={inputRef}
      /> */}
    </>
  );
};

export default Cell;
