import { ControlSettings } from '../interfaces/control-settings';
import { AbstractControl } from '@angular/forms';

// ? the form fields types could be defined by the developer and
// ? assigned to custom serializers,
// ? that will make this module more flexible and reusable
// type that defines the form field. Its used to know how to parse and
// set the initial value gotten from the query params to the control
export declare type FormFieldType =
   | 'string'
   | 'number'
   | 'array-string'
   | 'array-number'
   | 'datetime-picker'
   | 'form-group';

// type of notification that is passed to the QueryParamsFormGroup in
// order to execute different types of actions
export declare type NotificationType = 'add' | 'patch-value';

export declare type QpAbstractControl = { control: AbstractControl; controlSettings: ControlSettings } ;
