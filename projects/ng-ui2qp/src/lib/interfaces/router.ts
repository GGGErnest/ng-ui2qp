import { Observable } from 'rxjs';
import { Params, ParamMap, Navigation } from '@angular/router';
import { InjectionToken } from '@angular/core';

/**
 * Router Adapter Interface
 */
export interface IUi2QpRouter {

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
  updateQps(queryParams: Params, replaceState: boolean): Promise<boolean>;

  /**
   * Returns the navigation object
   */
  getCurrentNavigation(): Navigation;

  /**
   * Deserialize the QPs to an Object that will be use to update the model's value
   * @param params QueryParams
   */
  getObjectFromQp(params: object): object;

  /**
   * Serialize an Object to QPs
   * @param object Source Object
   */
  getQpFromObject(object: object): Params;
}

/**
 * RouterAdapter injection token identifier
 */
export const UI2QP_ROUTER_TOKEN_ID = 'NGUI2QP_ROUTER_ADAPTER';

/**
 * RouterAdapter injection token
 */
export const UI2QP_ROUTER_INJ_TOK = new InjectionToken(UI2QP_ROUTER_TOKEN_ID);
