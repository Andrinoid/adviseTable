import { breakSelection } from "./SelectedAreas";

class Object {
  current;

  constructor(spanSelection) {
    this.setCurrent(spanSelection)
  }

  setCurrent(spanSelection) {
    this.current = {
      getAttribute: (value) => {
        if (value == "data-spanselection") {
          return spanSelection.toString();
        }
        return "";
      },
    };
  }
}

function getTableMatrix(rows, cols, notSeletable = []) {
  const tableMatrix = [];
  for (let i = 0; i < rows; i++) {
    tableMatrix[i] = [];
    for (let j = 0; j < cols; j++) {
      tableMatrix[i][j] = new Object(true);
    }
  }

  for (let i = 0; i < notSeletable.length; i++) {
    const element = notSeletable[i];
    tableMatrix[element[0]][element[1]].setCurrent(false);
  }

  return tableMatrix;
}

// console.log(getTableMatrix(10, 10, [[1, 2], [3, 2]]))



describe("selection", () => {
  test("return selection if valid", () => {
    const tableMatrix = getTableMatrix(10, 10);
    const selectedAreas = [{ fromX: 2, toX: 2, fromY: 0, toY: 9 }];

    const result = breakSelection(tableMatrix, selectedAreas);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ fromX: 2, toX: 2, fromY: 0, toY: 9 });
  });

  test("break into 2 selections", () => {
    const tableMatrix = getTableMatrix(10, 10, [[1, 2]]);
    const selectedAreas = [{ fromX: 2, toX: 2, fromY: 0, toY: 9 }];

    const result = breakSelection(tableMatrix, selectedAreas);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ fromX: 2, toX: 2, fromY: 0, toY: 0 });
    expect(result[1]).toEqual({ fromX: 2, toX: 2, fromY: 2, toY: 9 });
  });

  test("break into 3 selections", () => {
    const tableMatrix = getTableMatrix(10, 10, [[1, 2], [3, 2]]);
    const selectedAreas = [{ fromX: 2, toX: 2, fromY: 0, toY: 9 }];

    const result = breakSelection(tableMatrix, selectedAreas);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ fromX: 2, toX: 2, fromY: 0, toY: 0 });
    expect(result[1]).toEqual({ fromX: 2, toX: 2, fromY: 2, toY: 2 });
    expect(result[2]).toEqual({ fromX: 2, toX: 2, fromY: 4, toY: 9 });
  });

  test("break into 4 selections", () => {
    const tableMatrix = getTableMatrix(10, 10, [[1, 2], [3, 2], [5, 2]]);
    const selectedAreas = [{ fromX: 2, toX: 2, fromY: 0, toY: 9 }];

    const result = breakSelection(tableMatrix, selectedAreas);

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ fromX: 2, toX: 2, fromY: 0, toY: 0 });
    expect(result[1]).toEqual({ fromX: 2, toX: 2, fromY: 2, toY: 2 });
    expect(result[2]).toEqual({ fromX: 2, toX: 2, fromY: 4, toY: 4 });
    expect(result[3]).toEqual({ fromX: 2, toX: 2, fromY: 6, toY: 9 });
  });
});
