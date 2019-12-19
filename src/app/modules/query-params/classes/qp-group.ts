import { FormGroup, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { isEmpty } from '../helpers/empty-helper';
import { NotificationType, QpAbstractControl } from '../types/types';

export class QpGroup extends FormGroup {
   // field that is gonna hold the current position this
  // QueryParamsFormGroup has in the form
  // this is important at the time to search for a corresponding value
  // in the query params from the URL
  private path = new Array<string>();
  // controls the types of controls this QueryParamsFormGroup has in
  // order to know how to parse and set the value
  // gotten from the query params
  private controlsSettings: { [key: string]: ControlSettings } = {};

  constructor(controls?: { [key: string]: QpAbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super({} , validatorOrOpts, asyncValidators);
  }

  // registering the controls provided in the constructor
  insertControls(controls: { [key: string]: QpAbstractControl }, currentQpObject: object = {}) {
    if (controls !== undefined && controls !== null) {
      Object.keys(controls).forEach(key => {
        this.addQpControl(key, controls[key], currentQpObject[key]);
      });
    }
  }

  getQueryParamKey(name: string): string {
    return this.path.length > 0 ? this.path.join('.') + '.' + name : name;
  }

  // ? This method could be implemented in a way that make the
  // serializers configurable or passed as a function to the formGroup
  // Method that knows how to set the value to the controls depending
  // of its type
  setControlValue(value: any, control: QpAbstractControl) {
    if (value === undefined || value === null) {
      control.control.setValue(control.controlSettings.defaultVal);
    } else {

    }
  }

   // this is for searching in URL's query params for the corresponding
   // value of the formControl added. If it exist.
   // ! Noticed that the value of a formControl is gonna depend of the
   // position it has in the form, this is due to
   // ! the query params are defined depending of the structure of the form
   initializeControl(name: string, control: QpAbstractControl, value?: any) {
    const queryParamKey = this.getQueryParamKey(name);

    if (control.controlSettings.type === 'form-group') {
      // making the form-group to update its path and the value of the
      // controls it contains
      const formGroupValue = value !== undefined && value !== null ? value[queryParamKey] : {};
      const notificationPayload = { path: new Array<string>(...this.path, name), value: formGroupValue };
      (control.control as QpGroup).notify({ type: 'add', data: notificationPayload });
    } else {
      const queryParamValue =  value !== undefined && value !== null ? value[queryParamKey] : null;
      // updating the control value only if in the queryParams is a
      // value for the control, if not keep the same value
      this.setControlValue(!isEmpty(queryParamValue) ? queryParamValue
      : control.control.value, control);
    }
  }

  // ! TODO: Think about including a float type to the allows types
  // When a formControl, QueryParamsFormGroup or other type of control
  // is added to a QueryParamsFormGroup is when we
  // need to search if it has an initial value in the query params and
  // set it, this is because the structure of the form is
  // important at the time of search for a initial value in the query
  // params.
  addQpControl(name: string, control: QpAbstractControl, value?: any) {
    // Adding the control to the form group
    super.addControl(name, control.control);
    this.initializeControl(name, control, value);
    this.controlsSettings[name] = control.controlSettings;
  }

  // Removes controls from the formGroup and its settings
  removeControl(name: string) {
    super.removeControl(name);
    delete this.controlsSettings[name];
  }

  // triggers some actions depending on the type of notification it
  // receives. This method is used for the parent formGroup
  // to pass actions to its children formGroups
  notify(notification?: { type: NotificationType; data?: any }) {
    switch (notification.type) {
      // after an add event is fired
      case 'add': {
        // Updating the path of this group
        this.path = notification.data.path;
        const value = notification.data.value;
        Object.keys(this.controls).forEach(key => {
          // updating the value from the url if it contains a value
          this.initializeControl(key, {control: this.controls[key], controlSettings: this.controlsSettings[key]}, value[key] );
        });
        break;
      }
      case 'patch-value': {
        this.patchValue(notification.data);
        break;
      }
    }
  }

  patchValue(object: { [key: string]: any }) {
    Object.keys(this.controls).forEach(key => {
      const value = object !== undefined ? object[key] : undefined;
      if (this.controlsSettings[key].type === 'form-group') {
        (this.controls[key] as QpGroup).notify({ type: 'patch-value', data: value });
      } else {
        this.setControlValue(value, {control: this.controls[key], controlSettings: this.controlsSettings[key]});
      }
    });
  }
}
