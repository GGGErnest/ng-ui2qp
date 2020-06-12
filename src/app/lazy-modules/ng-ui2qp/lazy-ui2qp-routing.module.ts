import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ui2QpComponent } from './components/containers/ui2qp/ui2qp.component';

const routes: Routes = [{ path: '', component: Ui2QpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyUi2QpRoutingModule { }
