import {
  FormGroup,
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';
import {isEmpty} from '../helpers/empty-helper';
import {Ui2QpFormControl} from './ui2qp-form-control';
import {Action, ActionType} from '../types/action';

export class Ui2QpFormGroup extends FormGroup {
  /** Query param value for this FormGroup */
  private qpValue = {};

  /** Creates a Ui2QpFormGroup
   * @param controls Set of Controls that are initialized with the Group.
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   * @param asyncValidator A single async validator or array of async validator functions
   */
  constructor(
    controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super({}, validatorOrOpts, asyncValidators);
    this.insertControls(controls);
  }

  /**
   * Insert controls to the Ui2QpFormGroup
   * @param controls - Controls to insert.
   */
  insertControls(controls: { [key: string]: AbstractControl }) {
    if (controls !== undefined && controls !== null) {
      Object.keys(controls).forEach((key) => {
        this.addControl(key, controls[key]);
      });
    }
  }

  /**
   * Returns the current value
   */
  getValue(): any {
    const value = {};
    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];
      if (control instanceof Ui2QpFormGroup) {
        value[key] = control.exec({type: ActionType.GetValue});
      } else if (control instanceof Ui2QpFormControl) {
        value[key] = control.getValue();
      }
    });
    return value;
  }

  /**
   * Initialize a control after being added to a Ui2QpFormGroup.
   * This method tries to find the corresponding value for this control
   * in the query params and if it exist then it assigns the value to the control.
   * Is important to mention that the value of a control depends of the position it has in the Ui2QpFormGroup, this is due to
   * the query params are defined depending of the structure of the form.
   * @param name Name or key that identifies the control.
   * @param control QpControl to initialize
   */
  initControl(name: string, control: AbstractControl) {
    if (control instanceof Ui2QpFormGroup) {
      // If the control to add is a Ui2QpFormGroup then updating its path and the value of the controls it contains
      const notificationPayload = {
        value: this.qpValue[name] !== undefined ? this.qpValue[name] : {},
      };
      (control as Ui2QpFormGroup).exec({
        type: ActionType.Add,
        data: notificationPayload,
      });
    } else if (control instanceof Ui2QpFormControl) {
      const queryParamValue =
        this.qpValue !== undefined && this.qpValue !== null
          ? this.qpValue[name]
          : null;
      // Update the control value only if the queryParams has a value for the control, if not keep the same value
      control.setValue(
        !isEmpty(queryParamValue) ? queryParamValue : control.value
      );
    }
  }

  /**
   * Adds a Control to the Ui2QpFormGroup.
   * When whatever kind of Control is added to a Ui2QpFormGroup its initial value will depends if
   * a corresponding value is found in the Query Params of the URL, if not then the current value of
   * the Control will be kept.
   * @param name Name of the control to be added.
   * @param control The control instance to add
   */
  addControl(name: string, control: AbstractControl) {
    // Adding the control to the form group
    super.addControl(name, control);
    this.initControl(name, control);
  }

  // Removes controls from the formGroup and its settings
  removeControl(name: string) {
    super.removeControl(name);
  }

  /**
   * Execute some predefined actions.
   * This method is used for executing predefined actions in the Ui2QpFormGroup from outside
   * is the way the a parent Ui2QpFormGroup notifies it's Ui2QpFormGroup children of what they should do.
   * @param action Action to execute in this Ui2QpFormGroup
   */
  exec(action?: Action): any {
    switch (action.type) {
      // after an add event is fired
      case ActionType.Add: {
        this.qpValue = action.data.value;
        Object.keys(this.controls).forEach((key) => {
          // updating the value from the url if it contains a value
          this.initControl(key, this.controls[key]);
        });
        break;
      }
      case ActionType.PatchValue: {
        // this.qpValue = notification.data;
        this.patchValue(action.data);
        break;
      }
      case ActionType.GetValue: {
        return this.getValue();
      }
    }
  }

  /**
   * Updates the current value of the Ui2QpFormGroup with the new value provided.
   * It updates all the children values too if required.
   * @param object New value for the Ui2QpFormGroup
   */
  patchValue(object: { [key: string]: any }) {
    this.qpValue = object;
    Object.keys(this.controls).forEach((key) => {
      const value = this.qpValue !== undefined ? this.qpValue[key] : undefined;
      if (this.controls[key] instanceof Ui2QpFormGroup) {
        (this.controls[key] as Ui2QpFormGroup).exec({
          type: ActionType.PatchValue,
          data: value,
        });
      } else if (this.controls[key] instanceof Ui2QpFormControl) {
        this.controls[key].setValue(value);
      }
    });
  }
}
