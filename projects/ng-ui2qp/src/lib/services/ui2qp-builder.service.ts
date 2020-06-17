import {Inject, Injectable} from '@angular/core';
import {QP_ROUTER_ADAPTER, Ui2QpRouter} from '../interfaces/ui2qp-router';
import {Ui2QpRoot} from '../classes/ui2qp-root';
import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import {Ui2QpFormGroup} from '../classes/ui2qp-form-group';
import {Settings} from '../types/settings';
import {Ui2QpFormControl} from '../classes/ui2qp-form-control';
import {Ui2QpSerializersService} from './ui2qp-serializers.service';
import {Ui2QpDeserializersService} from './ui2qp-deserializers.service';

@Injectable({
  providedIn: 'root',
})
export class Ui2QpBuilder {
  /**
   * Creates a new UiQpBuilder which is use to create and setup the QpGroup and QpControls in a component.
   * This service should be used for the before mentioned and not try to create the all Query Params structure manually
   * @param qpRouter Router adapter to be use
   * @param serializersService Serializers service where to get all the registered serializers
   * @param deserializersService Deserializers service where to get all the registered deserializers
   */
  constructor(@Inject(QP_ROUTER_ADAPTER) private qpRouter: Ui2QpRouter,
              private serializersService: Ui2QpSerializersService,
              private deserializersService: Ui2QpDeserializersService) {
  }

  /**
   * Creates an instance of the Ui2qpRoot
   * @param settings Settings to be used
   * @param model Initial model that defines the parameters
   * @param validatorOrOpts Initial Validators or Options
   * @param asyncValidators Initial AsyncValidators
   */
  public root(
    settings: Settings,
    model?: { [key: string]: Ui2QpFormGroup | Ui2QpFormControl } | Ui2QpFormGroup,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): Ui2QpRoot {
    return new Ui2QpRoot(
      this.qpRouter,
      settings,
      model,
      validatorOrOpts,
      asyncValidators
    );
  }

  /**
   * Creates a Ui2QpFormGroup
   * @param controls Initial controls to be added to the QpGroup
   * @param validatorOrOpts Initial Validators or Options
   * @param asyncValidators Initial AsyncValidators
   */
  public group(
    controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): Ui2QpFormGroup {
    return new Ui2QpFormGroup(controls, validatorOrOpts, asyncValidators);
  }

  /**
   * Creates a new Ui2QpFormControl
   * @param type QpControl's type
   * @param defaultVal Default value
   * @param state Initial state of this control
   * @param validatorOrOpts Initial Validators or Options
   * @param asyncValidator Initial AsyncValidators
   */
  public control(
    type: string = 'string',
    defaultVal: any = null,
    state?: any,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): Ui2QpFormControl {
    const serializerToInclude = this.serializersService.getSerializer(type);
    const deserializerToInclude = this.deserializersService.getDeserializer(type);

    if (!serializerToInclude) {
      throw new Error(`We couldn't find any registered serializer for the control type "${type}". Please register one for this type`);
    }

    if (!(serializerToInclude || deserializerToInclude)) {
      throw new Error(`We couldn't find any registered deserializer for the control type "${type}". Please register one for this type`);
    }

    return new Ui2QpFormControl(
      type,
      defaultVal,
      serializerToInclude,
      deserializerToInclude,
      state,
      validatorOrOpts,
      asyncValidator
    );
  }
}
