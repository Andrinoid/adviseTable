import React from "react";
import PlusCircle from "../../../icons/PlusCircle";
import styled from "styled-components";

const EmptySection = styled.div`
  padding: 12px;
  box-sizing: border-box;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    margin-top: 10px;
    margin-bottom: 0;
    font-style: italic;
    font-size: 13px;
    color: #818181;
    font-family: "Heebo", sans-serif;
  }
`;

const Inner = styled.div`
  display: flex;
  height: 130px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #d8d8d8;
`;

const AddSection = ({ onClick, style }) => {
  return (
    <EmptySection>
      <Inner style={style}>
        <div>
          <PlusCircle onClick={onClick} size={40} color={"#1b90ff"} />
        </div>
        <p>Drag and drop widgets here</p>
      </Inner>
    </EmptySection>
  );
};

export default AddSection;
