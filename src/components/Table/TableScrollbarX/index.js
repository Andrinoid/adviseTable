import React from 'react';
import styled from 'styled-components';
import { useSyncScroller } from '../utils/useSyncScroller';
import useTableContext from '../Table/hooks/useTableContext';

const Styles = styled.div`
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar:horizontal {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

function TableScrollbarX({ style, tableId }) {
  const { tableViewportWidth, tableTotalWidth } = useTableContext();
  const scrollBarRef = useSyncScroller('hScrollingContainer-' + tableId);
  return (
    <div style={style}>
      <Styles
        className="scrollable"
        ref={scrollBarRef}
        style={{
          overflowX: 'auto',
          height: 11,
          width: tableViewportWidth,
        }}
      >
        <div
          style={{
            width: tableTotalWidth,
          }}
        ></div>
      </Styles>
    </div>
  );
}

export default TableScrollbarX;
