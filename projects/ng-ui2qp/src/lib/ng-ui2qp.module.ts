import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DEFAULT_NGUI2QP_SETTINGS, factorySettings, NgUI2QpSettings, UI2QP_SETTINGS_INJ_TOK } from './types/settings';
import { UI2QP_LOGGER_INJ_TOK } from './interfaces/logger';
import { loggerFactory } from './services/logger.service';
import { UI2QP_ROUTER_INJ_TOK } from './interfaces/router';
import { Ui2QpRouter } from './services/router.service';
import { Router, RouterModule } from '@angular/router';
import { Ui2QpBuilder } from './services/builder.service';
import { Ui2QpDeserializersService } from './services/deserializers.service';
import { Ui2QpSerializersService } from './services/serializers.service';
import { Ui2QpControlDirective } from './directives/ui2qp-control.directive';
import { Ui2QpValueAccessorDirective } from './directives/ui2qp-value-accessor.directive';

@NgModule({
  declarations: [Ui2QpControlDirective, Ui2QpValueAccessorDirective],
  exports: [Ui2QpControlDirective, Ui2QpValueAccessorDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    {provide: UI2QP_SETTINGS_INJ_TOK, useValue: DEFAULT_NGUI2QP_SETTINGS },
    Ui2QpSerializersService,
    Ui2QpDeserializersService,
    {provide: UI2QP_LOGGER_INJ_TOK, useFactory: loggerFactory(DEFAULT_NGUI2QP_SETTINGS.logLevel)},
    {
      provide: UI2QP_ROUTER_INJ_TOK, useClass: Ui2QpRouter, deps: [
        UI2QP_LOGGER_INJ_TOK,
        Router
      ]
    },
    Ui2QpBuilder
  ]
})
export class NgUi2QpModule {
  static withSettings(settings: NgUI2QpSettings): ModuleWithProviders<NgUi2QpModule> {
    return {
      ngModule: NgUi2QpModule,
      providers: [
        {provide: UI2QP_SETTINGS_INJ_TOK, useFactory: factorySettings(settings) },
        Ui2QpSerializersService,
        Ui2QpDeserializersService,
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
