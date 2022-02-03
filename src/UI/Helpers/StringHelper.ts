// Case-insensitive string comparison
export function stringCompareIgnoreCase(x: string, y: string) {
  if (x == y) return true;
  if (!x && y) return false;
  return x.localeCompare(y, undefined, { sensitivity: 'accent' }) == 0;
}