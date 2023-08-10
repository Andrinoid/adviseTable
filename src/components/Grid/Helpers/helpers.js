import { v4 } from "uuid";
/**
 * Constructs the new grid data structure
 *
 */
export function addaptLegacyToNewGrid(data, component) {
  let ysHash = hashAxies(data, "y");

  const rows = Object.keys(ysHash).map((y, i) => new Row(y, data, i));

  return rows
    .sort((a, b) => a.rowNumber - b.rowNumber)
    .map((r) => {
      r.rowId = v4();
      r.columns = r.columns.map((c) => {
        c.columnId = v4();
        return c;
      });

      return r;
    });
}

/**
 * 1. Find unique axies
 * @param {Array} data
 * @param {String} axy
 * @returns {Object} Hashed axies
 */
function hashAxies(data, axy) {
  // turn all the y axis into a hash and if a row is in the reach
  // of the previous row y + h, then remove it
  // example: first row start at 0 and the bigger element has height 6,
  // the second row starts at 5, so it is in the reach of the first row
  // and should be removed
  const maxYs = {};
  const result = data.reduce((accumulator, item) => {
    maxYs[item[axy]] = Math.max(maxYs[item[axy]] || 0, item[axy] + item.h);

    accumulator[item[axy]] = item[axy];
    return accumulator;
  }, {});

  if (axy == "y") {
    const keys = Object.keys(maxYs);

    for (let i = 0; i < keys.length; i++) {
      if (i !== 0) {
        const key = parseFloat(keys[i]);
        if (maxYs[keys[i - 1]] > key) {
          delete result[key];
          i++;
        }
      }
    }
  }

  return result;
}

function mountColumns(data, rowId) {
  // get all the elements in the row reach
  // example: y = 0, h = 6, maxY = 6
  const maxY = Math.max(
    ...data.filter((d) => d.y == rowId).map((i) => i.y + i.h)
  );

  let values = data.filter((d) => {
    return d.y < maxY && d.y >= rowId;
  });

  // the first half of the algorithm a justs the data
  // in the original way, so we are adjusting the old
  // structure to be easier to fit the new one

  // the next half use it to create the rows and
  // columns data structures of the new structure

  // here we turn these elements into columns
  // data

  const cols = [...values];
  for (let i = 0; i < values.length; i++) {
    const current = values[i];

    if (i > 0 && i < values.length - 1) {
      const previous = values[i - 1];

      const end = previous.x + previous.w;
      const start = current.x - 1;
      const gap = start - end;
      if (gap >= previous.w) {
        const newColumn = {
          x: previous.x + previous.w,
          w: current.x,
          y: current.y,
          h: current.h,
          i: current.i,
          widget: {
            ...current.widget,
            type: "spacer",
          },
        };

        cols.splice(i, 0, newColumn);
        continue;
      }
      // }
    }

    if (values.length == 1) {
      if (i == 0 && current.x > 1) {
        const newColumn = {
          x: 1,
          w: current.x,
          y: current.y,
          h: current.h,
          i: current.i,
          widget: {
            ...current.widget,
            type: "spacer",
          },
        };

        cols.splice(i, 0, newColumn);
      }

      if (i == values.length - 1) {
        if (current.x + current.w < 21) {
          const newColumn = {
            x: current.x + current.w,
            w: 21,
            y: current.y,
            h: current.h,
            i: current.i,
            widget: {
              ...current.widget,
              type: "spacer",
            },
          };
          cols.push(newColumn);
        }
      }
    }
  }

  let xsHash = hashAxies(cols, "x");

  const result = [];

  const keys = Object.keys(xsHash).map((x) => parseFloat(x));

  keys.forEach((x) => {
    const columns = cols.filter((d) => d.x == x);

    result.push(new Column(x, columns));
  });

  return result.map((c) => {
    c.data = c.data.map((d) => {
      return {
        styles: d.styles,
        widget: d.widget,
      };
    });

    return c;
  });
}

class Row {
  constructor(rowId, data, i) {
    this.rowId = parseFloat(rowId);

    this.columns = mountColumns(data, this.rowId, i);

    const initialWidth = 1 / this.columns.length;

    this.columns = this.columns.map((c) => {
      return {
        ...c,
        width: initialWidth,
      };
    });
  }
}

class Column {
  constructor(columnId, data) {
    this.columnId = columnId;
    this.data = data;
  }
}

export function addaptNewGridToLegacy(data) {
  const result = [];

  data.forEach((row) => {
    row.columns.forEach((column) => {
      column.data.forEach((item) => {
        result.push(item);
      });
    });
  });

  return result;
}
