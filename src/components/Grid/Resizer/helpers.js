export function getInitialX(data, totalWidth) {
  const d = data.map((r) => r.columns.map((c) => c.width * totalWidth));
  const result = [];

  for (let i = 0; i < d.length; i++) {
    const row = d[i];
    const rowResult = [];
    let sum = 0;
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      sum += col;
      rowResult.push(sum);
    }
    result.push(rowResult);
  }

  return result;
}

export function shouldStop(values, index, minWidth) {
  const length = values.length - 1;
  const elsSum = values.reduce((acc, el, i) => {
    if (i == index) {
      return acc;
    }
    return acc + Math.round(el);
  }, 0);

  return elsSum == length * minWidth;
}

export function inRange(values, rowIndex, x, current, range = 30) {
  const value = x;
  for (let ri = rowIndex + 1; ri < values.length; ri++) {
    for (let ci = 0; ci < values[ri].length; ci++) {
      const nextValue = values[ri][ci];

      if (
        nextValue == x ||
        (current == nextValue &&
          value < nextValue + range &&
          value > nextValue - range)
      ) {
        return nextValue;
      }
    }
  }
  return null;
}
