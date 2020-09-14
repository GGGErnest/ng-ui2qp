import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.scss']
})
export class RouterComponent implements OnInit {
  routerAdapterCode = `@Injectable()
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
}`;

  routerAdapterProvideCode = `providers:[{
      provide: UI2QP_ROUTER_INJ_TOK, useClass: <CustomRouterProvider>
    }]`;

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Router');
  }

  ngOnInit(): void {
  }

}
