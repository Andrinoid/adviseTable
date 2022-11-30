import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { TableContext } from "./context";
import delegate from "delegate";

const Selected = styled.div`
    position: absolute;
    // background: #65b2fe;
    display: flex;
    align-items: center;
    justify-content: right;
    // border: 2px solid #65b2fe;
    box-shadow: inset 0 0 0 2px #65b2fe;
    // transition: all 0.2s ease;
    pointer-events: none;
`;

let trackMouseMove = false;

const SelectedCol = ({ onSelection }) => {

    const {
        setMouseDownColCord,
        setMouseMoveColCord,
        setMouseUpColCord,
    } = useContext(TableContext);

    useEffect(() => {

        let mouseDown = delegate(document.body, '.tableCol', 'mousedown', onMouseDown, true );
        let mouseMove = delegate(document.body, '.tableCol', 'mousemove', onMouseMove, false);
        let mouseUp = delegate(document.body, '.tableCol', 'mouseup', onMouseUp, false);

        return () => {
            mouseDown.destroy();
            mouseMove.destroy();
            mouseUp.destroy();
        };

    }, []);

    const onMouseDown = (e) => {
        trackMouseMove = true;
        let { x, y } = e.delegateTarget.dataset;
        console.log(e)
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

    let oldX = null;
    let oldY = null;
    const onMouseMove = (e) => {
        if (trackMouseMove) {
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

    const onMouseUp = (e) => {
        trackMouseMove = false;
        let { x, y } = e.delegateTarget.dataset;
        if (x === undefined || y === undefined) return;
        setMouseUpColCord([x, y]);
    }

    return <></>;
};

export default SelectedCol;


