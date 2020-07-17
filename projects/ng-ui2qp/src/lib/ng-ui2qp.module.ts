import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DefaultSettings, Settings} from './types/settings';
import {UI2QP_LOGGER_INJ_TOK} from './interfaces/logger';
import {loggerFactory} from './services/logger.service';
import {UI2QP_ROUTER_INJ_TOK} from './interfaces/router';
import {Ui2QpRouter} from './services/router.service';
import {Router, RouterModule} from '@angular/router';
import {Ui2QpBuilder} from './services/builder.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class NgUi2QpModule {
  static withProviders(settings: Settings = DefaultSettings): ModuleWithProviders<NgUi2QpModule> {
    return {
      ngModule: NgUi2QpModule,
      providers: [
        {provide: UI2QP_LOGGER_INJ_TOK, useFactory: loggerFactory(settings.logLevel)},
        {
          provide: UI2QP_ROUTER_INJ_TOK, useClass: Ui2QpRouter, deps: [
            UI2QP_LOGGER_INJ_TOK,
            Router
          ]
        },
        Ui2QpBuilder
      ]
    };
  }
}
