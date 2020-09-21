import { Inject, Injectable } from '@angular/core';

import { IUi2QpRouter, UI2QP_ROUTER_INJ_TOK } from '../interfaces/router';
import { Ui2QpRoot } from '../classes/root';
import { Ui2QpGroup } from '../classes/group';
import { Ui2QpControl } from '../classes/control';
import { NgUI2QpSettings, UI2QP_SETTINGS_INJ_TOK } from '../types/settings';
import {
  DEFAULT_UI2QP_CONTROL_SETTINGS,
  DEFAULT_UI2QP_GROUP_SETTINGS,
  Ui2QpControlSettings,
  Ui2QpGroupSettings
} from '../types/control-settings';
import { Ui2QpSerializersService } from './serializers.service';
import { Ui2QpDeserializersService } from './deserializers.service';
import { IUi2QpLogger, UI2QP_LOGGER_INJ_TOK } from '../interfaces/logger';
import { mergeObjects } from '../helpers/object-helpers';

@Injectable()
export class Ui2QpBuilder {
  /**
   * Creates a new UiQpBuilder which is use to create and setup the QpGroup and QpControls in a component.
   * This service should be used for the before mentioned and not try to create the all Query Params structure manually
   * @param router Router adapter to be used
   * @param logger Logger service to be used
   * @param serializersService Serializers service where to get all the registered serializers
   * @param deserializersService Deserializers service where to get all the registered deserializers
   * @param settings NgUI2QpSettings settings to be used mainly by the Ui2QpRoot.
   */
  constructor(@Inject(UI2QP_SETTINGS_INJ_TOK) private settings: NgUI2QpSettings,
              @Inject(UI2QP_ROUTER_INJ_TOK) private router: IUi2QpRouter,
              @Inject(UI2QP_LOGGER_INJ_TOK) private logger: IUi2QpLogger,
              private serializersService: Ui2QpSerializersService,
              private deserializersService: Ui2QpDeserializersService) {

    this.logger.debug('Ui2QpBuilder.constructor');
    this.logger.debug('Params passed into the function', router, serializersService, deserializersService);
  }

  /**
   * Creates an instance of the Ui2QpRoot
   * @param model Initial model that defines the parameters
   */
  public root(
    model?: Ui2QpGroup,
  ): Ui2QpRoot {

    this.logger.info('Ui2QpBuilder.root');
    this.logger.debug('Params passed into the function', this.settings, model);
    this.logger.info('Creating a Ui2QpRoot');
    this.logger.trace('Creating a new Ui2QpRoot');

    return new Ui2QpRoot(
      this.router,
      this.logger,
      this.settings,
      model
    );
  }

  /**
   * Creates a Ui2QpGroup
   * @param controls Initial controls to be added to the QpGroup
   * @param settings Settings to be set to the Ui2QpGroup that will be created
   */
  public group(
    controls?: { [key: string]: Ui2QpControl | Ui2QpGroup },
    settings?: Ui2QpGroupSettings
  ): Ui2QpGroup {

    this.logger.info('Ui2QpBuilder.group');
    this.logger.debug('Params passed into the function', controls, settings);
    this.logger.info('Creating a Ui2QpGroup');

    const settingsToUse = mergeObjects(settings, DEFAULT_UI2QP_GROUP_SETTINGS);

    this.logger.debug('Current used settings', settingsToUse);
    this.logger.trace('Creating q new Ui2QpGroup');

    return new Ui2QpGroup(
      this.logger,
      settingsToUse.qpName,
      controls,
      settingsToUse.validatorOrOpts,
      settingsToUse.asyncValidators
    );
  }

  /**
   * Creates a new Ui2QpControl
   * @param settings Settings to be set to the Ui2QpControl that will be created
   */
  public control(
    settings?: Ui2QpControlSettings
  ): Ui2QpControl {

    this.logger.info('Ui2QpBuilder.control');
    this.logger.debug('Params passed into the function', settings);
    this.logger.info('Creating a Ui2QpControl');
    this.logger.trace('Resolving the right deserializer and serializer from the SerializersServices DeserializersServices');

    const settingsToUse = mergeObjects(settings, DEFAULT_UI2QP_CONTROL_SETTINGS);
    const serializerToInclude = this.serializersService.getSerializer(settingsToUse.type);
    const deserializerToInclude = this.deserializersService.getDeserializer(settingsToUse.type);

    this.logger.debug('controlType: ', settingsToUse.type);
    this.logger.debug('controlDefaultVal: ', settingsToUse.defaultVal);
    this.logger.debug('serializerToInclude: ', serializerToInclude);
    this.logger.debug('deserializerToInclude: ', deserializerToInclude);

    if (!(serializerToInclude && deserializerToInclude)) {
      // tslint:disable-next-line:max-line-length
      this.logger.error(`We couldn't find any registered deserializer for the control type "${settingsToUse.type}". Please register one for this type`);
    }

    this.logger.trace('Creating a new Ui2QpControl');

    return new Ui2QpControl(
      this.logger,
      settingsToUse.type,
      settingsToUse.defaultVal,
      serializerToInclude,
      deserializerToInclude,
      settingsToUse.qpName,
      settingsToUse.state,
      settingsToUse.validatorOrOpts,
      settingsToUse.asyncValidators
    );
  }
}
