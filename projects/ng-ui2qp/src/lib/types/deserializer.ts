/**
 * Deserializer function to be used when mapping a QueryParam value to the corresponding Ui2QpFormControl value.
 */
export declare type DeserializeFunc = (value: any, defaultValue: any) => any;

/**
 * Deserializer object
 */
export interface Deserializer {
  type: string;
  deserializerFunc: DeserializeFunc;
}
