//react component
import React, { memo } from 'react';
import styled from 'styled-components';
import ResizablelCol from '../Col/ResizablelCol';
import Brick from '../Col/Brick';
import themes from '../Table/themes';

const headerTheme = {
  light: {
    background: 'rgb(74, 76, 80)',
    color: '#fafafa',
    hightlight: '#E6e8e8',
  },
  dark: {
    background: '#fafafa',
    color: 'rgb(74, 76, 80)',
    hightlight: '#1F1F1F',
  },
};

const BACKGROUND_TRANSITION = 'background-color 0.03s';

const RowElm = styled.div`
  position: ${({ printLayout }) => (printLayout ? 'static' : 'sticky')};
  top: ${({ stickyTopOffset }) => stickyTopOffset}px;

  z-index: 2;
  white-space: normal;
  line-height: 1;
  width: 100%;
  overflow: ${(props) => (props.printLayout ? 'visible' : 'hidden')};
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb {
    background-color: transparent !important;
  }
`;

const Label = styled.div`
  padding: 5px;
  font-weight: bold;
`;

const PressableBrick = styled.button`
  visibility: ${({ printLayout }) => (printLayout ? 'hidden' : 'visible')};
  background: ${({ selected, themeKey }) =>
    selected
      ? headerTheme[themeKey].background
      : themeKey == 'light'
      ? '#Eff1f1'
      : '#0A0A0A'};
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

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 12px solid rgb(181, 177, 177);
  transform: rotate(45deg);
  position: absolute;
  right: 3px;
  bottom: -3px;
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
      theTheme,
      themeKey,
      showGrid,
      data,
      autoAdjustFirstColWidth,
      autoAdjustLastColWidth,
      lasColumnRisizeable,
      selectAll,
      deselectAll,
      isTableSelected,
      printLayout,
      stickyTopOffset = 0,
      headerColor,
    },
    ref,
  ) => {
    const selectedBackground = {
      background: isTableSelected
        ? headerTheme[themeKey].background
        : 'inherit',
    };
    const selectedColor = {
      color: isTableSelected ? headerTheme[themeKey].color : 'inherit',
    };

    return (
      <RowElm
        ref={ref}
        printLayout={printLayout}
        stickyTopOffset={stickyTopOffset}
      >
        <div
          style={{
            ...theTheme.header,
            height: colHeight,
            width: totalWidth,
            boxSizing: 'border-box',
            display: 'flex',
            color: headerColor.text || theTheme.header.color,
            background: headerColor.background || theTheme.header.background,
          }}
        >
          <PressableBrick
            printLayout={printLayout}
            themeKey={themeKey}
            onClick={() => {
              if (isTableSelected) {
                deselectAll();
              } else {
                selectAll(true);
              }
            }}
            selected={isTableSelected}
            style={{
              width: leftBrickWidth,
              height: colHeight,
              theTheme,
              zIndex: 5,
              position: 'sticky',
              top: 0,
              left: 0,
              color: isTableSelected
                ? selectedColor.color
                : headerColor.text || 'inherit',
              background: isTableSelected
                ? selectedBackground.background
                : headerColor.background || 'inherit',
            }}
          >
            <Triangle />
          </PressableBrick>

          {data.map((item, index) => {
            // we need index to be zero after the first col wich has it's own width
            return (
              // we need to use the verbose syntax here because we need to set the key
              <React.Fragment key={index}>
                {index === 0 && (
                  <ResizablelCol
                    location={'top'}
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
                    location={'top'}
                    selectable={false}
                    type="middle"
                    showGrid={showGrid}
                    theTheme={theTheme}
                    style={{
                      width: colWidth ? colWidth : 'auto',
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
                        location={'top'}
                        onResize={onLastColResize}
                        direction="left"
                        type="last"
                        selectable={false}
                        autoAdjustFirstColWidth={autoAdjustFirstColWidth}
                        autoAdjustLastColWidth={autoAdjustLastColWidth}
                        style={{
                          width: lastColWidth ? lastColWidth : 'auto',
                          height: colHeight,
                          ...selectedBackground,
                        }}
                      >
                        <>
                          <Label style={selectedColor}>{item.title}</Label>
                        </>
                      </ResizablelCol>
                    )}
                    {!lasColumnRisizeable && (
                      <Brick
                        location={'top'}
                        selectable={false}
                        type="last"
                        showGrid={showGrid}
                        theTheme={theTheme}
                        style={{
                          width: lastColWidth ? lastColWidth : 'auto',
                          height: colHeight,
                          ...selectedBackground,
                        }}
                      >
                        <Label style={selectedColor}>{item.title}</Label>
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
  },
);

export default memo(Header);
