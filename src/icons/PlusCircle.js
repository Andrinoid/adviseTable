import React from "react";
import styled from 'styled-components';

const darkenColor = (color, percent) => {
    color = color.substr(1); // remove #
    const num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = ((num >> 8) & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};

const PlusCircleWrapper = styled.span`
    cursor: ${props => props.onClick ? 'pointer' : 'default'};
    color: ${props => props.color || 'currentColor'};

    &:hover {
        color: ${props => props.onClick ? darkenColor(props.color, 10) : 'currentColor'};
    }
`;

const PlusCircle = ({ size = 24, color = '#000000', onClick }) => {  // default color changed to a valid hex color
    return (
        <PlusCircleWrapper onClick={onClick} color={color}>
            <svg
                style={{ fontSize: size }}
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="plus-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"></path>
            </svg>
        </PlusCircleWrapper>
    )
}

export default PlusCircle;
