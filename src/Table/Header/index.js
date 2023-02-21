//react component
import React, { memo } from "react";
import styled from "styled-components";
import ResizablelCol from "../Col/ResizablelCol";
import Brick from "../Col/Brick";
import themes from "../Table/themes";

const headerTheme = {
  light: {
    background: "rgb(74, 76, 80)",
    color: "#fafafa",
    hightlight: "#E6e8e8",
  },
  dark: {
    background: "#fafafa",
    color: "rgb(74, 76, 80)",
    hightlight: "rgba(255,255,255, 0.2)",
  },
};

const BACKGROUND_TRANSITION = "background-color 0.03s";

const RowElm = styled.div`
  position: sticky;
  top: ${({ stickyTopOffset }) => stickyTopOffset}px;
  z-index: 2;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
`;

const Label = styled.div`
  padding: 5px;
  font-weight: bold;
`;

const PressableBrick = styled.button`
  background: ${({ selected, themeKey}) =>
    selected ? headerTheme[themeKey].background : "#Eff1f1"};
  border: none;
  box-shadow: inset 0px 0px 0 0.5px #ebebeb;
  cursor: pointer;

  ${({ selected, themeKey }) => {
    if (!selected) {
      return `
        transition: ${BACKGROUND_TRANSITION};

        &:hover {
          background-color: ${headerTheme[themeKey].hightlight};
        }
      `;
    }
  }}
`;

const Header = React.forwardRef(
  (
    {
      colWidth,
      leftBrickWidth,
      firstColWidth,
      lastColWidth,
      colHeight,
      totalWidth,
      hasTotalColumn,
      onFirstColResize,
      onLastColResize,
      stickyTopOffset = 0,
      theTheme,
      themeKey,
      showGrid,
      data,
      autoAdjustFirstColWidth,
      autoAdjustLastColWidth,
      lasColumnRisizeable,
      selectAll,
      isTableSelected,
    },
    ref
  ) => {
    const selectedBackground = {
      background: isTableSelected
        ? headerTheme[themeKey].background
        : "inherit",
    };
    const selectedColor = {
      color: isTableSelected ? headerTheme[themeKey].color : "inherit",
    };
    return (
      <RowElm ref={ref} stickyTopOffset={stickyTopOffset}>
        <div
          style={{
            ...theTheme.header,
            height: colHeight,
            width: totalWidth,
            boxSizing: "border-box",
            display: "flex",
          }}
        >
          <PressableBrick
            themeKey={themeKey}
            onClick={selectAll}
            selected={isTableSelected}
            style={{
              width: leftBrickWidth,
              height: colHeight,
              theTheme,
              zIndex: 5,
              position: "sticky",
              top: 0,
              left: 0,
            }}
          />

          {data.map((item, index) => {
            // we need index to be zero after the first col wich has it's own width
            return (
              // we need to use the verbose syntax here because we need to set the key
              <React.Fragment key={index}>
                {index === 0 && (
                  <ResizablelCol
                    location={"top"}
                    theTheme={theTheme}
                    showGrid={showGrid}
                    onResize={onFirstColResize}
                    type="first"
                    horizontalAlign="left"
                    selectable={false}
                    autoAdjustFirstColWidth={autoAdjustFirstColWidth}
                    autoAdjustLastColWidth={autoAdjustLastColWidth}
                    style={{
                      width: firstColWidth,
                      height: colHeight,
                      transition: BACKGROUND_TRANSITION,
                      ...selectedBackground,
                    }}
                  >
                    {item.title && (
                      <Label style={selectedColor}>{item.title}</Label>
                    )}
                  </ResizablelCol>
                )}
                {index > 0 && (index < data.length - 1 || !hasTotalColumn) && (
                  <Brick
                    location={"top"}
                    selectable={false}
                    type="middle"
                    showGrid={showGrid}
                    theTheme={theTheme}
                    style={{
                      width: colWidth ? colWidth : "auto",
                      height: colHeight,
                      transition: BACKGROUND_TRANSITION,
                      ...selectedBackground,
                    }}
                  >
                    <Label style={selectedColor}>{item.title}</Label>
                  </Brick>
                )}
                {index === data.length - 1 && hasTotalColumn && (
                  <>
                    {lasColumnRisizeable && (
                      <ResizablelCol
                        location={"top"}
                        onResize={onLastColResize}
                        direction="left"
                        type="last"
                        selectable={false}
                        autoAdjustFirstColWidth={autoAdjustFirstColWidth}
                        autoAdjustLastColWidth={autoAdjustLastColWidth}
                        style={{
                          width: lastColWidth ? lastColWidth : "auto",
                          height: colHeight,
                        }}
                      >
                        <>
                          <Label>{item.title}</Label>
                        </>
                      </ResizablelCol>
                    )}
                    {!lasColumnRisizeable && (
                      <Brick
                        location={"top"}
                        selectable={false}
                        type="last"
                        showGrid={showGrid}
                        theTheme={theTheme}
                        style={{
                          width: lastColWidth ? lastColWidth : "auto",
                          height: colHeight,
                        }}
                      >
                        <Label>{item.title}</Label>
                      </Brick>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </RowElm>
    );
  }
);

export default memo(Header);
