import {
  FormControl,
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';
import {SerializeFunc} from '../types/serializer';
import {DeserializeFunc} from '../types/deserializer';
import {IUi2QpLogger} from '../interfaces/logger';
import {UpdateValueOptions} from '../types/update-value-options';

export class Ui2QpControl extends FormControl {
  /**
   * Creates a Ui2QpFormControl
   * @param logger Logger to be use
   * @param type Type of the FormControl
   * @param defaultVal Default value to used when the Control will be set to invalid values or empty values,
   * also is going be used when resetting the Control's value.
   * @param serializer Serializer to use when setting the FormControl value
   * @param deserializer Deserializer to use when retrieving the value from the FormControl
   * @param state Initializes the control with an initial value, or an object that defines
   * the initial value and disabled state.
   * @param validatorOrOpts — A synchronous validator function, or an array of such functions,
   * or an AbstractControlOptions object that contains validation functions and a validation trigger.
   * @param asyncValidator — A single async validator or array of async validator functions
   * @param qpName Query Param name that identifies this control
   */
  constructor(
    private logger: IUi2QpLogger,
    public type: string,
    public defaultVal: any,
    private serializer: SerializeFunc,
    private deserializer: DeserializeFunc,
    public qpName?: string,
    state?: any,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(state, validatorOrOpts, asyncValidator);

    this.logger.debug('Ui2QpControl.constructor');
    this.logger.debug('Params passed into the function: ', this.type, this.defaultVal, this.serializer, this.deserializer, state,
      validatorOrOpts, asyncValidator);
  }

  /**
   * Deserialize the value passed and if it's invalid returns the default value
   * @param value Value to Validate
   */
  private deserializeValue(value: any): any {

    this.logger.info('Ui2QpControl.deserializeValue');
    this.logger.debug('Params passed into the function', value);

    if (value === undefined || value === null) {

      this.logger.trace('Value passed is undefined or null');
      this.logger.debug('Returned Value is the default one: ', this.defaultVal);

      return this.defaultVal;
    } else {

      this.logger.trace('Value passed is not undefined or null so is passed to the deserializer');

      const returnValue = this.deserializer(value, this.defaultVal);

      this.logger.debug('Returned Value is the default one: ', returnValue);

      return returnValue;
    }
  }

  /**
   * Return the Ui2QpControl value after applying the serializer
   */
  getValue(): any {
    this.logger.info('Ui2QpControl.getValue');

    const returnValue = this.serializer(this.value);
    this.logger.debug('returnValue: ', returnValue);

    return returnValue;
  }

  /** Updates Control's value after been deserialized
   * @param value The new value for the control.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the value changes.
   */
  updateValue(value: any, options?: UpdateValueOptions) {

    this.logger.info('Ui2QpControl.setValue');
    this.logger.debug('Params passed into the function', value, options);

    const valueToSet = this.deserializeValue(value);

    this.logger.debug('Value to set to the Control: ', valueToSet);

    this.setValue(valueToSet, options);
  }
}
