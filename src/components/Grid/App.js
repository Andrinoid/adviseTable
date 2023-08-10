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
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
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
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
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
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
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
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.33,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
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
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
            },
          ],
          width: 0.5,
        },
        {
          columnId: uuidv4(),
          data: [
            {
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
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
              component: (props) => (
                <DummyWidget initialHeight={100} {...props} />
              ),
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
    <div style={{ paddingTop: 50, paddingLeft: 200 }}>
      <Grid
        ref={ref}
        layout={layout}
        onChange={(data) => {
          setLayout(data);
        }}
      />
      <AddSection
        onClick={() => {
          if (ref.current) {
            ref.current.addRow(0);
          }
        }}
      />

      <h2>Drag and Drop</h2>
      <p>Drag the image back and forth between the two div elements.</p>

      <div id="div1" onDrop={drop} onDragOver={allowDrop}>
        <img
          src="img_w3slogo.gif"
          draggable="true"
          onDragStart={drag}
          id="drag1"
          width="88"
          height="31"
        />
      </div>

      <div id="div2" onDrop={drop} onDragOver={allowDrop}></div>
    </div>
  );
}

export default App;
