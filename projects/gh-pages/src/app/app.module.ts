import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GettingStarterRouteComponent} from './components/routes/getting-starter-route/getting-starter-route.component';
import {GettingStarterComponent} from './components/containers/getting-starter/getting-starter.component';
import {MatButtonModule} from '@angular/material/button';
import {HomeRouteComponent} from './components/routes/home-route/home-route.component';
import {HomeComponent} from './components/containers/home/home.component';
import {EmbeddedStackblitzComponent} from './components/dumbs/embeded-stackblitz/embedded-stackblitz.component';
import {DocumentationRouteComponent} from './components/routes/documentation-route/documentation-route.component';
import {IntroductionComponent} from './components/containers/introduction/introduction.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {CodeBoxComponent} from './components/dumbs/code-box/code-box.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {NgUi2QpModule} from 'ng-ui2qp';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ConceptsComponent } from './components/containers/concepts/concepts.component';
import { ConfigurationsComponent } from './components/containers/configurations/configurations.component';
import { SerializersDeserializersComponent } from './components/containers/serializers-deserializers/serializers-deserializers.component';
import {MatDividerModule} from '@angular/material/divider';
import { RouterComponent } from './components/containers/router/router.component';
import { HowToUseComponent } from './components/containers/how-to-use/how-to-use.component';
import { ControlComponent } from './components/containers/control/control.component';
import { GroupComponent } from './components/containers/group/group.component';
import { RootComponent } from './components/containers/root/root.component';
import { LogoComponent } from './components/dumbs/logo/logo.component';
import {HttpClientModule} from '@angular/common/http';
import { ChangelogComponent } from './components/containers/changelog/changelog.component';
import { ModelDrivenComponent } from './components/containers/model-driven/model-driven.component';
import { TemplateDrivenComponent } from './components/containers/template-driven/template-driven.component';
import { VariableDirective } from './directives/variable.directive';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    GettingStarterRouteComponent,
    GettingStarterComponent,
    HomeRouteComponent,
    HomeComponent,
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
    VariableDirective,
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
