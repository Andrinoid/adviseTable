import { v4 as uuid } from "uuid";

const WIDGET = {
  widget: {
    type: "Chart",
    title: "My New Chart",
    colors: [],
    yaxis: [],
    fillOpacity: [],
    strokeWidth: [],
    isStacked: false,
  },
  styles: {
    borderStyle: "unset",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 0,
    backgroundColor: "#ffffff",
  },
};

const LAYOUT = [
  {
    rowId: "cc655d58-270f-4166-91fc-e55eae2164ff",
    styles: {
      boxShadow: "none",
      borderColor: "#000",
      borderStyle: "unset",
      borderWidth: 1,
      borderRadius: 0,
      backgroundColor: "#ffffff",
    },
    widget: {
      type: "Donut",
      title: "My New Donut Chartk",
      touch: 0,
      colors: [],
      selected_kpi_entries: [],
    },
    columns: [
      {
        data: [
          {
            id: "b6753300-6a3b-4d09-9811-174f4845ce7a",
            styles: {
              boxShadow: "none",
              borderColor: "#000",
              borderStyle: "unset",
              borderWidth: 1,
              borderRadius: 0,
              backgroundColor: "#5a6e79",
            },
            widget: {
              type: "Donut",
              title: "My New Donut Chart2",
              touch: 0,
              colors: [],
              selected_kpi_entries: [],
            },
          },
        ],
        width: 0.3333333333333333,
        columnId: "daeb96f8-2089-43c0-a76c-8fb63458fe0e",
      },
      {
        data: [
          {
            id: "98d53ed6-d321-4b69-8364-7f9babe00067",
            styles: {
              color: "#ffffff",
              boxShadow: "none",
              borderColor: "#000",
              borderStyle: "unset",
              borderWidth: 1,
              borderRadius: 0,
              backgroundColor: "#7262ca",
            },
            widget: {
              type: "Donut",
              title: "My New Donut Chart",
              touch: 0,
              colors: [],
              selected_kpi_entries: [],
            },
          },
        ],
        width: 0.3333333333333333,
        columnId: "ccb6418a-8c46-482c-bc97-76588353ea9f",
      },
      {
        columnId: "d6fe5455-8c21-4b72-987f-dcacddff1295",
        data: [
          {
            id: "78d53ed6-d321-4b69-8364-7f9babe00069",
          },
        ],
        width: 0.3333333333333333,
      },
    ],
  },
];

function addWidgetToColumn(layout, itemId, widget) {
  const newLayout = [...layout];

  for (let i = 0; i < newLayout.length; i++) {
    const section = newLayout[i];

    for (let j = 0; j < section.columns.length; j++) {
      const column = section.columns[j];

      const index = column.data.findIndex((item) => item.id === itemId);

      if (index !== -1) {
        column.data[index] = {
          ...column.data[index],
          ...widget,
        };

        return newLayout;
      }
    }
  }

  return [
    ...newLayout,
    {
      rowId: uuid(),
      columns: [
        {
          columnId: uuid(),
          width: 1,
          data: [
            {
              id: itemId == null ? uuid() : itemId,
              ...widget,
            },
          ],
        },
      ],
    },
  ];
}

describe("CRUD", () => {
  it("should add widget to column", () => {
    const id = "78d53ed6-d321-4b69-8364-7f9babe00069";

    const actual = addWidgetToColumn(LAYOUT, id, WIDGET);

    expect(actual[0].columns[2].data[0]).toEqual({
      id: "78d53ed6-d321-4b69-8364-7f9babe00069",
      ...WIDGET,
    });
    expect(actual[0].columns[2].data[0]).not.toBe({
      id: "78d53ed6-d321-4b69-8364-7f9babe00069",
      ...WIDGET,
    });
  });

  it("should add widget to column in a new row when id is null", () => {
    const id = null;

    const actual = addWidgetToColumn(LAYOUT, id, WIDGET);

    expect(actual[1].columns[0].data[0].widget).toEqual(WIDGET.widget);
    expect(actual[1].columns[0].data[0].styles).toEqual(WIDGET.styles);
    expect(actual[1].columns[0].data[0].id).not.toBeNull();
  });
});
