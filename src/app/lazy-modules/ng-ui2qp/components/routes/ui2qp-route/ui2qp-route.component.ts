import { Component, OnInit } from '@angular/core';
import { Ui2QpDefaultRouterService } from 'src/app/modules/ng-ui2qp/services/ui2qp-default-router.service';

@Component({
  templateUrl: './ui2qp-route.component.html',
  styleUrls: ['./ui2qp-route.component.scss'],
  providers: [Ui2QpDefaultRouterService]
})
export class Ui2QpRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
