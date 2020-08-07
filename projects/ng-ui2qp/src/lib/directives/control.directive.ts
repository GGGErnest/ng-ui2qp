import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Renderer2, Self} from '@angular/core';
import {DefaultNgUi2QpSettings, NgUI2QpSettings, UI2QP_SETTINGS_INJ_TOK} from '../types/settings';
import {IUi2QpRouter, UI2QP_ROUTER_INJ_TOK} from '../interfaces/router';
import {IUi2QpLogger, UI2QP_LOGGER_INJ_TOK} from '../interfaces/logger';
import {Ui2QpSerializersService} from '../services/serializers.service';
import {Ui2QpDeserializersService} from '../services/deserializers.service';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {SerializeFunc} from '../types/serializer';
import {DeserializeFunc} from '../types/deserializer';
import {ControlDirectiveSettings, DefaultControlDirectiveSettings,} from '../types/control-directive-settings';
import {mergeSettings} from '../helpers/object-helpers';
import {isEmpty} from '../helpers/empty-helper';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {selectValueAccessor} from '../helpers/control-value-accessor-helper';
import {DefaultUi2QpValueAccessor, Ui2QpValueAccessor} from '../types/control-value-accessor';

@Directive({
  selector: '[ui2qpControl]',
  exportAs: 'ui2qpControl'
})
export class Ui2QpControlDirective implements OnInit, OnDestroy {

  @Input('ui2qpControl') settings: ControlDirectiveSettings;
  @Input() customValueAccessor: Ui2QpValueAccessor;
  @Input() ui2qp: NgUI2QpSettings;

  private selectedValueAccessor: ControlValueAccessor | Ui2QpValueAccessor;
  private _value: any;
  private serializer: SerializeFunc;
  private deserializer: DeserializeFunc;
  private valueChanges$ = new Subject<void>();
  private eventListener;
  private subscriptions = new Subscription();
  private modelSynchronized = false;

  constructor(@Inject(UI2QP_SETTINGS_INJ_TOK) private ui2qpSettings: NgUI2QpSettings,
              @Inject(UI2QP_ROUTER_INJ_TOK) private router: IUi2QpRouter,
              @Inject(UI2QP_LOGGER_INJ_TOK) private logger: IUi2QpLogger,
              @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) private valueAccessors: Array<ControlValueAccessor>,
              private serializersService: Ui2QpSerializersService,
              private deserializersService: Ui2QpDeserializersService,
              private host: ElementRef,
              private renderer2: Renderer2) {

  }

  ngOnInit() {
    this.settingsSetup();
    this.init();
  }

  private settingsSetup() {
    this.settings = mergeSettings(this.settings, DefaultControlDirectiveSettings);
    this.ui2qp = this.ui2qp !== undefined ? mergeSettings(this.ui2qp, DefaultNgUi2QpSettings) : this.ui2qpSettings;
  }

  private selectValueAccessor() {
    if (!this.customValueAccessor) {
      this.selectedValueAccessor = selectValueAccessor(this.valueAccessors);
      if (this.selectedValueAccessor) {
        // TODO: The next code overrides whatever was registered before this, maybe is a good idea to guaranteed the execution of other registered functions
        (this.selectedValueAccessor as ControlValueAccessor).registerOnChange(this.onValueChange.bind(this));
      } else {
        this.selectedValueAccessor = mergeSettings(this.customValueAccessor, DefaultUi2QpValueAccessor);
        this.eventListener = this.renderer2.listen(this.host.nativeElement,
          (this.selectedValueAccessor as Ui2QpValueAccessor).event, this.onValueChange.bind(this));
      }
    } else {
      this.selectedValueAccessor = this.customValueAccessor;
      this.eventListener = this.renderer2.listen(this.host.nativeElement,
        (this.selectedValueAccessor as Ui2QpValueAccessor).event, this.onValueChange.bind(this));
    }
  }

  private init() {

    this.serializer = this.serializersService.getSerializer(this.settings.type);
    this.deserializer = this.deserializersService.getDeserializer(this.settings.type);

    if (!(this.serializer || this.deserializer)) {
      // tslint:disable-next-line:max-line-length
      throw new Error(`We couldn't find any registered deserializer for the control type "${this.settings.type}". Please register one for this type`);
    }

    this.selectValueAccessor();

    this.updateModelFromQp();

    if (this.ui2qp.autoUpdating.enabled) {
      this.subscriptions.add(this.valueChanges$.pipe(
        debounceTime(this.ui2qp.autoUpdating.debounce)).subscribe(() => {
        if (!this.modelSynchronized) {
          this.updateQpFromModel();
        } else {
          this.modelSynchronized = false;
        }
      }));
    }

  }

  private set value(value: any) {
    if (!this.selectedValueAccessor.hasOwnProperty('event')) {
      (this.selectedValueAccessor as ControlValueAccessor).writeValue(this.host.nativeElement);
    } else {
      this.selectedValueAccessor.writeValue(this.host.nativeElement, value);
    }
  }

  private get value(): any {
    return this._value;
  }


  ngOnDestroy() {
    if (this.eventListener) {
      this.eventListener();
    }
    this.subscriptions.unsubscribe();
  }

  onValueChange(value: any | Event) {
    if (value instanceof Event) {
      this._value = (this.selectedValueAccessor as Ui2QpValueAccessor).readValue(this.host.nativeElement);
    } else {
      this._value = value;
    }
    this.valueChanges$.next();
  }

  public updateQpFromModel(): void {
    const valueToSet = this.serializer(this.value);
    const queryParams = {};
    queryParams[this.settings.qpName] = !isEmpty(valueToSet) ? valueToSet : null;
    this.router.updateQps(queryParams, this.ui2qp.replaceState, 'merge');
  }

  public updateModelFromQp(): void {
    const valueFromQp = this.router.getQueryParamMap()[this.settings.qpName];
    // tslint:disable-next-line:max-line-length
    this.value = (valueFromQp === undefined || valueFromQp === null) ? this.settings.defaultValue : (this.deserializer(valueFromQp, this.settings.defaultValue));;
  }

}
