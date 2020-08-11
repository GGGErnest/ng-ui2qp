import {LogLevel} from './logger';
import {InjectionToken} from '@angular/core';
import {mergeObjects} from '../helpers/object-helpers';

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
export const DefaultNgUi2QpSettings = {
  autoUpdating: {enabled: true, debounce: 500},
  replaceState: true,
  logLevel: LogLevel.Off,
  cryptoSecretKey: 'Th3M0st5ecureS3cretK3Y'
};

/**
 * Factory settings for the NgUI2QpSettings. It merges the user provided settings with the default ones
 * which guaranties no missing settings and gives the possibility to only provide what wants to be changed
 * @param settings Settings to be replaced in the default ones
 */
export function factorySettings(settings: NgUI2QpSettings) {
  return () => mergeObjects(settings, DefaultNgUi2QpSettings);
}

export const UI2QP_SETTINGS_TOKEN_ID = 'NGUI2QP_SETTINGS';

export const UI2QP_SETTINGS_INJ_TOK = new InjectionToken(UI2QP_SETTINGS_TOKEN_ID);
