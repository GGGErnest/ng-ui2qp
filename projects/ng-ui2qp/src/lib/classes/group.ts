import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn} from '@angular/forms';
import {isEmpty} from '../helpers/empty-helper';
import {Ui2QpControl} from './control';
import {Action, ActionType} from '../types/action';
import {IUi2QpLogger} from '../interfaces/logger';
import {UpdateValueOptions} from '../types/update-value-options';

export class Ui2QpGroup extends FormGroup {
  /** Query param value for this FormGroup */
  private qpValue = {};

  /** Creates a Ui2QpGroup
   * @param logger Logger to be use
   * @param qpName Query Param name that identifies this control
   * @param controls Set of Controls that are initialized with the Group.
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   * @param asyncValidators A single async validator or array of async validator functions
   */
  constructor(
    private logger: IUi2QpLogger,
    public qpName?: string,
    controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super({}, validatorOrOpts, asyncValidators);

    this.logger.debug('Ui2QpGroup.constructor');
    this.logger.debug('Params passed into the function', this.controls, validatorOrOpts, asyncValidators);

    this.logger.trace('Calling "insertControls" with "controls" as param');
    this.addControls(controls);
  }

  /**
   * Add controls to the Ui2QpGroup
   * @param controls - Controls to insert.
   */
  addControls(controls: { [key: string]: AbstractControl }) {

    this.logger.info('Ui2QpGroup.insertControls');
    this.logger.debug('Params passed into the function', controls);
    this.logger.info('Add the provided controls as a children of the current Ui2QpGroup');

    if (controls !== undefined && controls !== null) {

      this.logger.trace('Iterating through all controls provided as param');

      Object.keys(controls).forEach((key) => {

        this.logger.trace('key: ', key);
        this.logger.trace('control: ', controls[key]);
        this.logger.trace('Calling "addControl" with "key" and "control" as params');

        this.addControl(key, controls[key]);
      });
    }
  }

  /**
   * Returns the current value
   */
  getValue(): any {

    this.logger.info('Ui2QpGroup.getValue');
    this.logger.info('Getting Ui2QpGroup\'s value');

    const value = {};

    this.logger.trace('Iterating through all the controls within this Ui2QpGroup');

    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];
      // Finding if the control has a defined qpName. Treating the control as a Ui2QpControl just to get the qpName, this is possible
      // because both Ui2QpControl and Ui2QpGroup have that property
      const qpName = (control as Ui2QpGroup).qpName || key;

      this.logger.trace('control: ', control);
      this.logger.trace('key: ', key);

