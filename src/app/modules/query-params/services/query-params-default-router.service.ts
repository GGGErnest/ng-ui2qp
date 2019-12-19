import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, Params } from '@angular/router';

@Injectable()
export class QueryParamsDefaultRouterService {
   constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

   public get url() {
     return this.router.url;
   }

   public get queryParamMapObservable() {
     return this.activatedRoute.queryParamMap;
   }

   public get queryParamMap() {
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


