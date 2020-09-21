import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GettingStarterRouteComponent } from './components/main-routes/getting-starter-route/getting-starter-route.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeRouteComponent } from './components/main-routes/home-route/home-route.component';
import { EmbeddedStackblitzComponent } from './components/dumbs/embeded-stackblitz/embedded-stackblitz.component';
import { DocumentationRouteComponent } from './components/main-routes/documentation-route/documentation-route.component';
import { IntroductionComponent } from './components/documentation-children-routes/introduction/introduction.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { CodeBoxComponent } from './components/dumbs/code-box/code-box.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgUi2QpModule } from 'ng-ui2qp';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConceptsComponent } from './components/documentation-children-routes/concepts/concepts.component';
import { ConfigurationsComponent } from './components/documentation-children-routes/configurations/configurations.component';
// tslint:disable-next-line:max-line-length
import { SerializersDeserializersComponent } from './components/documentation-children-routes/serializers-deserializers/serializers-deserializers.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterComponent } from './components/documentation-children-routes/router/router.component';
import { HowToUseComponent } from './components/documentation-children-routes/how-to-use/how-to-use.component';
import { ControlComponent } from './components/documentation-children-routes/control/control.component';
import { GroupComponent } from './components/documentation-children-routes/group/group.component';
import { RootComponent } from './components/documentation-children-routes/root/root.component';
import { LogoComponent } from './components/dumbs/logo/logo.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangelogComponent } from './components/documentation-children-routes/changelog/changelog.component';
import { ModelDrivenComponent } from './components/documentation-children-routes/model-driven/model-driven.component';
import { TemplateDrivenComponent } from './components/documentation-children-routes/template-driven/template-driven.component';
import { TopBarLeftTemplateDirective } from './directives/top-bar-left-template.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { PageNotFoundComponent } from './components/main-routes/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    GettingStarterRouteComponent,
    HomeRouteComponent,
    EmbeddedStackblitzComponent,
    DocumentationRouteComponent,
    IntroductionComponent,
    CodeBoxComponent,
    ConceptsComponent,
    ConfigurationsComponent,
    SerializersDeserializersComponent,
    RouterComponent,
    HowToUseComponent,
    ControlComponent,
    GroupComponent,
    RootComponent,
    LogoComponent,
    ChangelogComponent,
    ModelDrivenComponent,
    TemplateDrivenComponent,
    TopBarLeftTemplateDirective,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgUi2QpModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    HighlightModule,
    MatTabsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
