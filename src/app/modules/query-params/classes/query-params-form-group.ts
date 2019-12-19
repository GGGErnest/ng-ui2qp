import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import merge from 'lodash/merge';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { builtQueryParamsObjectFromAnObject } from '../helpers/query-params-helpers';
import { isEmpty } from '../helpers/empty-helper';
import { QueryParamsDefaultRouterService } from '../services/query-params-default-router.service';
import { ControlSettings } from '../interfaces/control-settings';
import { NotificationType } from '../types/types';

// ! TODO: this feature should be added to the FormArray
export class QueryParamsFormGroup extends FormGroup {
   // field that is gonna hold the current position this
// QueryParamsFormGroup has in the form
   // this is important at the time to search for a corresponding value
// in the query params from the URL
   private path = new Array<string>();

   // controls the types of controls this QueryParamsFormGroup has in
// order to know how to parse and set the value
   // gotten from the query params
   private controlsSettings: { [key: string]: ControlSettings } = {};

   // subscription to for value changes, if the current instance is a
// root QueryParamsFormGroup
   private subscriptions$ = new Subscription();

   private queryStringGroupConfigurations = { isRoot: false, autoUpdating: false, replaceState: true };

   constructor( private router: QueryParamsDefaultRouterService, controls?:
     { [key: string]: { control: AbstractControl; controlSettings: ControlSettings } },
     queryStringGroupConfigurations?: QueryParamsFormGroupSettings,
     validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
     asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null,
   ) {
     // Initializing the parent formGroup with empty form controls so we
    // can add them after initializing them
     super({}, validatorOrOpts, asyncValidators);

     // updating the configurations if were provided
     if (queryStringGroupConfigurations && queryStringGroupConfigurations !== null) {
       // replacing the default ones by the provided
       this.queryStringGroupConfigurations = merge(this.queryStringGroupConfigurations, queryStringGroupConfigurations);
     }

     // ! Notice that in a whole form only one QueryParamsFormGroup can
     // be marked as root if is not then weird things could happen :)
     if (this.queryStringGroupConfigurations.isRoot && this.queryStringGroupConfigurations.autoUpdating) {
       // enabling the auto synchronization with the url
       this.enableQueryParamsAutoSynchronization();
     }

     // initializing the controls provided in the constructor
     this.insertControls(controls);

     if (this.queryStringGroupConfigurations.isRoot) {
       this.router.queryParamMapObservable.subscribe((queryParams: any) => {
         const objectFromQueryParams = this.buildObjectFromQueryParams(queryParams.params);
         this.patchValue(objectFromQueryParams);
       });
     }
   }

   // enable auto-updating subscribing to value changes
   private enableQueryParamsAutoSynchronization() {
     this.subscriptions$.add(
       this.valueChanges.pipe(debounceTime(500)).subscribe(() => {
         // update the query params when the value of the form changes
         this.synchronizeQueryParamsWithFormValues();
       }),
     );
   }

   // registering the controls provided in the constructor
   private insertControls(controls: { [key: string]: { control: AbstractControl; controlSettings: ControlSettings } }) {
     if (controls !== undefined && controls !== null) {
       Object.keys(controls).forEach(key => {
         this.addControl(key, controls[key].control, controls[key].controlSettings);
       });
     }
   }

   private getQueryParamKey(name: string): string {
     return this.path.length > 0 ? this.path.join('.') + '.' + name : name;
   }

   // ? This method could be implemented in a way that make the
   // serializers configurable or passed as a function to the formGroup
   // Method that knows how to set the value to the controls depending
   // of its type
   private setControlValue(value: any, control: AbstractControl, controlSettings: ControlSettings) {
     if (value === undefined || value === null) {
       control.setValue(controlSettings.defaultVal);
     } else {
       switch (controlSettings.type) {
         case undefined: {
           control.setValue(value);
           break;
         }
         case 'string': {
           control.setValue(value);
           break;
         }
         case 'number': {
           if (value !== '') {
             control.setValue(parseInt(value));
           } else {
             control.setValue(controlSettings.defaultVal);
           }
           break;
         }
         case 'array-string': {
           control.setValue(value);
           break;
         }
         case 'array-number': {
           control.setValue(value.map(item => parseInt(item)));
           break;
         }
         case 'datetime-picker': {
           control.setValue(value.map(item => new Date(item)));
           break;
         }
       }
     }
   }

