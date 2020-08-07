export interface Ui2QpValueAccessor {
  event: string;
  readValue: (element: any) => any;
  writeValue: (element: any, valueToWrite: any) => void;
}

export const DefaultUi2QpValueAccessor: Ui2QpValueAccessor = {
  event: 'input',
  readValue: (element: any) => element.value,
  writeValue: (element: any, valueToWrite) => element.value = valueToWrite
};
