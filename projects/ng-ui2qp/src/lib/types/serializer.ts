/**
 * Serializer that is used to mapping the values retrieved from a QpControl to the corresponding Query param
 */
export declare type SerializeFunc = (value: any) => string;

/**
 * Serializer object
 */
export interface Serializer {
  type: string;
  serializerFunc: SerializeFunc;
}
