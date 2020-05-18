import { Component, OnInit } from '@angular/core';
import { QpDefaultRouterService } from 'src/app/modules/form-qp/services/qp-default-router.service';

@Component({
  templateUrl: './form-qp-route.component.html',
  styleUrls: ['./form-qp-route.component.scss'],
  providers: [QpDefaultRouterService]
})
export class FormQpRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
