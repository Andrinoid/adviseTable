import React, { useEffect } from "react";

export default function useAutoResize(ref, resizeCallback) {
  let containerWidth = ref && ref.current ? ref.current.offsetWidth : 0;
  useEffect(() => {
    if (ref && ref.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (containerWidth !== ref.current.offsetWidth) {
          resizeCallback(ref.current.offsetWidth);
          containerWidth = ref.current.offsetWidth;
        }
      });
      resizeObserver.observe(ref.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);
}
