import React, { useRef, useState } from "react";
import Grid from "./Grid";
import { v4 as uuidv4 } from "uuid";
import DummyWidget from "./DummyWidget";

import AddSection from "./AddSection";

// import { sample1, sample2 } from "./components/Helpers/samples";
// import {
//   addaptLegacyToNewGrid,
//   addaptNewGridToLegacy,
// } from "./components/Helpers";

function App() {
  const [layout, setLayout] = useState([
    {
      rowId: uuidv4(),
      columns: [
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
      ],
    },
    {
      rowId: uuidv4(),
      columns: [
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
      ],
    },
    {
      rowId: uuidv4(),
      columns: [
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
      ],
    },
    {
      rowId: uuidv4(),
      columns: [
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.33,
        },
      ],
    },
    {
      rowId: uuidv4(),
      columns: [
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.5,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "widget 1",
              },
            },
          ],
          width: 0.5,
        },
      ],
    },
    {
      rowId: uuidv4(),
      columns: [
        {
          columnId: uuidv4(),
          data: [
            {
              widget: {
                title: "Widget 1",
              },
            },
          ],
          width: 1,
        },
      ],
    },
  ]);
  const ref = useRef(null);

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
  }

  return (
    <div style={{ paddingTop: 20 }}>
      <Grid
        editing={false}
        ref={ref}
        layout={layout}
        onChange={(data) => {
          setLayout(data);
        }}
      >
        {(item, style) => {
          console.log(item);
          return (
            <DummyWidget initialHeight={100} style={style}>
              {item && item.widget && item.widget.title
                ? item.widget.title
                : ""}
            </DummyWidget>
          );
        }}
      </Grid>
      <AddSection
        onClick={() => {
          if (ref.current) {
            ref.current.addRow(0);
          }
        }}
      />
    </div>
  );
}

export default App;
