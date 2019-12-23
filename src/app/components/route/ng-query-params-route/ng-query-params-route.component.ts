import { Component, OnInit } from '@angular/core';
import { QpDefaultRouterService } from 'src/app/modules/form-qp/services/qp-default-router.service';

@Component({
  templateUrl: './ng-query-params-route.component.html',
  styleUrls: ['./ng-query-params-route.component.scss'],
  providers: [QpDefaultRouterService]
})
export class NgQueryParamsRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
