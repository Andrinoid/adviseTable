import React from "react";

export default function Copy(props) {
  return (
    <svg
      enable-background="new 0 0 50 50"
      height="0.9em"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 50 50"
      width="0.9em"
    >
      <rect fill="none" height="50" width="50" />
      <polyline
        fill="none"
        points="29,21 18,21 18,10   "
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
      <polygon
        fill="none"
        points="30,49 1,49 1,9   18,9 30,21 "
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="3"
      />
      <polyline
        fill="none"
        points="48,13 37,13 37,2   "
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
      <polygon points="37.414,0 19,0 19,6 21,8 21,2 36.586,2 48,13.414 48,40 33,40 33,42 50,42 50,12.586 " />
    </svg>
  );
}
