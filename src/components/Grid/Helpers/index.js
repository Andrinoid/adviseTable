export function getColumnId(value) {
  return value.split("_")[1];
}

export function getRowId(value) {
  return value.split("_")[0];
}
