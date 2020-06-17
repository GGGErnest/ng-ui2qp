/**
 * Action types in the QpGroup Object
 */
export enum ActionType {
  Add,
  PatchValue,
  GetValue
}

/**
 * Action data
 */
export interface Action {
  type: ActionType;
  data?: any;
}
