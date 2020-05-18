import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormQpRoutingModule } from './form-qp-routing.module';
import { FormQpComponent } from './components/containers/form-qp/form-qp.component';
import { FormQpRouteComponent } from './components/routes/form-qp-route/form-qp-route.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [FormQpComponent, FormQpRouteComponent],
  imports: [
    CommonModule,
    FormQpRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class LazyFormQpModule { }
