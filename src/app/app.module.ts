import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Ui2QpDefaultRouterService } from './modules/ng-ui2qp/services/ui2qp-default-router.service';
import { QP_ROUTER_ADAPTER } from './modules/ng-ui2qp/interfaces/ui2qp-router';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
    ],
  providers: [{ provide: QP_ROUTER_ADAPTER, useClass: Ui2QpDefaultRouterService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
