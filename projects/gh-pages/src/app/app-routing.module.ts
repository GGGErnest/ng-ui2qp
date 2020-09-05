import {NgModule} from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {GettingStarterRouteComponent} from './components/routes/getting-starter-route/getting-starter-route.component';
import {HomeRouteComponent} from './components/routes/home-route/home-route.component';
import {DocumentationRouteComponent} from './components/routes/documentation-route/documentation-route.component';
import {IntroductionComponent} from './components/containers/introduction/introduction.component';
import {ConceptsComponent} from './components/containers/concepts/concepts.component';
import {ConfigurationsComponent} from './components/containers/configurations/configurations.component';
import {SerializersDeserializersComponent} from './components/containers/serializers-deserializers/serializers-deserializers.component';
import {RouterComponent} from './components/containers/router/router.component';
import {HowToUseComponent} from './components/containers/how-to-use/how-to-use.component';
import {ControlComponent} from './components/containers/control/control.component';
import {GroupComponent} from './components/containers/group/group.component';
import {RootComponent} from './components/containers/root/root.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeRouteComponent},
  {path: 'getting-started', component: GettingStarterRouteComponent},
  {
    path: 'docs', component: DocumentationRouteComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'introduction'},
      {path: 'introduction', component: IntroductionComponent},
      {path: 'how-to-use', component: HowToUseComponent},
      {path: 'concepts', component: ConceptsComponent},
      {path: 'configurations', component: ConfigurationsComponent},
      {path: 'serializers-deserializers', component: SerializersDeserializersComponent},
      {path: 'router', component: RouterComponent},
      {path: 'control', component: ControlComponent},
      {path: 'group', component: GroupComponent},
      {path: 'root', component: RootComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
