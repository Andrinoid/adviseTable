import styled from "styled-components";

export const SectionHandle = styled.div`
  height: 25px;
  background-color: #37a1f6;

  position: absolute;
  left: 50%;
  top: -25px;
  transform: translateX(-50%);
  z-index: 6;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  display: none;

  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 25px solid #37a1f6; /* Match the height of your handle */
    border-top: 0;
  }

  &:before {
    left: -10px; /* Adjust this value to increase or decrease the slope */
    border-left: 10px solid transparent;
  }

  &:after {
    right: -10px; /* Adjust this value to increase or decrease the slope */
    border-right: 10px solid transparent;
  }

  svg {
    fill: white;
  }
`;

export const SectionHandleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 25px;
`;

export const SectionContainer = styled.div`
  transition: background-color 0.2s ease-in-out;
  background-color: transparent;
  page-break-before: always;
`;

export const SectionElm = styled.section`
  box-sizing: border-box;
  position: relative;
  display: flex;
  border: solid 1px transparent;
  transition: border 0.2s ease-in-out;
  height: 100%;
  ${({ beingDragged, editing }) => {
    if (beingDragged && editing) {
      return `
        &:hover {
          border: solid 1px #37a1f6;

          /* Target the SectionHandle when SectionElm is hovered */
          ${SectionHandle} {
            opacity: 1;
            display: flex;
          }
        }
      `;
    }
  }}

  @media (max-width: ${({ breakpoint }) => breakpoint}px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Cursor = styled.div`
  cursor: ${(props) => props.type};
`;

export const Line = styled.div`
  display: block;
  width: 3px;
  height: 100%;
  background: #37a1f6;
  position: absolute;
  ${(props) => (props.right ? "right: 0;" : "left: 0;")}
  top: 0;
`;