      if (control instanceof Ui2QpGroup) {

        this.logger.trace('The current control is a Ui2QpGroup');

        const actionToExecute = {type: ActionType.GetValue};

        this.logger.trace('Action to pass into the Ui2QpGroup to be executed: ', actionToExecute);

        value[qpName] = control.exec({type: ActionType.GetValue});

        this.logger.trace('value returned by the Ui2QpGroup: ', value[qpName]);

      } else if (control instanceof Ui2QpControl) {

        this.logger.trace('The current control is a Ui2QpControl');

        value[qpName] = control.getValue();

        this.logger.trace('value returned by the Ui2QpControl: ', value[qpName]);

      }
    });

    this.logger.debug('Returned value: ', value);

    return value;
  }

  /**
   * Sets the initial value of a control after being added to a Ui2QpGroup.
   * This method tries to find the corresponding value for the control
   * in the query params and if it exist then it assigns the value to the control.
   * Is important to mention that the value of a control depends of it's position in the Ui2QpGroup, this is due to
   * the query params are defined depending of the structure of the form.
   * @param name Name or key that identifies the control.
   * @param control QpControl to initialize
   */
  setControlInitValue(name: string, control: AbstractControl) {

    this.logger.info('Ui2QpGroup.initControl');
    this.logger.debug('Params passed into the function', name, control);
    this.logger.info('Overrides the control\'s initial value with it\'s corresponding value from the Qps if exist');

    // Finding if the control has a defined qpName. Treating the control as a Ui2QpControl just to get the qpName, this is possible
    // because both Ui2QpControl and Ui2QpGroup have that property
    const qpName = (control as Ui2QpGroup).qpName || name;

    if (control instanceof Ui2QpGroup) {

      this.logger.debug('control is a Ui2QpGroup');

      const payloadValue = this.qpValue[qpName] !== undefined ? this.qpValue[qpName] : {};

      // If the control to add is a Ui2QpGroup then update its path and the value of the controls it contains
      const actionToExecute = {
        type: ActionType.Add,
        data: {
          value: payloadValue,
        },
      };

      this.logger.debug('Action to pass into the Ui2QpGroup to be executed: ', actionToExecute);

      (control as Ui2QpGroup).exec(actionToExecute);

    } else if (control instanceof Ui2QpControl) {

      this.logger.debug('control is a Ui2QpControl');

      const queryParamValue = (this.qpValue !== undefined && this.qpValue !== null) ? this.qpValue[qpName] : null;

      this.logger.trace('queryParamValue', queryParamValue);
      this.logger.trace('Setting the value gotten from the QPs to this control if is not empty');

      // Update the control value only if the queryParams has a value for the control, if not keep the initial value of the control
      const valueToAssign = !isEmpty(queryParamValue) ? queryParamValue : control.value;

      this.logger.debug('valueToAssign', valueToAssign);

      control.updateValue(valueToAssign);
    }
  }

  /**
   * Adds a Control to the Ui2QpGroup.
   * When whatever kind of Control is added to a Ui2QpGroup its initial value will depends if
   * a corresponding value is found in the Query Params of the URL, if not then the current value of
   * the Control will be kept.
   * @param name Name of the control to be added.
   * @param control The control instance to add
   */
  addControl(name: string, control: AbstractControl) {

    this.logger.info('Ui2QpGroup.addControl');
    this.logger.debug('Params passed into the function', name, control);
    this.logger.trace('Calling "super.addControl"');
    this.logger.info('Adds the control to this Ui2QpGroup and initializes its value');
    // Adding the control to the form group
    super.addControl(name, control);

    this.logger.trace('Calling "initControl"');

    this.setControlInitValue(name, control);
  }

  /**
   * Removes the control from the Ui2QpGroup.
   * @param name Name of the control to be removed. The name provided is the control name not the Qp's name
   */
  removeControl(name: string) {

    this.logger.info('Ui2QpGroup.removeControl');
    this.logger.debug('Params passed into the function', name);
    this.logger.info('Removing control from the Ui2QpGroup');
    this.logger.trace('Calling "super.removeControl"');

    super.removeControl(name);
  }

  /**
   * Execute some predefined actions.
   * This method is used for executing predefined actions in the Ui2QpGroup from outside
   * is the way the a parent Ui2QpGroup notifies it's Ui2QpGroup children of what they should do.
   * @param action Action to execute in this Ui2QpGroup
   */
  exec(action?: Action): any {

    this.logger.info('Ui2QpGroup.exec');
    this.logger.debug('Params passed into the function', action);
    this.logger.info('Executing the action in the Ui2QpGroup');

    let returnValue;

    switch (action.type) {
      // after an add event is fired
      case ActionType.Add: {

        this.logger.trace('Action type is Add');

        this.qpValue = action.data.value;

        this.logger.trace('qpValue: ', this.qpValue);
        this.logger.trace('Iterating through all the controls of this Ui2QpGroup');

        Object.keys(this.controls).forEach((key) => {

          this.logger.trace('key: ', key);
          this.logger.trace('control: ', this.controls[key]);
          this.logger.debug('Calling initControl');

          // updating the value from the url if it contains a value
          this.setControlInitValue(key, this.controls[key]);
        });
        break;
      }
      case ActionType.PatchValue: {

        this.logger.trace('Action type is PatchValue');
        this.logger.trace('Calling patchValue with "action.data" as params');

        this.patchValue(action.data.value, action.data.controlOptions);
        break;
      }
      case ActionType.GetValue: {

        this.logger.trace('Action type is GetValue');
        this.logger.trace('Calling getValue and returning its value');

        returnValue = this.getValue();
        break;
      }
    }

    this.logger.debug('Value returned: ', returnValue);

    return returnValue;
  }

  /**
   * Updates the current value of the Ui2QpGroup with the new value provided.
   * It updates all the children values too if required.
   * @param object New value for the Ui2QpGroup
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is updated.
   */
  patchValue(object: { [key: string]: any }, options?: UpdateValueOptions) {

    this.logger.debug('Ui2QpGroup.patchValue');
    this.logger.debug('Params passed into the function', object);
    this.logger.info('Updating the Ui2QpGroup value');

    this.qpValue = !isEmpty(object) ? object : {};

    this.logger.trace('qpValue:', this.qpValue);
    this.logger.trace('Iterating through all controls');

    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];

      // Finding if the control has a defined qpName. Treating the control as a Ui2QpControl just to get the qpName, this is possible
      // because both Ui2QpControl and Ui2QpGroup have that property
      const qpName = (control as Ui2QpGroup).qpName || key;

      this.logger.trace('key', key);
      this.logger.debug('Current Control', control);
      this.logger.trace('Query Params corresponding value for this Control', this.qpValue[key]);

      if (control instanceof Ui2QpGroup) {

        this.logger.trace('Current Control is a Ui2QpGroup');

        const actionToExecute = {
          type: ActionType.PatchValue,
          data: {
            value: this.qpValue[qpName],
            controlOptions: options
          },
        };

        this.logger.debug('Action to pass into the Ui2QpGroup to be executed: ', actionToExecute);

        (control as Ui2QpGroup).exec(actionToExecute);

      } else if (control instanceof Ui2QpControl) {

        this.logger.trace('Current Control is a Ui2QpControl');
        this.logger.debug('value to set in the current control: ', this.qpValue[qpName]);

        (control as Ui2QpControl).updateValue(this.qpValue[qpName], options);
      }
    });
  }
}
