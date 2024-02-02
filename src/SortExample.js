import React, { useState } from 'react';
import SortableView from './components/Sortable';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 20px;
`;

const Item = styled.div`
  padding: 10px;
  box-shadow: #000000 0px 0px 0px 1px;
  cursor: pointer;
  background-color: #fff;
`;

function SortExample() {
  const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const handleOnOrderChange = (fromIndex, toIndex) => {
    const newList = [...list];
    const item = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, item[0]);
    setList(newList);
  };
  return (
    // Your JSX code goes here
    <PageWrapper>
      <SortableView draggable={true} onOrderChange={handleOnOrderChange}>
        {list.map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
      </SortableView>
    </PageWrapper>
  );
}

export default SortExample;
