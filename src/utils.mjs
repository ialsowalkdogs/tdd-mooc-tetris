/** Generate a range of numbers within supplied bounds.
 * @param {number} size - Number of items in the range
 * @param {number} startAt - Starting number of range */
export function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

/** Get the indices of tetromino in a row */
export function getBlockRowIndices(blockRow) {
  let indices = [];
  for (let i = 0; i < blockRow.length; i++) {
    if (blockRow[i] !== ".") {
      indices.push(i);
    }
  }
  return indices;
}

/** Replace character at given index in the string */
export function replaceAt(str, index, replacement) {
  if (index > str.length - 1) return str;
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
}

export function createNewRow(row, position, element) {
  const newRow = replaceAt(row, position, element);
  return newRow;
}
