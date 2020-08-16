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
import { EmbeddedStackblitzComponent } from './components/dumbs/embeded-stackblitz/embedded-stackblitz.component';

@NgModule({
  declarations: [
    AppComponent,
    GettingStarterRouteComponent,
    GettingStarterComponent,
    HomeRouteComponent,
    HomeComponent,
    EmbeddedStackblitzComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
