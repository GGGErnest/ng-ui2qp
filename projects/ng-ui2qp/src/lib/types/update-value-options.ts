/**
 * Options that determine how the control propagates changes and
 * emits events after the value is updated.
 */
export interface UpdateValueOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}
