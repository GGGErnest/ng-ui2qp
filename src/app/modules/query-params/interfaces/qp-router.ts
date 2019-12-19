import { Observable } from 'rxjs';
import { Params, NavigationExtras, ParamMap, Navigation } from '@angular/router';
import { InjectionToken } from '@angular/core';

export interface QpRouter {

  getUrl(): string;

  getQueryParamMapObservable(): Observable<ParamMap>;

  getQueryParamMap(): object;

  navigate(queryParams: Params, extras: NavigationExtras): Promise<boolean>;

  getCurrentNavigation(): Navigation;

}

export const QP_TOKEN = 'QP_ROUTER_ADAPTER';

export const QP_ROUTER_ADAPTER = new InjectionToken(QP_TOKEN);
