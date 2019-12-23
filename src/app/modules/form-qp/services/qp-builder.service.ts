import { Injectable, Inject } from '@angular/core';
import { QpRouter, QP_ROUTER_ADAPTER } from '../interfaces/qp-router';
import { QpRoot } from '../classes/qp-root';
import { ValidatorFn, AbstractControl, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { QpGroup } from '../classes/qp-group';
import { QpSettings } from '../types/qp-settings';
import { CUSTOM_DESERIALIZERS } from '../serializers/custom-deserializers';
import { QpControl } from '../classes/qp-control';
import { DEFAULT_SERIALIZER } from '../serializers/custom-serializers';
import { QpSerializeFunc, QpDeserializeFunc } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class QpBuilderService {

  private customDeserializers = CUSTOM_DESERIALIZERS;
  private defaultSerializer = DEFAULT_SERIALIZER;

  constructor(@Inject(QP_ROUTER_ADAPTER) private qpRouter: QpRouter) {

  }

  public qpRoot(
    settings: QpSettings,
    controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ): QpRoot {
    const qpRoot = new QpRoot(this.qpRouter, settings, controls, validatorOrOpts, asyncValidators);
    return qpRoot;
  }

  public qpGroup(
    controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ): QpGroup {
    const qpGroup = new QpGroup(controls, validatorOrOpts, asyncValidators);
    return qpGroup;
  }

  public qpFormControl(type: string = 'string', defaultVal: any = null, serializer?: QpSerializeFunc,
    deserializer?: QpDeserializeFunc, formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): QpControl {

    let serializerToInclude = serializer;
    let deserializerToInclude = deserializer;

    if (serializer === undefined || serializer === null) {
      serializerToInclude = this.defaultSerializer;
    }

    if (deserializer === undefined || deserializer === null) {
      for (const deserealizer of this.customDeserializers) {
        if (deserealizer.type === type) {
          deserializerToInclude = deserealizer.deserializerFunc;
          break;
        }
      }
      if (deserializerToInclude === undefined) {
        throw new Error ('You need to provide a deserializer for the control');
      }
    }

    return new QpControl(type, defaultVal, serializerToInclude, deserializerToInclude,
      formState, validatorOrOpts, asyncValidator);
  }
}
