import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormQpRoutingModule } from './form-qp-routing.module';
import { FormQpComponent } from './components/containers/form-qp/form-qp.component';
import { FormQpRouteComponent } from './components/routes/form-qp-route/form-qp-route.component';
import { FormQpModule } from '../../modules/form-qp/form-qp.module';

@NgModule({
  declarations: [FormQpComponent, FormQpRouteComponent],
  imports: [
    CommonModule,
    FormQpRoutingModule,
    FormQpModule
  ]
})
export class LazyFormQpModule { }
