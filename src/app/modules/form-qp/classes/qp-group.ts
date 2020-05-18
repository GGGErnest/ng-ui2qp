import { FormGroup, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { isEmpty } from '../helpers/empty-helper';
import { QpControl } from './qp-control';
import { QpNotificationType } from '../types/types';
export class QpGroup extends FormGroup {
  /** Query param value for this FormGroup */
  private qpValue = {};

  /**
   * @param controls - Set of Controls that are initialized with the Group.
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   * @param asyncValidator A single async validator or array of async validator functions
   */
  constructor(controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super({} , validatorOrOpts, asyncValidators);
    this.insertControls(controls);
  }

  /**
   * Append the controls to the QpGroup
   * @param controls - Controls to insert.
   */
  insertControls(controls: { [key: string]: AbstractControl }) {
    if (controls !== undefined && controls !== null) {
      Object.keys(controls).forEach(key => {
        this.addControl(key, controls[key]);
      });
    }
  }
  /**
   * Returns the current value of the form group
   */
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
   // ! position it has in the form, this is due to
   // ! the query params are defined depending of the structure of the form
   initializeControl(name: string, control: AbstractControl) {

    if (control instanceof QpGroup) {
      // making the form-group to update its path and the value of the
      // controls it contains
      const notificationPayload = {value: (this.qpValue[name] !== undefined ? this.qpValue[name] : {})};
      (control as QpGroup).notify({ type: 'add', data: notificationPayload });
    } else if (control instanceof QpControl ) {
      const queryParamValue =  this.qpValue !== undefined && this.qpValue !== null ? this.qpValue[name] : null;
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
  addControl(name: string, control: AbstractControl) {
    // Adding the control to the form group
    super.addControl(name, control);
    this.initializeControl(name, control);
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
        this.qpValue = notification.data.value;
        Object.keys(this.controls).forEach(key => {
          // updating the value from the url if it contains a value
          this.initializeControl(key, this.controls[key] );
        });
        break;
      }
      case 'patch-value': {
        // this.qpValue = notification.data;
        this.patchValue(notification.data);
        break;
      }
      case 'get-value': {
        return this.getValue();
      }
    }
  }

  patchValue(object: { [key: string]: any }) {
    this.qpValue = object;
    Object.keys(this.controls).forEach(key => {
      const value = this.qpValue !== undefined ? this.qpValue[key] : undefined;
      if (this.controls[key] instanceof QpGroup) {
        (this.controls[key] as QpGroup).notify({ type: 'patch-value', data: value });
      } else if (this.controls[key] instanceof QpControl) {
        this.controls[key].setValue(value);
      }
    });
  }
}
