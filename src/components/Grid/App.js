import React, { useRef, useState } from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

import Grid from "./Grid";
import DummyWidget from "./DummyWidget";
import AddSection from "./AddSection";

const data = [
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
  ,
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
              title: "widget 2",
            },
          },
          {
            widget: {
              title: "widget 2",
            },
          },
        ],
      },
      {
        columnId: uuidv4(),
        data: [
          {
            widget: {
              title: "widget 3",
            },
          },
          {
            widget: {
              title: "widget 3",
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
];

function App() {
  const [layout, setLayout] = useState(produce(data, (draft) => {}));
  const ref = useRef(null);
  const [editing, setEditing] = useState(true);

  return (
    <div style={{ paddingTop: 20 }}>
      <button
        onClick={() => {
          setEditing(!editing);
        }}
      >
        {editing ? "Stop editing" : "Start editing"}
      </button>
      <Grid
        editing={editing}
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
