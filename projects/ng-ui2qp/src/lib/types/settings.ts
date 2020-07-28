import {LogLevel} from './logger';
import {InjectionToken} from '@angular/core';

/**
 * Defines Ui2QpRoot settings
 */
export interface NgUI2QpSettings {
  /**
   * AutoUpdating feature settings
   */
  autoUpdating?: AutoUpdating;
  /**
   * If true, a new location history will be created each time the QPs are updated
   */
  replaceState?: boolean;
  /**
   * Defines the Log Level for the logger
   */
  logLevel?: LogLevel;
  /***
   *  Is used in the "encrypted" serializer and deserializer for encrypting Qp's values so are not readable from the URL.
   */
  cryptoSecretKey: string;
}

/**
 * AutoUpdating specific settings
 */
export interface AutoUpdating {
  /**
   * Enable or disable the AutoUpdating feature
   */
  enabled?: boolean;
  /**
   * The Debounce time for getting the new value from the Ui2QpGroup after it has changed
   */
  debounce?: number;
}

/**
 * Default Settings for the Ui2QpRoot
 */
export const DefaultSettings = {
  autoUpdating: {enabled: true, debounce: 500},
  replaceState: true,
  logLevel: LogLevel.Off,
  cryptoSecretKey: 'Th3M0st5ecureS3cretK3Y'
};

export const UI2QP_SETTINGS_TOKEN_ID = 'NGUI2QP_SETTINGS';

export const UI2QP_SETTINGS_INJ_TOK = new InjectionToken(UI2QP_SETTINGS_TOKEN_ID);
