import {InjectionToken} from '@angular/core';

export interface IUi2QpLogger {

  trace(message?: any, ...optionalParams: any[]): void;

  debug(message?: any, ...optionalParams: any[]): void;

  info(message?: any, ...optionalParams: any[]): void;

  warn(message?: any, ...optionalParams: any[]): void;

  error(message?: any, ...optionalParams: any[]): void;

}

/**
 * RouterAdapter injection token identifier
 */
export const UI2QP_LOGGER_TOKEN_ID = 'NGUI2QP_LOGGER_ADAPTER';

/**
 * RouterAdapter injection token
 */
export const UI2QP_LOGGER_INJ_TOK = new InjectionToken(UI2QP_LOGGER_TOKEN_ID);

