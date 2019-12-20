import { FormGroup, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { isEmpty } from '../helpers/empty-helper';
import { QpControl } from './qp-control';
import { QpNotificationType } from '../types/types';
export class QpGroup extends FormGroup {
   // field that is gonna hold the current position this
  // QueryParamsFormGroup has in the form
  // this is important at the time to search for a corresponding value
  // in the query params from the URL
  private path = new Array<string>();
  // controls the types of controls this QueryParamsFormGroup has in
  // order to know how to parse and set the value
  // gotten from the query params
  constructor(controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super({} , validatorOrOpts, asyncValidators);
    this.insertControls(controls);
  }

  // registering the controls provided in the constructor
  insertControls(controls: { [key: string]: AbstractControl }, currentQpObject: object = {}) {
    if (controls !== undefined && controls !== null) {
      Object.keys(controls).forEach(key => {
        this.addQpControl(key, controls[key], currentQpObject[key]);
      });
    }
  }

  getQueryParamKey(name: string): string {
    return this.path.length > 0 ? this.path.join('.') + '.' + name : name;
  }

  getValue(): any {
    const value = {};
    Object.keys(this.controls).forEach(key => {
      const control = this.controls[key];
      if (control instanceof QpGroup) {
        value[key] = control.notify({type: 'get-value'});
      } else if (control instanceof QpControl) {
        value[key] = control.getValue();
      }
    });
    return value;
  }

   // this is for searching in URL's query params for the corresponding
   // value of the formControl added. If it exist.
   // ! Noticed that the value of a formControl is gonna depend of the
   // position it has in the form, this is due to
   // ! the query params are defined depending of the structure of the form
   initializeControl(name: string, control: AbstractControl , value?: any) {
    const queryParamKey = this.getQueryParamKey(name);

    if (control instanceof QpGroup) {
      // making the form-group to update its path and the value of the
      // controls it contains
      const formGroupValue = value !== undefined && value !== null ? value[queryParamKey] : {};
      const notificationPayload = { path: new Array<string>(...this.path, name), value: formGroupValue };
      (control as QpGroup).notify({ type: 'add', data: notificationPayload });
    } else if (control instanceof QpControl ) {
      const queryParamValue =  value !== undefined && value !== null ? value[queryParamKey] : null;
      // updating the control value only if in the queryParams is a
      // value for the control, if not keep the same value
      control.setValue(!isEmpty(queryParamValue) ? queryParamValue : control.value);
    }
  }

  // ! TODO: Think about including a float type to the allows types
  // When a formControl, QueryParamsFormGroup or other type of control
  // is added to a QueryParamsFormGroup is when we
  // need to search if it has an initial value in the query params and
  // set it, this is because the structure of the form is
  // important at the time of search for a initial value in the query
  // params.
  addQpControl(name: string, control: AbstractControl, value?: any) {
    // Adding the control to the form group
    super.addControl(name, control);
    this.initializeControl(name, control, value);
  }

  // Removes controls from the formGroup and its settings
  removeControl(name: string) {
    super.removeControl(name);
  }

  // triggers some actions depending on the type of notification it
  // receives. This method is used for the parent formGroup
  // to pass actions to its children formGroups
  notify(notification?: { type: QpNotificationType; data?: any }): any {
    switch (notification.type) {
      // after an add event is fired
      case 'add': {
        // Updating the path of this group
        this.path = notification.data.path;
        const value = notification.data.value;
        Object.keys(this.controls).forEach(key => {
          // updating the value from the url if it contains a value
          this.initializeControl(key, this.controls[key], value[key] );
        });
        break;
      }
      case 'patch-value': {
        this.patchValue(notification.data);
        break;
      }
      case 'get-value': {
        return this.getValue();
      }
    }
  }

  patchValue(object: { [key: string]: any }) {
    Object.keys(this.controls).forEach(key => {
      const value = object !== undefined ? object[key] : undefined;
      if (this.controls[key] instanceof QpGroup) {
        (this.controls[key] as QpGroup).notify({ type: 'patch-value', data: value });
      } else if (this.controls[key] instanceof QpControl) {
        this.controls[key].setValue(value);
      }
    });
  }
}
