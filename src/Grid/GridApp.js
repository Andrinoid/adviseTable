import Grid from "./Grid";
import { useRef, useState } from "react";

const data = [
  {
    w: 10,
    h: 9,
    x: 0,
    y: 0,
    i: "a83c0c8e-4ed3-4473-8bde-1d46481c3921",
    minW: 4,
    minH: 5,
    moved: false,
    static: false,
    widget: {
      type: "Chart",
      title: "My New Chart",
      yaxis: [],
      colors: [],
      isStacked: false,
      fillOpacity: [],
      strokeWidth: [],
    },
    styles: {
      borderColor: "#000",
      borderStyle: "unset",
      borderWidth: 1,
      borderRadius: 0,
      backgroundColor: "#ffffff",
    },
  },
  {
    w: 11,
    h: 5,
    x: 10,
    y: 0,
    i: "d21bbc61-b6ff-4da3-8c1c-8cf729424412",
    moved: false,
    static: false,
    widget: {
      type: "Bar",
      title: "My New Bar chart",
      yaxis: [],
      colors: [],
      isStacked: false,
      fillOpacity: [],
      strokeWidth: [],
    },
    styles: {
      borderColor: "#000",
      borderStyle: "unset",
      borderWidth: 1,
      borderRadius: 0,
      backgroundColor: "#ffffff",
    },
  },
  {
    w: 11,
    h: 6,
    x: 10,
    y: 5,
    i: "c21e5bff-9a5c-434b-963c-ea40bd6fa7d6",
    minW: 5,
    minH: 6,
    moved: false,
    static: false,
    widget: {
      type: "Pie",
      title: "My New Pie Chart",
      touch: 0,
      colors: [],
      selected_kpi_entries: [],
    },
    styles: {
      boxShadow: "none",
      borderColor: "#000",
      borderStyle: "unset",
      borderWidth: 1,
      borderRadius: 0,
      backgroundColor: "#ffffff",
    },
  },
  {
    w: 10,
    h: 12,
    x: 0,
    y: 9,
    i: "af89b7ef-c613-47ba-90ff-9151ce27ae6a",
    moved: false,
    static: false,
    widget: {
      type: "Gauge",
      colors: ["#3f90f4", "#3f90f4"],
      compareTo: "budget",
      needleType: "classic",
    },
    styles: {
      boxShadow: "none",
      borderColor: "#000",
      borderStyle: "unset",
      borderWidth: 1,
      borderRadius: 0,
      backgroundColor: "#ffffff",
    },
  },
  {
    w: 21,
    h: 4,
    x: 0,
    y: 21,
    i: "ad34108c-282b-4d8f-a671-5ed19ab7c1f4",
    moved: false,
    static: false,
    widget: {
      type: "none",
    },
  },
];

function App() {
  return (
    <div style={{ width: "90vw", height: "80vh", boxSizing: "border-box" }}>
      <Grid layout={data} onLayoutChange={(layout) => {}}>
        {data.map((item) => {
          return (
            <div
              id={item.i}
              data-testid={item.i}
              style={{
                background: "#E1AA7D",
                width: "100%",
                height: "100%",
                textAlign: "left",
              }}
            ></div>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
