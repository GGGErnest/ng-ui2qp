import {Directive, Inject, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {DefaultNgUi2QpSettings, NgUI2QpSettings, UI2QP_SETTINGS_INJ_TOK} from '../types/settings';
import {IUi2QpRouter, UI2QP_ROUTER_INJ_TOK} from '../interfaces/router';
import {IUi2QpLogger, UI2QP_LOGGER_INJ_TOK} from '../interfaces/logger';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ControlDirectiveSettings, DefaultControlDirectiveSettings} from '../types/control-directive-settings';
import {mergeObjects} from '../helpers/object-helpers';
import {isEmpty} from '../helpers/empty-helper';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {selectValueAccessor} from '../helpers/control-value-accessor-helper';
import {Ui2QpSerializersService} from '../services/serializers.service';
import {Ui2QpDeserializersService} from '../services/deserializers.service';
import {DeserializeFunc} from '../types/deserializer';
import {SerializeFunc} from '../types/serializer';

@Directive({
  selector: '[ui2qpControl]',
  exportAs: 'ui2qpControl'
})
export class Ui2QpControlDirective implements OnInit, OnDestroy {

  /**
   * Control settings
   */
  @Input('ui2qpControl') settings: ControlDirectiveSettings;
  /**
   * NgUI2QpSettings that will define how to interact with the Qps. It's the same that the ones provided globally. If not passed to the
   * directive the defined globally will be used instead.
   */
  @Input() ui2qp: NgUI2QpSettings;
  /**
   * Control value accessor used to communicate the view with the model and viceversa
   * @private
   */
  private valueAccessor: ControlValueAccessor;
  /**
   * Keeps track of the component value while it changes.
   * @private
   */
  private _value: any;
  /**
   * Observable that emits every time the value changes in the view. Is used for debouncing the value changes so the QPs are not
   * updated everytime.
   * @private
   */
  private valueChanges$ = new Subject<void>();
  /**
   * Is used for unsubscribe from all the subscriptions on the OnDestroy.
   * @private
   */
  private subscriptions = new Subscription();
  /**
   * Deserialize function applied to the value obtained from the Qps and its outputs is the value used to set in the view.
   * @private
   */
  private deserializerFunc: DeserializeFunc;
  /**
   * Serialize function applied to the value obtained from the view an it outputs is the value to set to the Qps.
   * @private
   */
  private serializerFunc: SerializeFunc;

