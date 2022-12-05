import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { TableContext } from "../context";
import delegate from "delegate";

let trackMouseMove = false;

const Selected = ({ onSelection }) => {

    // Get the context we need
    const {
        setMouseDownColCord,
        setMouseMoveColCord,
        setMouseUpColCord,
        setSelectColDraging,
    } = useContext(TableContext);

    /** 
     * Add event listeners to all the cells in the table
     * As this can be a large number of cells, we use delegate the event listeners to the body for performance
     */
    useEffect(() => {
        let mouseDown = delegate(document.body, '.tableCol', 'mousedown', onMouseDown, false );
        let mouseMove = delegate(document.body, '.tableCol', 'mouseover', onMouseMove, false);
        let mouseUp = delegate(document.body, '.tableCol', 'mouseup', onMouseUp, false);

        return () => {
            mouseDown.destroy();
            mouseMove.destroy();
            mouseUp.destroy();
        };
    }, []);

    /**
     * When the mouse is down, reset the selection and set the new coordinates
     */
    const onMouseDown = (e) => {
        trackMouseMove = true;
        let { x, y } = e.delegateTarget.dataset;
        // if x and y are undefined return
        if (x === undefined || y === undefined) {
            setMouseMoveColCord(null);
            setMouseDownColCord(null);
            setMouseUpColCord(null);
            return;
        };
        // only run setters if x and y have changed from previous values
        setMouseMoveColCord(null);
        setMouseDownColCord([x, y]);
    }

    /**
     * When the mouse is moved, set the new coordinates
     * Only run if x and y have changed from previous values. That is moved to next cell
     * This was on mouseMove before that fires very often. Now we are using mouseOver so it might not be neccessary
     * to check if x and y have changed, but I am leaving it in for now
     */
    let oldX = null;
    let oldY = null;
    const onMouseMove = (e) => {
        if (trackMouseMove) {
            setSelectColDraging(true);
            let { x, y } = e.delegateTarget.dataset;
            if (x === undefined || y === undefined) return;

            // only run if x and y have changed from previous values. That is moved to next cell
            if (x !== oldX || y !== oldY) {
                setMouseMoveColCord([x, y]);
                // fire the onSelection callback to the table component
                onSelection();
            }
            oldX = x;
            oldY = y;
        }
    }

    /**
     * We are only using the mouseUp event to detect when the user has finished selecting
     * the mouseUpColCords are not used but they might be useful in the future
     */
    const onMouseUp = (e) => {
        trackMouseMove = false;
        setSelectColDraging(false);
        let { x, y } = e.delegateTarget.dataset;
        if (x === undefined || y === undefined) return;
        setMouseUpColCord([x, y]);
    }
    // this compoenent does not render anything
    return <></>;
};

export default Selected;


