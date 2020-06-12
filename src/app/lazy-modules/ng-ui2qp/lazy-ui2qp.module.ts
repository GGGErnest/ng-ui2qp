import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyUi2QpRoutingModule } from './lazy-ui2qp-routing.module';
import { Ui2QpComponent } from './components/containers/ui2qp/ui2qp.component';
import { Ui2QpRouteComponent } from './components/routes/ui2qp-route/ui2qp-route.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [Ui2QpComponent, Ui2QpRouteComponent],
  imports: [
    CommonModule,
    LazyUi2QpRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class LazyUi2QpModule { }
