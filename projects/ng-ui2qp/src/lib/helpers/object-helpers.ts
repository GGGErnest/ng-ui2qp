/**
 * Traverse an Object and execute actions on each of it's member properties. This happens recursively
 * @param objectToTraverse Object to traverse
 * @param actionToExecute Action to execute in each of the Object properties
 * @param data Additional data provided to the method
 */
export function traverse(
  objectToTraverse: object,
  actionToExecute: (path: string[], element: any, data: any) => void,
  data?: any
) {
  Object.keys(objectToTraverse).forEach((property) => {
    const item = objectToTraverse[property];
    const path = [];
    path.push(property);
    execOnProperty(path, item, actionToExecute, data);
  });
}

/**
 * Method that execute in each of the object's properties
 * @param path Path from the root to the current property where the recursion is
 * @param item Current object that is the value of the property where the recursion is
 * @param actionToExecute Action to execute to each property value
 * @param data Additional data provided
 */
export function execOnProperty(
  path: string[],
  item: any,
  actionToExecute: (path: string[], formControl: any, data?: URLSearchParams) => void,
  data: any
) {
  if (!(item instanceof Object) || item instanceof Array) {
    actionToExecute(path, item, data);
    path.pop();
  } else if (item instanceof Object) {
    Object.keys(item).forEach((field) => {
      const auxField = item[field];
      path.push(field);
      execOnProperty(path, auxField, actionToExecute, data);
    });
    path.pop();
  } else {
    return;
  }
}

/**
 * This method sets the value of a property in a object using a path to the desired property. The path will be followed
 * from the root of the object. If the property to set the value doesn't exist, will be created.
 * @param keyPath Path from the root of the object to the current position
 * @param value Current value
 * @param object Object to traverse
 */
export function setValueInPath(keyPath: Array<string>, value: string | string[], object: object) {
  const firstElement = keyPath.shift();
  if (keyPath.length > 0) {
    if (object[firstElement] === undefined) {
      object[firstElement] = {};
    }
    setValueInPath(keyPath, value, object[firstElement]);
  } else {
    object[firstElement] = value;
  }
}
