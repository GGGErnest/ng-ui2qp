import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LzyLoadContentRoutingModule } from './lzy-load-content-routing.module';
import { LzyLoadComponent } from './components/containers/lzy-load/lzy-load.component';
import { LzyLoadRouteComponent } from './components/route/lzy-load-route/lzy-load-route.component';
import { LzyLoadModule } from 'projects/lzy-load/src/public-api';

@NgModule({
  declarations: [LzyLoadComponent, LzyLoadRouteComponent],
  imports: [CommonModule, LzyLoadContentRoutingModule, LzyLoadModule],
})
export class LazyLzyLoadContentModule {}
