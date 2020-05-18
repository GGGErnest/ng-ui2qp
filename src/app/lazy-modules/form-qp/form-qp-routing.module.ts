import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormQpComponent } from './form-qp.component';

const routes: Routes = [{ path: '', component: FormQpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormQpRoutingModule { }
