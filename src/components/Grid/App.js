import React, { useRef, useState } from "react";
import Grid from "./Grid";
import { v4 as uuidv4 } from "uuid";
import DummyWidget from "./DummyWidget";

import AddSection from "./AddSection";

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
        },
      ],
    },
  ]);
  const ref = useRef(null);

  return (
    <div style={{ paddingTop: 20 }}>
      <Grid
        editing={true}
        ref={ref}
        layout={layout}
        onChange={(data) => {
          setLayout(data);
        }}
      >
        {(item, style) => {
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
