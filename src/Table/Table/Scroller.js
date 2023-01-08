import React, { useEffect } from "react";
import { isElementInViewport } from "../utils";
import delegate from "delegate";

let edgeSize = 80;
let timer = null;
let tableTimer = null;

const Scroller = ({ active = false, tableId }) => {

    useEffect(() => {
        window.addEventListener("mousemove", handleMousemove, false);
        let tableMouseMove = delegate(document.body, `.viewPort${tableId}`, 'mousemove', onTableMouseMove, false);

        return () => {
            window.removeEventListener("mousemove", handleMousemove, false);
            tableMouseMove.destroy();
        }
    }, [active]);

    const onTableMouseMove = (event) => {
        let viewport = event.delegateTarget;
        let container = viewport.querySelector(".container");

        let viewportLeft = viewport.getBoundingClientRect().left;
        let viewportWidth = viewport.clientWidth;

        // mouse position relative to viewport
        let viewportX = event.clientX - viewportLeft;

        let edgeLeft = edgeSize;
        let edgeRight = viewportWidth - edgeSize;

        let isInLeftEdge = (viewportX < edgeLeft);
        let isInRightEdge = (viewportX > edgeRight);

        if (!(isInLeftEdge || isInRightEdge)) {
            clearTimeout(tableTimer);
            return;
        }

        let containerWidth = container.clientWidth;
        let maxScrollX = containerWidth - viewportWidth;

        (function checkForViewportScroll() {
            clearTimeout(tableTimer);
            if (adjustViewportScroll()) {
                tableTimer = setTimeout(checkForViewportScroll, 30);
            }
        })();

        function adjustViewportScroll() {
            if (!active) return;
            
            let currentScrollX = viewport.scrollLeft;
            // Determine if the viewport can be scrolled in any particular direction.
            let canScrollLeft = (currentScrollX > 0);
            let canScrollRight = (currentScrollX < maxScrollX);

            let nextScrollX = currentScrollX;
            let maxStep = 50;

            if(isInLeftEdge && canScrollLeft){
                var intensity = (edgeLeft - viewportX) / edgeSize;
                nextScrollX = Math.max(0, currentScrollX - (maxStep * intensity));
            }
            if(isInRightEdge && canScrollRight){
                var intensity = (viewportX - edgeRight) / edgeSize;
                nextScrollX = Math.min(maxScrollX, currentScrollX + (maxStep * intensity));
            }

            // nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX));

            if(nextScrollX !== currentScrollX) {
                viewport.scrollLeft = nextScrollX;
                return true;
            } else {
                return false;
            }
        } 
    };

    const handleMousemove = (event) => {
        if (!active) return;
        let viewportY = event.clientY;
        let pageViewportHeight = document.documentElement.clientHeight;

        // Next, we need to determine if the mouse is within the "edge" of the
        // viewport, which may require scrolling the window. To do this, we need to
        // calculate the boundaries of the edge in the viewport (these coordinates
        // are relative to the viewport grid system).
        let edgeTop = edgeSize;
        let edgeBottom = (pageViewportHeight - edgeSize);
        let isInTopEdge = (viewportY < edgeTop);
        let isInBottomEdge = (viewportY > edgeBottom);

        // If the mouse is not in the viewport edge, there's no need to calculate
        // anything else.
        if (!(isInTopEdge || isInBottomEdge)) {
            clearTimeout(timer);
            return;
        }

        let documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.body.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        );

        // Calculate the maximum scroll offset in each direction. Since you can only
        // scroll the overflow portion of the document, the maximum represents the
        // length of the document that is NOT in the viewport.
        let maxScrollY = (documentHeight - pageViewportHeight);

        // As we examine the mousemove event, we want to adjust the window scroll in
        // immediate response to the event; but, we also want to continue adjusting
        // the window scroll if the user rests their mouse in the edge boundary. To
        // do this, we'll invoke the adjustment logic immediately. Then, we'll setup
        // a timer that continues to invoke the adjustment logic while the window can
        // still be scrolled in a particular direction.
        // --
        // NOTE: There are probably better ways to handle the ongoing animation
        // check. But, the point of this demo is really about the math logic, not so
        // much about the interval logic.
        (function checkForWindowScroll() {
            clearTimeout(timer);
            if (adjustWindowScroll()) {
                timer = setTimeout(checkForWindowScroll, 30);
            }

        })();

       

        

        // Adjust the window scroll based on the user's mouse position. Returns True
        // or False depending on whether or not the window scroll was changed.
        function adjustWindowScroll() {
            let currentScrollY = window.pageYOffset;
            let canScrollUp = (currentScrollY > 0);
            let canScrollDown = (currentScrollY < maxScrollY);
            let nextScrollY = currentScrollY;

            // As we examine the mouse position within the edge, we want to make the
            // incremental scroll changes more "intense" the closer that the user
            // gets the viewport edge. As such, we'll calculate the percentage that
            // the user has made it "through the edge" when calculating the delta.
            // Then, that use that percentage to back-off from the "max" step value.
            let maxStep = 50;

            // Should we scroll up?
            if (isInTopEdge && canScrollUp) {

                let intensity = ((edgeTop - viewportY) / edgeSize);

                nextScrollY = (nextScrollY - (maxStep * intensity));

            // Should we scroll down?
            } else if (isInBottomEdge && canScrollDown) {

                // .table-end is the last element in the table. it has no height it is just a marker
                let isTableInViewport = isElementInViewport(document.querySelector(".table-end"), {bottom: 30})

                // cancel the scroll if the table is in the viewport.This is how we know that the bottom of the table is in the viewport
                if (isTableInViewport) {
                    clearTimeout(timer);
                    return;
                }
                let intensity = ((viewportY - edgeBottom) / edgeSize);
                nextScrollY = (nextScrollY + (maxStep * intensity));
            }

            nextScrollY = Math.max(0, Math.min(maxScrollY, nextScrollY));

            if (
                (nextScrollY !== currentScrollY)
            ) {

                window.scrollTo(window.scrollX, nextScrollY);
                return (true);

            } else {

                return (false);

            }

        }

    }


    return (
        <></>
    )
}

export default Scroller