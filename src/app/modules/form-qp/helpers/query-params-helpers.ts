import { Location } from '@angular/common';
import { isEmpty } from './empty-helper';
import { Params, ParamMap } from '@angular/router';

export function getQueryParams(location: Location): string {
   return location.path().split('?')[1];
}

export function getBaseUrl(location: Location): string {
   return location.path().split('?')[0];
}

export function getQueryParamValueByName(name: string, searchParams:
string): any {
   const params = new URLSearchParams(searchParams);
   return params.get(name);
}

export function checkUrlLenght(url: string): boolean {
   // the url shouldn't be longer that 1745 characters according the
// compatibility recomendations
   if (url.length > 1745) {
     return false;
   }
   return true;
}

// Sets the new url using the browser api
export function changeUrl(path: string, query: string, location:
Location, replaceState = false) {
   if (!replaceState) {
     location.go(path, query, { state: 1, rand: Math.random() });
   } else {
     location.replaceState(path, query, { state: 1, rand: Math.random() });
   }
}


// takes an object and traverse recursively all the object and build
// queryParams with them
export function builtQueryParamsObjectFromAnObject(object: Object): Params {
   const params: Params = {};
   const functionToExecute = (path: string[], element: any, data:
   URLSearchParams) => {
     if (!isEmpty(element)) {
       const keyName = path.join('.');
       data[keyName] = element;
     }
   };
   executeInForAllFieldsOfTheObject(object, functionToExecute, params);
   return params;
}

// takes an object and traverse recursively all the object and build
// queryParams with them
export function builtQueryParamsFromAnObject(object: Object): string {
   const params = new URLSearchParams('');
   const functionToExecute = (path: string[], element: any, data:
URLSearchParams) => {
     if (!isEmpty(element)) {
       const keyName = path.join('.');
       data.set(keyName, element);
     }
   };
   executeInForAllFieldsOfTheObject(object, functionToExecute, params);
   return params.toString();
}

// traversing the object
export function executeInForAllFieldsOfTheObject(objectToTrasverse: Object,
   actionToExecute: (path: string[], element: any, data: any) =>   void, data?: any) {
          Object.keys(objectToTrasverse).forEach(property => {
              const item = objectToTrasverse[property];
              const path = [];
              path.push(property);
              executeInField(path, item, actionToExecute, data);
          });
      }

export function executeInField(path: string[], item: any,
  actionToExecute: (path: string[], formControl: any, data?: URLSearchParams) => void, data: any) {
          if (!(item instanceof Object ) || (item instanceof Array)) {
              actionToExecute(path, item, data);
              path.pop();
          } else if (item instanceof Object) {
              Object.keys(item).forEach(field => {
                  const auxField = item[field];
                  path.push(field);
                  executeInField(path, auxField, actionToExecute, data);
              });
              path.pop();
          } else {
              return;
          }
      }

// Built and object from the queryParams retrieved from the url
export function buildObjectFromQueryParams(search: string): {[key:
string]: any} {
   const params = new URLSearchParams(search);
   const object = {};
   params.forEach((value: string, key: string) => {
     executeInQueryParam(key.split('.'), value, object);
   });

   return object;
}

export function executeInQueryParam(keyPath: Array<string>, value:
string, object: Object) {
   const firstElement = keyPath.shift();
   if (keyPath.length > 0) {
     if (object[firstElement] === undefined) {
       object[firstElement] = {};
     }
     executeInQueryParam(keyPath, value, object[firstElement]);
   } else {
     const arrayValue = value.split(',');
     if (arrayValue.length > 1) {
       object[firstElement] = arrayValue;
     } else {
       object[firstElement] = value;
     }
   }
}


