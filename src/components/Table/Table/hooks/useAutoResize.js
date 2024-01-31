import React, { useEffect } from "react";

export default function useAutoResize(tableContainerRef, handleResize) {
  let containerWidth =
    tableContainerRef && tableContainerRef.current
      ? tableContainerRef.current.offsetWidth
      : 0;
  useEffect(() => {
    if (tableContainerRef && tableContainerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (containerWidth !== tableContainerRef.current.offsetWidth) {
          handleResize();
          containerWidth = tableContainerRef.current.offsetWidth;
        }
      });
      resizeObserver.observe(tableContainerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);
}
