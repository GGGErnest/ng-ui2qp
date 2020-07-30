import {Ui2QpGroup} from './group';
import {IUi2QpRouter} from '../interfaces/router';
import {DefaultSettings, NgUI2QpSettings} from '../types/settings';
import merge from 'lodash/merge';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {IUi2QpLogger} from '../interfaces/logger';

export class Ui2QpRoot {

  /**
   * Root Ui2QpGroup acts the same like a FormGroup
   */
    // tslint:disable-next-line:variable-name
  private _model: Ui2QpGroup;

  /**
   * Settings of the Ui2QpRoot. Once defined can't be changed
   */
  readonly settings = DefaultSettings;

  /**
   * Subscriptions that should be cleared when this Object is destroyed
   */
  private subscriptions = new Subscription();

  /**
   * Defines if the model was initialized with the value from the QPs
   */
  private wasModelSynchronizedWithQps = false;

  /**
   * Creates a new instance of Ui2QpRoot with a default Ui2QpGroup
   * @param router QpRouter adapter to be use
   * @param logger Logger to be use
   * @param settings Settings which define how this Ui2QpRoot will behave
   * @param model Initial controls to be added at creation time
   */
  constructor(
    private router: IUi2QpRouter,
    private logger: IUi2QpLogger,
    settings: NgUI2QpSettings,
    model?: Ui2QpGroup,
  ) {

    this.logger.debug('Ui2QpRoot.constructor');
    this.logger.debug('Params passed into the function', router, settings, model);

    if (model) {

      this.logger.trace('The model passed is an instance of Ui2QpGroup therefore it\'s used as the model to synchronize with the QPs');

      this.model = model;

    }

    this.logger.debug('Current model used: ', this.model);

    // updating the configurations if were provided
    if (settings) {

      this.logger.trace('Merging the settings provided with the default ones');

      // replacing the default ones by the provided
      this.settings = merge(this.settings, settings);
    }

    this.logger.debug('Current settings used: ', this.settings);

    // TODO: The model value is updated twice with the same value and we should find a way to prevent that because is not necessary.
    // It's been updated when assigning the model passed as param to the class model property and when subscribing to the Qps observable.

    // Subscribe to QueryParams Changes
    this.subscriptions.add(this.router.getQueryParamMapObservable().subscribe((queryParams: any) => {

      this.logger.debug('On Query Params changes');
      this.logger.debug('queryParams: ', queryParams);

      const objectFromQp = this.router.getObjectFromQp(queryParams.params);

      this.logger.debug('Current value to set to the model after the QPs have changed: ', objectFromQp);

      this.model.patchValue(objectFromQp);
      this.wasModelSynchronizedWithQps = true;
    }));

  }

  public set model(model: Ui2QpGroup) {

    this.logger.info('Ui2QpRoot.set model');
    this.logger.debug('Params passed into the function', model);
    this.logger.info('Adding the model to the Ui2QpRoot initializing its value from the Qps and subscribing to form value changes');

    if (model) {

      this.logger.trace('Assigning the new model passed');

      this._model = model;

      const queryParams = this.router.getQueryParamMap();
      const queryParamsObject = this.router.getObjectFromQp(queryParams);

      this.logger.trace('queryParams: ', queryParams);
      this.logger.debug('queryParamsObject: ', queryParamsObject);
      this.logger.debug('initializing the new model with the Qps value just retrieved');

      this._model.patchValue(queryParamsObject);
      this.wasModelSynchronizedWithQps = true;

      if (this.settings.autoUpdating.enabled) {

        this.logger.trace('Enabling AutoSync for the new model');

        this.enableAutoSync();
      }
    }
  }

  public get model(): Ui2QpGroup {
    return this._model;
  }

  /**
   * Enables AutoSync
   * AutoSync is a feature that will automatically update the QueryParams while the Ui2QpGroup's value changes
   */
  private enableAutoSync() {

    this.logger.info('Ui2QpRoot.enableAutoSync');
    this.logger.info('Auto-sync enabled for the current model');

    if (this.model) {

      this.logger.trace('Subscribing to model\'s value changes');

      this.subscriptions.add(
        this.model.valueChanges.pipe(debounceTime(this.settings.autoUpdating.debounce)).subscribe(() => {
          if (!this.wasModelSynchronizedWithQps) {

            this.logger.trace('Updating the Qp');

            // update the query params when the value of the form changes
            this.updateQp();
          } else {
            this.wasModelSynchronizedWithQps = false;
          }
        })
      );
    }
  }

  /**
   * Synchronize the formGroup value with the URL's query params
   */
  updateQp() {

    this.logger.info('Ui2QpRoot.updateQp');
    this.logger.info('Updating QPs with the model\'s value');
    const modelValue = this.model.getValue();

    this.logger.debug('modelValue: ', modelValue);

    const queryParams = this.router.getQpFromObject(modelValue);

    this.logger.debug('queryParams: ', queryParams);
    this.logger.debug('Updating the Qps');

    this.router.updateQps(queryParams, this.settings.replaceState);

  }

  /**
   * Execute the cleaning code for the object when it's executed.
   * Unsubscribe from all the Observables subscribed
   */
  destroy() {
    this.logger.debug('Ui2QpRoot.destroy');
    this.logger.info('Unsubscribing');
    this.subscriptions.unsubscribe();
  }
}
