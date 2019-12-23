export interface QueryParamsFormGroupSettings {
  isRoot?: boolean;
  autoUpdating?: boolean;
  replaceState?: boolean;
}

export interface QpSettings {
  autoUpdating?: boolean;
  replaceState?: boolean;
}

export const QpDefaultSettings = { autoUpdating: false, replaceState: true };
