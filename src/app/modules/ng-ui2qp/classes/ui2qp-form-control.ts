import {
  FormControl,
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';
import {SerializeFunc} from '../types/serializer';
import {DeserializeFunc} from '../types/deserializer';

export class Ui2QpFormControl extends FormControl {
  /**
   * Creates a Ui2QpFormControl
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
   */
  constructor(
    public type: string,
    public defaultVal: any,
    private serializer: SerializeFunc,
    private deserializer: DeserializeFunc,
    state?: any,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(state, validatorOrOpts, asyncValidator);
  }

  /**
   * Return the FormControls value after applying the serializer
   */
  getValue(): any {
    return this.serializer(this);
  }

  /** Set a new Value to the FormControl
   * @param value The new value for the control.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the value changes.
   */
  setValue(value: any, options?: any) {
    let valueToSet;
    if (value === undefined || value === null) {
      valueToSet = this.defaultVal;
    } else {
      valueToSet = this.deserializer(value, this.defaultVal);
    }

    super.setValue(valueToSet, options);
  }
}
