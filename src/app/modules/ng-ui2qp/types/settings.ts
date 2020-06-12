/**
 * Settings that define the behavior of the QpRoot
 */
export interface Settings {
  autoUpdating?: AutoUpdatingSettings;
  replaceState?: boolean;
}

/**
 * AutoUpdating specific settings
 */
export interface AutoUpdatingSettings {
  enabled?: boolean;
  debounce?: number;
}

/**
 * Default Settings for the QpRoot
 */
export const DefaultSettings = {autoUpdating: {enabled: true, debounce: 500}, replaceState: true};
