import {Inject, Injectable} from '@angular/core';
import {IUi2QpRouter, UI2QP_ROUTER_INJ_TOK} from '../interfaces/router';
import {Ui2QpRoot} from '../classes/root';
import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {Ui2QpGroup} from '../classes/group';
import {Settings} from '../types/settings';
import {Ui2QpControl} from '../classes/control';
import {Ui2QpSerializersService} from './serializers.service';
import {Ui2QpDeserializersService} from './deserializers.service';
import {IUi2QpLogger, UI2QP_LOGGER_INJ_TOK} from '../interfaces/logger';

@Injectable()
export class Ui2QpBuilder {
  /**
   * Creates a new UiQpBuilder which is use to create and setup the QpGroup and QpControls in a component.
   * This service should be used for the before mentioned and not try to create the all Query Params structure manually
   * @param router Router adapter to be used
   * @param logger Logger service to be used
   * @param serializersService Serializers service where to get all the registered serializers
   * @param deserializersService Deserializers service where to get all the registered deserializers
   */
  constructor(@Inject(UI2QP_ROUTER_INJ_TOK) private router: IUi2QpRouter,
              @Inject(UI2QP_LOGGER_INJ_TOK) private logger: IUi2QpLogger,
              private serializersService: Ui2QpSerializersService,
              private deserializersService: Ui2QpDeserializersService) {

    this.logger.debug('Ui2QpBuilder.constructor');
    this.logger.debug('Params passed into the function', router, serializersService, deserializersService);
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
    model?: { [key: string]: Ui2QpGroup | Ui2QpControl } | Ui2QpGroup,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): Ui2QpRoot {

    this.logger.info('Ui2QpBuilder.root');
    this.logger.debug('Params passed into the function', settings, model, validatorOrOpts, asyncValidators);
    this.logger.info('Creating a Ui2QpRoot');
    this.logger.trace('Creating a new Ui2QpRoot');

    return new Ui2QpRoot(
      this.router,
      this.logger,
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
  ): Ui2QpGroup {

    this.logger.info('Ui2QpBuilder.group');
    this.logger.debug('Params passed into the function', controls, validatorOrOpts, asyncValidators);
    this.logger.info('Creating a Ui2QpGroup');
    this.logger.trace('Creating q new Ui2QpGroup');

    return new Ui2QpGroup(this.logger, controls, validatorOrOpts, asyncValidators);
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
  ): Ui2QpControl {

    this.logger.info('Ui2QpBuilder.control');
    this.logger.debug('Params passed into the function', type, defaultVal, state, validatorOrOpts, asyncValidator);
    this.logger.info('Creating a Ui2QpControl');
    this.logger.trace('Resolving the right deserializer and serializer from the SerializersServices DeserializersServices');

    const serializerToInclude = this.serializersService.getSerializer(type);
    const deserializerToInclude = this.deserializersService.getDeserializer(type);

    this.logger.debug('serializerToInclude: ', serializerToInclude);
    this.logger.debug('deserializerToInclude: ', deserializerToInclude);

    if (!(serializerToInclude || deserializerToInclude)) {
      throw new Error(`We couldn't find any registered deserializer for the control type "${type}". Please register one for this type`);
    }

    this.logger.trace('Creating a new Ui2QpControl');

    return new Ui2QpControl(
      this.logger,
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
