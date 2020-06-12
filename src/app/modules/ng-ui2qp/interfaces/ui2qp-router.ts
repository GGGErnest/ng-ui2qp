import { Observable } from 'rxjs';
import { Params, ParamMap, Navigation } from '@angular/router';
import { InjectionToken } from '@angular/core';

/**
 * Router Adapter Interface
 */
export interface Ui2QpRouter {

  /**
   * Returns the current URL
   */
  getUrl(): string;

  /**
   * Returns an Observable that emits when the query params change
   */
  getQueryParamMapObservable(): Observable<ParamMap>;

  /**
   * Returns the current query params as an Object
   */
  getQueryParamMap(): object;

  /**
   * Execute the navigation that changes the query params
   * @param queryParams Query params
   * @param replaceState Defines if the browser should create a new entry in the history or just replace the current one
   */
  navigate(queryParams: Params, replaceState: boolean): Promise<boolean>;

  /**
   * Returns the navigation object
   */
  getCurrentNavigation(): Navigation;

}

/**
 * RouterAdapter injection token identifier
 */
export const QP_TOKEN = 'QP_ROUTER_ADAPTER';

/**
 * RouterAdapter injection token
 */
export const QP_ROUTER_ADAPTER = new InjectionToken(QP_TOKEN);
