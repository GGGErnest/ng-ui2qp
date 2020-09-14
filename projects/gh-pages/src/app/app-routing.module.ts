import {NgModule} from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {GettingStarterRouteComponent} from './components/main-routes/getting-starter-route/getting-starter-route.component';
import {HomeRouteComponent} from './components/main-routes/home-route/home-route.component';
import {DocumentationRouteComponent} from './components/main-routes/documentation-route/documentation-route.component';
import {IntroductionComponent} from './components/documentation-children-routes/introduction/introduction.component';
import {ConceptsComponent} from './components/documentation-children-routes/concepts/concepts.component';
import {ConfigurationsComponent} from './components/documentation-children-routes/configurations/configurations.component';
// tslint:disable-next-line:max-line-length
import {SerializersDeserializersComponent} from './components/documentation-children-routes/serializers-deserializers/serializers-deserializers.component';
import {RouterComponent} from './components/documentation-children-routes/router/router.component';
import {HowToUseComponent} from './components/documentation-children-routes/how-to-use/how-to-use.component';
import {ControlComponent} from './components/documentation-children-routes/control/control.component';
import {GroupComponent} from './components/documentation-children-routes/group/group.component';
import {RootComponent} from './components/documentation-children-routes/root/root.component';
import {ChangelogComponent} from './components/documentation-children-routes/changelog/changelog.component';
import {ModelDrivenComponent} from './components/documentation-children-routes/model-driven/model-driven.component';
import {TemplateDrivenComponent} from './components/documentation-children-routes/template-driven/template-driven.component';
import {PageNotFoundComponent} from './components/main-routes/page-not-found/page-not-found.component';

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
      {path: 'model-driven', component: ModelDrivenComponent},
      {path: 'template-driven', component: TemplateDrivenComponent},
      {path: 'concepts', component: ConceptsComponent},
      {path: 'configurations', component: ConfigurationsComponent},
      {path: 'serializers-deserializers', component: SerializersDeserializersComponent},
      {path: 'router', component: RouterComponent},
      {path: 'control', component: ControlComponent},
      {path: 'group', component: GroupComponent},
      {path: 'root', component: RootComponent},
      {path: 'changelog', component: ChangelogComponent},
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
