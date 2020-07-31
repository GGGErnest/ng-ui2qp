import {InjectionToken} from '@angular/core';

export interface IUi2QpLogger {

  /**
   * Log a message with a trace level
   * @param message Message to log
   * @param optionalParams Optional params
   */
  trace(message?: any, ...optionalParams: any[]): void;

  /**
   * Log a message with a debug level
   * @param message Message to log
   * @param optionalParams Optional params
   */
  debug(message?: any, ...optionalParams: any[]): void;

  /**
   * Log a message with a info level
   * @param message Message to log
   * @param optionalParams Optional params
   */
  info(message?: any, ...optionalParams: any[]): void;

  /**
   * Log a message with a warn level
   * @param message Message to log
   * @param optionalParams Optional params
   */
  warn(message?: any, ...optionalParams: any[]): void;

  /**
   * Log a message with a error level
   * @param message Message to log
   * @param optionalParams Optional params
   */
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

