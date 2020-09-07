/**
 * This code was taken from Angular src code and done some small modifications, check
 * https://github.com/angular/angular/blob/10.0.x/packages/forms/src/directives/shared.ts#L189
 */

import {
  CheckboxControlValueAccessor,
  ControlValueAccessor,
  DefaultValueAccessor,
  NumberValueAccessor,
  RadioControlValueAccessor,
  RangeValueAccessor,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor
} from '@angular/forms';

const ANGULAR_BUILTIN_ACCESSORS = [
  CheckboxControlValueAccessor,
  RangeValueAccessor,
  NumberValueAccessor,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
  RadioControlValueAccessor,
];

export function isAngularBuiltInAccessor(valueAccessor: ControlValueAccessor): boolean {
  return ANGULAR_BUILTIN_ACCESSORS.some(a => valueAccessor.constructor === a);
}

export function selectValueAccessor(valueAccessors: ControlValueAccessor[]): ControlValueAccessor {
  if (!valueAccessors) {
    return null;
  }

  let defaultAccessor: ControlValueAccessor;
  let builtinAccessor: ControlValueAccessor;
  let customAccessor: ControlValueAccessor;

  valueAccessors.forEach((v: ControlValueAccessor) => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;

    } else if (isAngularBuiltInAccessor(v)) {
      if (builtinAccessor) {
        throw new Error('More than one built-in value accessor matches form control with');
      }
      builtinAccessor = v;

    } else {
      if (customAccessor) {
        throw new Error('More than one custom value accessor matches form control with');
      }
      customAccessor = v;
    }
  });

  if (customAccessor) {
    return customAccessor;
  }
  if (builtinAccessor) {
    return builtinAccessor;
  }
  if (defaultAccessor) {
    return defaultAccessor;
  }

  throw Error('No suitable ControlValueAccessor was found. Please provide one.');

}

