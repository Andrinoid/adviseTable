import React from "react";
import styled from "styled-components";

const InputBox = styled.div`
    border: 1px #1f97f3 solid;
    box-shadow: 0 2px 6px 2px rgb(60 64 67 / 15%);
    font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    margin: 0;
    max-height: 9900px;
    max-width: 9900px;
    outline: none;
    overflow: auto;
    padding: 0 2px;
    position: absolute;
    resize: none;
    text-align: left;
    top: -10000px;
    white-space: pre-wrap;
    word-wrap: break-word;
    z-index: 15;
    
    font-family: Arial;
    color: rgb(0,0,0);
    text-align: right;
    background-color: rgb(255,255,255);
    padding: 1px 2px;
    max-width: 487px;
    max-height: 464px;
    min-width: 84px;
    min-height: 40px;
    left: 180px;
    top: 355px;
    display: flex;
    justify-content: right;
    align-items: center;   
`;

const EditCell = ({ currentEditCellRef }) => {
    console.log('currentEditCellRef', currentEditCellRef);

    const handleOnInput = (e) => {
        // console.log(e.currentTarget.textContent);
    };


    return (
        <InputBox contentEditable="true" onInput={handleOnInput} suppressContentEditableWarning={true}>
            123
        </InputBox>
    );
}

export default EditCell;