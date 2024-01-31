import { useState, useEffect, useCallback, useLayoutEffect } from "react";

const useHasScrollbar = (ref) => {
    const [hasScrollbar, setHasScrollbar] = useState(false);

    const checkScrollbars = useCallback(() => {
        if (ref.current) {
            const element = ref.current;
            const hasVerticalScrollbar =
                element.scrollHeight > element.clientHeight;

            setHasScrollbar(hasVerticalScrollbar);
        }
    }, [ref]);

    useLayoutEffect(() => {
        setTimeout(checkScrollbars, 0);
        // checkScrollbars();

        window.addEventListener("resize", checkScrollbars);
        return () => window.removeEventListener("resize", checkScrollbars);
    }, [checkScrollbars]);

    return hasScrollbar;
};

export default useHasScrollbar;
