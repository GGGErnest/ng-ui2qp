import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QP_ROUTER_ADAPTER } from './interfaces/qp-router';
import { QpDefaultRouterService } from './services/qp-default-router.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: QP_ROUTER_ADAPTER, useClass: QpDefaultRouterService }
  ]
})
export class QueryParamsModule { }
