import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QueryParamsModule } from './modules/query-params/query-params.module';
import { LzyLoadRouteComponent } from './components/route/lzy-load-route/lzy-load-route.component';
import { NgQueryParamsRouteComponent } from './components/route/ng-query-params-route/ng-query-params-route.component';
import { LzyLoadComponent } from './components/smart/lzy-load/lzy-load.component';
import { QueryParamsComponent } from './components/smart/query-params/query-params.component';
import { LzyLoadContentModule } from './modules/lzy-load-content/lzy-load-content.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatIconModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LzyLoadRouteComponent,
    NgQueryParamsRouteComponent,
    LzyLoadComponent,
    QueryParamsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LzyLoadContentModule,
    QueryParamsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
