import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LzyLoadRouteComponent } from './components/route/lzy-load-route/lzy-load-route.component';
import { NgQueryParamsRouteComponent } from './components/route/ng-query-params-route/ng-query-params-route.component';

const routes: Routes = [
    {path: 'lzy-load', component: LzyLoadRouteComponent },
    {path: 'ng-query-params', component: NgQueryParamsRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
