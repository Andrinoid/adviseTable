import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

const SectionElm = styled.section`
  box-sizing: border-box;
  position: relative;
  display: flex;
  .react-resizable-handle {
    background: none;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -6px;
    position: absolute;
    cursor: col-resize;
    transform: none;
    top: 0;
    margin: 0;
    z-index: 1;
  }
`;

const Column = styled.div`
  box-sizing: border-box;
  min-height: 100px;
  border: dashed 1px transparent;
  &:hover {
    border: dashed 1px #9ca5ae;
  }
  padding: 10px;
  ${({ width }) => {
    if (width) {
      return `
      width: ${width}px;
      `;
    }
  }}
`;

const Inner = styled.div`
  box-sizing: border-box;
  border: 1px dashed #d5d8dc;
  height: 100%;
`;

function array(n, callback) {
  return Array.from({ length: n }, callback);
}

function Section({ columns = 3 }) {
  const percentages = array(columns, () => 100 / columns);
  const [widths, setWidths] = useState(array(columns, () => 0));
  const sectionRef = useRef(null);

  // Update widths in state whenever window resizes
  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        const parentWidth = sectionRef.current.offsetWidth;
        setWidths(percentages.map((percent) => (percent / 100) * parentWidth));
      }
    };
    // Initial resize
    handleResize();
    // Listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onResize = (index, event, { size }) => {
    if (index < widths.length - 1) {
      // Avoid index out of range
      const minWidthOfNextColumn = 200; // same as the minConstraints value
      const maxWidth = widths[index] + widths[index + 1] - minWidthOfNextColumn;
      if (size.width <= maxWidth) {
        const newWidths = [...widths];
        newWidths[index] = size.width;
        newWidths[index + 1] = widths[index] + widths[index + 1] - size.width;
        setWidths(newWidths);
      }
    }
  };

  return (
    <SectionElm ref={sectionRef}>
      {widths.slice(0, -1).map(
        (
          width,
          index // Only map over the first n - 1 items as the last item is a none resizable flex item
        ) => (
          <Resizable
            key={index}
            width={width}
            onResize={(event, data) => onResize(index, event, data)}
            resizeHandles={["se"]}
            minConstraints={[200]}
          >
            <Column width={width}>
              <Inner>
                <p>Content</p>
              </Inner>
            </Column>
          </Resizable>
        )
      )}
      <Column style={{ flex: 1 }}>
        <Inner>
          <span>last column</span>
        </Inner>
      </Column>
    </SectionElm>
  );
}

export default Section;
