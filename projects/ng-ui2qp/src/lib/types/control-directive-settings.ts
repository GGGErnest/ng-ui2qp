export interface ControlDirectiveSettings {
  qpName?: string;
  defaultValue?: any;
  type?: string;
}

export const DefaultControlDirectiveSettings: ControlDirectiveSettings = {
  defaultValue: null,
  type: 'string'
};
