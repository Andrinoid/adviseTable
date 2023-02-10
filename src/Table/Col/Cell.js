import React, { useRef, useState, useEffect, memo } from "react";
import { useLayoutEffect } from "react";
import styled from "styled-components";

const cellPaddingLeftRight = 5;

const SpaceAround = styled.div`
  padding: 0 ${cellPaddingLeftRight}px;
  font-size: 14px;
`;

// x and y are only for debugging if needed
const Cell = memo(
  ({
    children,
    parentWidth,
    parentType,
    totalWidth,
    biggestLabelCellWidth,
    biggestTotalCellWidth,
    setBiggestDataCellWidth,
    setBiggestLabelCellWidth,
    setBiggestTotalCellWidth,
  }) => {
    const ref = useRef(null);
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
      const margin =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      const padding =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const border =
        parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width + margin + padding + border;
    }

    useEffect(() => {
      if (ref.current) {
        console.log(ref.current.offsetWidth);
        setRefOffsetWidth(ref.current.offsetWidth);
      }
    }, [ref?.current?.offsetWidth]);

    /**
     * Find the widest cell and update the state so we can use it to auto adjust the width of the columns
     */
    useLayoutEffect(() => {
      if (parentType === "middle") {
        setBiggestDataCellWidth((value) => {
          return getElementWidth(ref.current) > value
            ? getElementWidth(ref.current)
            : value;
        });
      }
      if (parentType === "first") {
        if (getElementWidth(ref.current) > biggestLabelCellWidth) {
          setBiggestLabelCellWidth(getElementWidth(ref.current));
        }
      }
      if (parentType === "last") {
        if (getElementWidth(ref.current) > biggestTotalCellWidth) {
          setBiggestTotalCellWidth(getElementWidth(ref.current));
        }
      }
    }, [refOffsetWidth]);

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

    return (
      <SpaceAround ref={ref} isOverflowing={isOverflowing}>
        {children}
      </SpaceAround>
    );
  }
);

export default Cell;
