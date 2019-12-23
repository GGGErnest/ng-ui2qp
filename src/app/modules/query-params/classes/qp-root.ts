import { QpGroup } from './qp-group';
import { AsyncValidatorFn, ValidatorFn, AbstractControl } from '@angular/forms';
import { QpRouter } from '../interfaces/qp-router';
import { QpDefaultSettings, QpSettings } from '../interfaces/qp-settings';
import merge from 'lodash/merge';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { builtQueryParamsObjectFromAnObject } from '../helpers/query-params-helpers';

export class QpRoot {

  public qpGroup: QpGroup;

  private settings = QpDefaultSettings;

  private currentQpObject: object;

  private subscriptions$ = new Subscription();

  constructor(
    private router: QpRouter,
    settings: QpSettings,
    controls?: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    this.qpGroup = new QpGroup({} , validatorOrOpts, asyncValidators);

    // updating the configurations if were provided
    if (settings && settings !== null) {
      // replacing the default ones by the provided
      this.settings = merge(this.settings, settings);
    }

    // ! Notice that in a whole form only one QueryParamsFormGroup can
    // be marked as root if is not then weird things could happen :)
    if (this.settings.autoUpdating) {
      // enabling the auto synchronization with the url
      this.enableAutoSync();
    }

    // inserting the controls into the form group
    this.insertControls(controls);

    this.router.getQueryParamMapObservable().subscribe((queryParams: any) => {
      this.currentQpObject = this.getObjectFromQp(queryParams.params);
      this.qpGroup.patchValue(this.currentQpObject);
    });
  }

  private insertControls(controls: { [key: string]: AbstractControl }) {
   // initializing the controls provided in the constructor
   this.qpGroup.insertControls(controls);
  }

  // enable auto-updating subscribing to value changes
  private enableAutoSync() {
    this.subscriptions$.add(
      this.qpGroup.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        // update the query params when the value of the form changes
        this.updateUrl();
      }),
    );
  }

  private getObjectFromQp(params: any): object {
    if (params !== undefined && params !== null) {
      const object = {};
      Object.keys(params).forEach((key: string) => {
        const value = params[key];
        this.execInQp(key.split('.'), value, object);
      });
      return object;
    }
  }

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

   // Synchronizing the formGroup value with the query params
   updateUrl() {
    const query = builtQueryParamsObjectFromAnObject(this.qpGroup.value);
    this.router.navigate(query, { replaceUrl: this.settings.replaceState });
  }

   // remove from the query params all its form controls and children
   destroy() {
    this.subscriptions$.unsubscribe();
  }
}
