import {LogLevel} from './logger';

/**
 * Defines Ui2QpRoot settings
 */
export interface Settings {
  autoUpdating?: AutoUpdating;
  replaceState?: boolean;
  logLevel?: LogLevel;
}

/**
 * AutoUpdating specific settings
 */
export interface AutoUpdating {
  enabled?: boolean;
  debounce?: number;
}

/**
 * Default Settings for the Ui2QpRoot
 */
export const DefaultSettings = {autoUpdating: {enabled: true, debounce: 500}, replaceState: true, logLevel: LogLevel.Off};
