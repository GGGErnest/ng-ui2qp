import {AbstractControlOptions, AsyncValidatorFn, ValidatorFn} from '@angular/forms';

/**
 * Base type for the Control and the Group settings
 */
export interface Ui2QpAbstractControlSettings {
  /**
   * Name for the Qp to be used
   */
  qpName?: string;
  /**
   * Validation functions or Options to be used by the Control
   */
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  /**
   * Async Validators to be used by the Control
   */
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}

/**
 * Control Settings
 */
export interface Ui2QpControlSettings extends Ui2QpAbstractControlSettings {
  type?: string;
  defaultVal?: any;
  state?: any;
}

/**
 * Group Settings
 */
// tslint:disable-next-line:no-empty-interface
export interface Ui2QpGroupSettings extends Ui2QpAbstractControlSettings {
}

/**
 * Default value for Ui2QpControlSettings
 */
export const DefaultUi2QpControlSettings: Ui2QpControlSettings = {
  qpName: null,
  defaultVal: null,
  type: 'string',
  asyncValidators: undefined,
  state: undefined,
  validatorOrOpts: undefined
};

/**
 * Default values for Ui2QpGroupSettings
 */
export const DefaultUi2QpGroupSettings: Ui2QpGroupSettings = {
  qpName: undefined,
  asyncValidators: undefined,
  validatorOrOpts: undefined,
};
