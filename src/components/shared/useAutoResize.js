import { debounce } from "lodash";
import React, { useEffect, useRef } from "react";

export default function useAutoResize(ref, resizeCallback) {
  const containerWidth = useRef(0);

  useEffect(() => {
    if (ref && ref.current) {
      const resizeObserver = new ResizeObserver(
        debounce((entries) => {
          for (const entry of entries) {
            const width = entry.borderBoxSize?.[0].inlineSize;
            if (
              typeof width === "number" &&
              Math.abs(width - containerWidth.current) > 10
            ) {
              containerWidth.current = width;
              console.log(width, "width");
              resizeCallback(ref.current.offsetWidth);
            }
          }
        }, 500)
      );

      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [ref, resizeCallback]);
}