  /**
   * Creates a new Ui2QpControlDirective
   * @param ui2qpSettings Ui2QpSettings to be used if none was provided as input
   * @param router IUi2QpRouter used to update the QPs
   * @param logger Logger
   * @param ngControl NgControl if the host element is been used in conjunction with Angular Forms
   * @param valueAccessors Array of ValueAccessors which are bind to the host element.
   * @param serializersService Serialize service from where to choose the serializer depending of the
   * type "type" property in the provided control settings.
   * @param deserializerService Deserialize service from where to choose the deserializer depending of the
   * "type" property in the provided control settings.
   */
  constructor(@Inject(UI2QP_SETTINGS_INJ_TOK) private ui2qpSettings: NgUI2QpSettings,
              @Inject(UI2QP_ROUTER_INJ_TOK) private router: IUi2QpRouter,
              @Inject(UI2QP_LOGGER_INJ_TOK) private logger: IUi2QpLogger,
              @Optional() @Self() private ngControl: NgControl,
              @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) private valueAccessors: Array<ControlValueAccessor>,
              private serializersService: Ui2QpSerializersService,
              private deserializerService: Ui2QpDeserializersService) {

    this.logger.debug('Ui2QpControlDirective.constructor');
    // tslint:disable-next-line:max-line-length
    this.logger.debug('Params passed into the function', ui2qpSettings, router, ngControl, valueAccessors, serializersService, deserializerService);
  }

  ngOnInit() {
    this.settingsSetup();
    this.init();
  }

  /**
   * Initialize and configure the directive
   * @private
   */
  private init() {

    this.logger.info('Ui2QpGroup.init');

    this.selectValueAccessor();

    this.selectHowToListeningForValueChanges();

    this.serializerFunc = this.serializersService.getSerializer(this.settings.type);
    this.deserializerFunc = this.deserializerService.getDeserializer(this.settings.type);

    this.logger.debug('Serializer function', this.serializerFunc);
    this.logger.debug('Deserializer function', this.deserializerFunc);

    if (!(this.serializerFunc && this.deserializerFunc)) {
      // tslint:disable-next-line:max-line-length
      this.logger.error(`We couldn't find any registered deserializer for the control type "${this.settings.type}". Please register one for this type`);
    }

    this.updateModelFromQp();

    if (this.ui2qp.autoUpdating.enabled) {

      this.logger.debug('Enabling auto-updating');

      this.subscriptions.add(this.valueChanges$.pipe(
        debounceTime(this.ui2qp.autoUpdating.debounce)).subscribe(() => {
        this.updateQpFromModel();
      }));
    }

  }

  /**
   * Initialize the settings. It merges the provided settings with the provided default ones which guarantees no missing settings.
   * @private
   */
  private settingsSetup() {

    this.logger.info('Ui2QpGroup.settingsSetup');

    this.settings = mergeObjects(this.settings, DefaultControlDirectiveSettings);
    this.ui2qp = this.ui2qp !== undefined ? mergeObjects(this.ui2qp, DefaultNgUi2QpSettings) : this.ui2qpSettings;

    this.logger.debug('Settings to used after merged with the default ones', this.settings);
    this.logger.debug('Ui2Qp settings to used after merged with the default ones', this.ui2qp);
  }

  /**
   * Selects the right ValueAccessor to use for communicating with the view from the array of ValueAccessors injected to the directive.
   * @private
   */
  private selectValueAccessor() {

    this.logger.info('Ui2QpGroup.settingsSetup');

    if (this.ngControl) {
      this.valueAccessor = this.ngControl.valueAccessor;
    } else {
      this.valueAccessor = selectValueAccessor(this.valueAccessors);
    }

    this.logger.debug('ValueAccessor to use for communicating with the view', this.valueAccessor);
  }

  /**
   * Choose the best way for listening to value changes from the view.
   * @private
   */
  private selectHowToListeningForValueChanges() {

    this.logger.info('Ui2QpGroup.selectHowToListeningForValueChanges');

    if (this.ngControl) {
      this.subscriptions.add(this.ngControl.valueChanges.subscribe((value) => this.onValueChange(value)));

      this.logger.debug('Subscribing to valueChanges observable from the ngControl');
    } else {
      this.valueAccessor.registerOnChange((value: any) => {
        this.onValueChange(value);
      });

      // tslint:disable-next-line:max-line-length
      this.logger.debug('Registering a value change function within the selected ControlValueAccessor since no ngControl was found in the host element');
    }
  }

  /**
   * Writes the value to the view.
   * @param value Value to write to the view.
   * @private
   */
  private set value(value: any) {
    this.valueAccessor.writeValue(value);
  }

  /**
   * Returns the value.
   * @private
   */
  private get value(): any {
    return this._value;
  }


  ngOnDestroy() {

    this.logger.info('Ui2QpGroup.ngOnDestroy');

    this.subscriptions.unsubscribe();

    this.logger.trace('Unsubscribing');
  }

  /**
   * Called everytime the value changes in the view.
   * Used to notify when the value from the view has changed and for keeping synchronized the value
   * from the view with the value in the directive.
   * @param value
   * @private
   */
  private onValueChange(value: any) {

    this.logger.info('Ui2QpGroup.onValueChange');

    this.logger.debug('New value', value);

    this._value = value;
    this.valueChanges$.next();
  }

  /**
   * Updates the QPs
   */
  public updateQpFromModel(): void {

    this.logger.info('Ui2QpGroup.updateQpFromModel');

    const queryParams = {};
    queryParams[this.settings.qpName] = !isEmpty(this.value) ? this.serializerFunc(this.value) : null;

    this.logger.debug('QueryParams to set', queryParams);
    this.router.updateQps(queryParams, this.ui2qp.replaceState, 'merge').catch((error: any) => this.logger.error(error));
  }

  /**
   * Updates the model with the value retrieved from the Qps
   */
  public updateModelFromQp(): void {

    this.logger.info('Ui2QpGroup.updateModelFromQp');

    const valueFromQp = this.router.getQueryParamMap()[this.settings.qpName];

    this.logger.debug('Value retrieved from the Qps before been deserialized', valueFromQp);

    if (valueFromQp === undefined || valueFromQp === null) {

      // tslint:disable-next-line:max-line-length
      this.logger.trace('the value retrieved from the QPs is null or undefined so the default value used instead.', this.settings.defaultValue);

      this.value = this.settings.defaultValue;

    } else {
      this.value = this.deserializerFunc(valueFromQp, this.settings.defaultValue);

      this.logger.trace('Value to update the model after deserialized', this.value);

    }

    this.logger.debug('Value to update the model', this.value);
  }

}
