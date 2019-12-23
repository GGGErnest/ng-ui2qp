import { Injectable } from '@angular/core';
import { QpRouter } from '../interfaces/qp-router';
import { Params, NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class QpDefaultRouterService implements QpRouter {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

   public getUrl() {
     return this.router.url;
   }

   public getQueryParamMapObservable() {
     return this.activatedRoute.queryParamMap;
   }

   public getQueryParamMap() {
     return this.activatedRoute.snapshot.queryParamMap;
   }

   public navigate(queryParams: Params, extras: NavigationExtras): Promise<boolean> {
     return this.router.navigate([], {
       relativeTo: this.activatedRoute,
       queryParamsHandling: null,
       queryParams: queryParams,
       ...extras,
     });
   }

   public getCurrentNavigation() {
     return this.router.getCurrentNavigation();
   }
}
