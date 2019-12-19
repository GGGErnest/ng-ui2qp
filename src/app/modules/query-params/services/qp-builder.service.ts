import { Injectable, Inject } from '@angular/core';
import { QpRouter, QP_ROUTER_ADAPTER } from '../interfaces/qp-router';
import { QpRoot } from '../classes/qp-root';
import { ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ControlSettings } from '../classes/query-params-form-group';
import { QpGroup } from '../classes/qp-group';

@Injectable({
  providedIn: 'root'
})
export class QpBuilderService {

  constructor(@Inject(QP_ROUTER_ADAPTER) private qpRouter: QpRouter) {

  }

  public qpRoot(
    controls?: { [key: string]: { control: AbstractControl; controlSettings: ControlSettings } },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ): QpRoot {
    const qpRoot = new QpRoot(this.qpRouter, controls, validatorOrOpts, asyncValidators);
    return qpRoot;
  }

  public qpGroup(
    controls?: { [key: string]: { control: AbstractControl; controlSettings: ControlSettings } },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ): QpGroup {
    const qpGroup = new QpGroup(controls, validatorOrOpts, asyncValidators);
    return qpGroup;
  }
}
