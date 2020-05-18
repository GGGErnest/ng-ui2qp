import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LzyLoadRouteComponent } from './components/route/lzy-load-route/lzy-load-route.component';


const routes: Routes = [{ path: '', component: LzyLoadRouteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LzyLoadContentRoutingModule { }
