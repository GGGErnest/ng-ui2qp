import {Injectable} from '@angular/core';
import {Ui2QpRouter} from '../interfaces/ui2qp-router';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Injectable()
export class Ui2QpDefaultRouterService implements Ui2QpRouter {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  public getUrl() {
    return this.router.url;
  }

  public getQueryParamMapObservable() {
    return this.activatedRoute.queryParamMap;
  }

  public getQueryParamMap(): Params {
    // The queryParamMap object returned by the activated router snapshot has an extra property
    // that encapsulates the actual queryParam object
    return (this.activatedRoute.snapshot.queryParamMap as any).params;
  }

  public navigate(queryParams: Params, replaceState: boolean): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: null,
      queryParams,
      replaceUrl: replaceState
    });
  }

  public getCurrentNavigation() {
    return this.router.getCurrentNavigation();
  }
}
