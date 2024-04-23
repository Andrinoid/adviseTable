import { debounce } from 'lodash';
import React, { useEffect } from 'react';

export default function useAutoResize(ref, resizeCallback) {
  let containerWidth = ref && ref.current ? ref.current.offsetWidth : 0;
  useEffect(() => {
    if (ref && ref.current) {
      const resizeObserver = new ResizeObserver(
        debounce(() => {
          if (ref.current && containerWidth !== ref.current.offsetWidth) {
            resizeCallback(ref.current.offsetWidth);
            containerWidth = ref.current.offsetWidth;
          }
        }, 50),
      );
      resizeObserver.observe(ref.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);
}
