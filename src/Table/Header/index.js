//react component
import React, { memo } from "react";
import styled from "styled-components";
import ResizablelCol from "../Col/ResizablelCol";
import Brick from "../Col/Brick";

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
      showGrid,
      data,
      autoAdjustFirstColWidth,
      autoAdjustLastColWidth,
      lasColumnRisizeable,
    },
    ref
  ) => {
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
          <Brick
            showGrid={showGrid}
            theTheme={theTheme}
            location={"top"}
            style={{
              width: leftBrickWidth,
              height: colHeight,
              theTheme,
              zIndex: 4,
              position: "sticky",
              top: 0,
              left: 0,
            }}
          ></Brick>

          {data.map((item, index) => {
            // we need index to be zero after the first col wich has it's own width
            return (
              // we need to use the verbose syntax here because we need to set the key
              <React.Fragment key={index}>
                {index === 0 && (
                  <ResizablelCol
                    location={"top"}
                    onResize={onFirstColResize}
                    type="first"
                    horizontalAlign="left"
                    selectable={false}
                    autoAdjustFirstColWidth={autoAdjustFirstColWidth}
                    autoAdjustLastColWidth={autoAdjustLastColWidth}
                    style={{
                      width: firstColWidth,
                      height: colHeight,
                    }}
                  >
                    <Label>{item.title}</Label>
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
                    }}
                  >
                    <Label>{item.title}</Label>
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
