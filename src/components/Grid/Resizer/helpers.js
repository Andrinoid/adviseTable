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