   // this is for searching in URL's query params for the corresponding
   // value of the formControl added. If it exist.
   // ! Noticed that the value of a formControl is gonna depend of the
   // position it has in the form, this is due to
   // ! the query params are defined depending of the structure of the form
   private initializeControl(name: string, control: AbstractControl, controlSettings: ControlSettings) {
     const queryParamKey = this.getQueryParamKey(name);
     // const queryParams = getQueryParams(this.location);
     // const queryParamValue = getQueryParamValueByName(queryParamKey, queryParams !== undefined ? queryParams : '' );

     if (controlSettings.type === 'form-group') {
       // making the form-group to update its path and the value of the
       // controls it contains
       const notificationPayload = { path: new Array<string>(...this.path, name) };
       (<QueryParamsFormGroup>control).notify({ type: 'add', data: notificationPayload });
     } else {
       const queryParamValue =
         controlSettings.type === 'array-number' || controlSettings.type === 'array-string'
           ? this.router.queryParamMap.getAll(queryParamKey)
           : this.router.queryParamMap.get(queryParamKey);
       // updating the control value only if in the queryParams is a
// value for the control, if not keep the same value
       this.setControlValue(!isEmpty(queryParamValue) ? queryParamValue
: control.value, control, controlSettings);
     }
   }

   // ! TODO: Think about including a float type to the allows types
   // When a formControl, QueryParamsFormGroup or other type of control
// is added to a QueryParamsFormGroup is when we
   // need to search if it has an initial value in the query params and
// set it, this is because the structure of the form is
   // important at the time of search for a initial value in the query
// params.
   addControl(name: string, control: AbstractControl, controlSettings?: ControlSettings) {
     // Adding the control to the form group
     super.addControl(name, control);
     this.initializeControl(name, control, controlSettings);
     this.controlsSettings[name] = controlSettings;
   }

   // Removes controls from the formGroup and its settings
   removeControl(name: string) {
     super.removeControl(name);
     delete this.controlsSettings[name];
   }

   // triggers some actions depending on the type of notification it
   // receives. This method is used for the parent formGroup
   // to pass actions to its children formGroups
   notify(notification?: { type: NotificationType; data?: any }) {
     switch (notification.type) {
       // after an add event is fired
       case 'add': {
         // Updating the path of this group
         this.path = notification.data.path;
         Object.keys(this.controls).forEach(key => {
           // updating the value from the url if it contains a value
           this.initializeControl(key, this.controls[key], this.controlsSettings[key]);
         });
         break;
       }
       case 'patch-value': {
         this.patchValue(notification.data);
         break;
       }
     }
   }

   patchValue(object: { [key: string]: any }) {
     Object.keys(this.controls).forEach(key => {
       const value = object !== undefined ? object[key] : undefined;
       if (this.controlsSettings[key].type === 'form-group') {
         (<QueryParamsFormGroup>this.controls[key]).notify({ type: 'patch-value', data: value });
       } else {
         this.setControlValue(value, this.controls[key], this.controlsSettings[key]);
       }
     });
   }

   // Synchronizing the formGroup value with the query params
   synchronizeQueryParamsWithFormValues() {
     if (!this.queryStringGroupConfigurations.isRoot) {
       throw new Error(
         'You are updating the queryParams from a formGroup that is not root, that could trigger a unexpected behavior',
       );
     }
     // query strings built from an object
     // const query =  builtQueryParamsFromAnObject(this.value);
     const query = builtQueryParamsObjectFromAnObject(this.value);
     // base url
    //  changeUrl(getBaseUrl(this.location), query, this.location, this.queryStringGroupConfigurations.replaceState);
     this.router.navigate(query, { replaceUrl: this.queryStringGroupConfigurations.replaceState });
   }

   // remove from the query params all its form controls and children
   destroy() {
     this.subscriptions$.unsubscribe();
   }

   private buildObjectFromQueryParams(params: any): object {
     if (params !== undefined && params !== null) {
       const object = {};
       Object.keys(params).forEach((key: string) => {
         const value = params[key];
         this.executeInQueryParam(key.split('.'), value, object);
       });
       return object;
     }
   }

   private executeInQueryParam(keyPath: Array<string>, value: string | string[], object: object) {
     const firstElement = keyPath.shift();
     if (keyPath.length > 0) {
       if (object[firstElement] === undefined) {
         object[firstElement] = {};
       }
       this.executeInQueryParam(keyPath, value, object[firstElement]);
     } else {
       object[firstElement] = value;
     }
   }
}
