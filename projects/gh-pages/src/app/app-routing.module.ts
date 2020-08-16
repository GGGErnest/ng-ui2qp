import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GettingStarterRouteComponent} from './components/routes/getting-starter-route/getting-starter-route.component';
import {HomeRouteComponent} from './components/routes/home-route/home-route.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeRouteComponent},
  {path: 'getting-started', component: GettingStarterRouteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
