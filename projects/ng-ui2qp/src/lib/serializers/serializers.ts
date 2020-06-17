import {SerializeFunc, Serializer} from '../types/serializer';

/**
 * Built in serializer that is used for serializing the values retrieved from the Ui2QpFormGroup to the query params in the URL
 */
export const stringSerializer: Serializer = {
  type: 'string',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Number Deserializer. It deserializes the value retrieved from the QueryParams to a number
 */
export const numberSerializer: Serializer = {
  type: 'number',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Strings Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of strings
 */
export const stringArraySerializer: Serializer = {
  type: 'string-array',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Numbers Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of numbers
 */
export const arrayNumberSerializer: Serializer = {
  type: 'array-number',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Map of all built-in serializers.
 */
export const BUILD_IN_SERIALIZERS_MAP = new Map<string, SerializeFunc>();
BUILD_IN_SERIALIZERS_MAP.set(stringSerializer.type, stringSerializer.serializerFunc);
BUILD_IN_SERIALIZERS_MAP.set(numberSerializer.type, numberSerializer.serializerFunc);
BUILD_IN_SERIALIZERS_MAP.set(arrayNumberSerializer.type, arrayNumberSerializer.serializerFunc);
BUILD_IN_SERIALIZERS_MAP.set(stringArraySerializer.type, stringArraySerializer.serializerFunc);
