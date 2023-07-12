export function construct(data) {
  let ysMap = data.reduce((accumulator, item) => {
    accumulator[item.y] = item.y;
    return accumulator;
  }, {});

  const deletedYs = deleteInvalidYs(ysMap, data);

  const result = Object.keys(ysMap).map((y, index) => {
    return {
      rowId: parseFloat(y),
      rowNumber: index + 1,
      data: [...data.filter((d) => d.y == y)],
    };
  });

  deletedYs.forEach((y) => {
    const index = result.findIndex((r, i) => {
      return r.rowId > parseFloat(y) && result[i - 1].rowId < parseFloat(y);
    });

    if (index !== -1) {
      result[index].data.push(...data.filter((d) => d.y == y));
    }
  });

  return result;
}

function deleteInvalidYs(ysMap, data) {
  const deleted = [];
  let previous = 0;

  Object.keys(ysMap).forEach((y, index) => {
    if (index !== 0 && previous > y) {
      deleted.push(y);
      delete ysMap[y];
      return;
    }

    previous = Math.max(...data.filter((d) => d.y == y).map((i) => i.y + i.h));
  });

  return deleted;
}
