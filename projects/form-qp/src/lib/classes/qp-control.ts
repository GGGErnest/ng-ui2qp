import { FormControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
import { QpDeserializeFunc, QpSerializeFunc } from '../types/types';

export class QpControl extends FormControl {
  constructor(
    public type: string,
    public defaultVal: any,
    private serializer: QpSerializeFunc,
    private deserializer: QpDeserializeFunc,
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }

  getValue(): any {
    return this.serializer(this);
  }

  setValue(value: any, options?: any) {
    let valueToSet = value;
    if (value === undefined || value === null) {
      valueToSet = this.defaultVal;
    } else {
      valueToSet = this.deserializer(value, this.defaultVal);
    }

    super.setValue(valueToSet, options);
  }
}
