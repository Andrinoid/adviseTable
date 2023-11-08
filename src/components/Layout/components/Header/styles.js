import styled from "styled-components";

export const Container = styled.div`
    box-shadow: ${(props) =>
        props.shadow ? "3px 0px 9px 0px #00000017;" : "none"};
    transition: box-shadow 0.5s;
    display: flex;
    width: 100%;
    min-height: 60px;
`;
