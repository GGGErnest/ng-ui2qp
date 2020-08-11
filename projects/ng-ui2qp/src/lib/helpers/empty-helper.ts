/**
 * Checks when a Object is empty.
 * @param data Object to check
 */
export function isEmpty(data) {
  if (data instanceof Date) {
    return false;
  }
  if (typeof data === 'number' || typeof data === 'boolean') {
    return false;
  }
  if (typeof data === 'undefined' || data === null) {
    return true;
  }
  if (typeof data.length !== 'undefined') {
    return data.length === 0;
  }
  let count = 0;
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      count++;
    }
  }
  return count === 0;
}
