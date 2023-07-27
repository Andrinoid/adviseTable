import React, { useRef } from "react";
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
  const layout = [
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
  ];
  const ref = useRef(null);
  return (
    <div style={{ paddingTop: 50 }}>
      <Grid ref={ref} layout={layout} onChange={(value) => {}} />
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
