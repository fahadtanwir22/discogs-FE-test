export function sortByYear(records) {
  return records.sort((a, b) => (a.year > b.year ? 1 : -1));
}

export function sortByTitle(records) {
  return records.sort(function (x, y) {
    let a = x.title.toUpperCase(),
      b = y.title.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });
}
