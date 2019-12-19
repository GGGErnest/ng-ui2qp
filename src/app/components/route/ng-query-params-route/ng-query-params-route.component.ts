import { Component, OnInit } from '@angular/core';
import { QueryParamsDefaultRouterService } from 'src/app/modules/query-params/services/query-params-default-router.service';

@Component({
  templateUrl: './ng-query-params-route.component.html',
  styleUrls: ['./ng-query-params-route.component.scss'],
  providers: [QueryParamsDefaultRouterService]
})
export class NgQueryParamsRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
