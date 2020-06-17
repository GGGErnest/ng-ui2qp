import {Ui2QpFormGroup} from './ui2qp-form-group';
import {AsyncValidatorFn, ValidatorFn, AbstractControl} from '@angular/forms';
import {Ui2QpRouter} from '../interfaces/ui2qp-router';
import {DefaultSettings, Settings} from '../types/settings';
import merge from 'lodash/merge';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {qpFromObject} from '../helpers/qp-helpers';
import {Ui2QpFormControl} from './ui2qp-form-control';

export class Ui2QpRoot {

  /**
   * Root Ui2QpFormGroup acts the same like a FormGroup
   */
    // tslint:disable-next-line:variable-name
  private _model: Ui2QpFormGroup;

  /**
   * Settings of the Ui2QpRoot. Once defined can't be changed
   */
  readonly settings = DefaultSettings;

  /**
   * Subscriptions that should be cleared when this Object is destroyed
   */
  private subscriptions = new Subscription();

  /**
   * Creates a new instance of Ui2QpRoot with a default Ui2QpFormGroup
   * @param router QpRouter adapter to be use
   * @param settings Settings which define how this Ui2QpRoot will behave
   * @param model Initial controls to be added at creation time
   * @param validatorOrOpts Initial Validators or Options to be set
   * @param asyncValidators Initial AsyncValidators to set
   */
  constructor(
    private router: Ui2QpRouter,
    settings: Settings,
    model?: { [key: string]: Ui2QpFormGroup | Ui2QpFormControl } | Ui2QpFormGroup,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {

    if (model instanceof Ui2QpFormGroup) {
      this._model = model;
    } else {
      this._model = new Ui2QpFormGroup({}, validatorOrOpts, asyncValidators);
      // inserting the controls into the root Ui2QpFormGroup
      this.insertControls(model);
    }

    // updating the configurations if were provided
    if (settings) {
      // replacing the default ones by the provided
      this.settings = merge(this.settings, settings);
    }

    if (this.settings.autoUpdating) {
      // enabling the auto synchronization with the url
      this.enableAutoSync();
    }

    // Subscribe to QueryParams Changes
    this.subscriptions.add(this.router.getQueryParamMapObservable().subscribe((queryParams: any) => {
      this._model.patchValue(this.getObjectFromQp(queryParams.params));
    }));
  }

  public set model(model: Ui2QpFormGroup) {
    if (model) {
      this._model = model;
      this._model.patchValue(this.getObjectFromQp(this.router.getQueryParamMap()));
    }
  }

  public get model(): Ui2QpFormGroup {
    return this._model;
  }

  /**
   * Insert the Controls in the RootUi2QpFormGroup
   * @param controls Controls to insert
   */
  private insertControls(controls: { [key: string]: Ui2QpFormGroup | Ui2QpFormControl }) {
    // initializing the controls
    this.model.insertControls(controls);
  }

  /**
   * Enables AutoSync
   * AutoSync is a feature that will automatically update the QueryParams while the Ui2QpFormGroup's value changes
   */
  private enableAutoSync() {
    this.subscriptions.add(
      this.model.valueChanges.pipe(debounceTime(this.settings.autoUpdating.debounce)).subscribe(() => {
        // update the query params when the value of the form changes
        this.updateQp();
      }),
    );
  }

  /**
   * Creates an Object from the QueryParams
   * @param params QueryParams
   */
  private getObjectFromQp(params: object): object {
    if (params !== undefined && params !== null) {
      const object = {};
      Object.keys(params).forEach((key: string) => {
        const value = params[key];
        this.execInQp(key.split('.'), value, object);
      });
      return object;
    }
  }

  /**
   * Traverse recursively the provided Object.
   * This method traverse recursively throughout the properties of the provided object keeping track of the
   * path gone through
   * @param keyPath Path from the root of the object to the current position
   * @param value Current value
   * @param object Object to traverse
   */
  private execInQp(keyPath: Array<string>, value: string | string[], object: object) {
    const firstElement = keyPath.shift();
    if (keyPath.length > 0) {
      if (object[firstElement] === undefined) {
        object[firstElement] = {};
      }
      this.execInQp(keyPath, value, object[firstElement]);
    } else {
      object[firstElement] = value;
    }
  }

  /**
   * Synchronize the formGroup value with the URL's query params
   */
  updateQp() {
    const query = qpFromObject(this.model.getValue());
    this.router.navigate(query, this.settings.replaceState);
  }

  /**
   * Execute the cleaning code for the object when it's executed.
   * Unsubscribe from all the Observables subscribed
   */
  destroy() {
    this.subscriptions.unsubscribe();
  }
}
