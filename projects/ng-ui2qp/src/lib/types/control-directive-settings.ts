/**
 * Settings provided to the ControlDirective as an input
 */
export interface ControlDirectiveSettings {
  qpName: string;
  defaultValue?: any;
  type?: string;
}

/**
 * Default values for ControlDirective's settings
 */
export const DefaultControlDirectiveSettings: Partial<ControlDirectiveSettings> = {
  defaultValue: null,
  type: 'string'
};
