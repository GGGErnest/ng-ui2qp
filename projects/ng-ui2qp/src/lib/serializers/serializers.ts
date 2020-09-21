import { Serializer } from '../types/serializer';

/**
 * Built in serializer that is used for serializing the values retrieved from the Ui2QpFormGroup to the query params in the URL
 */
const stringSerializer: Serializer = {
  type: 'string',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Number Deserializer. It deserializes the value retrieved from the QueryParams to a number
 */
const numberSerializer: Serializer = {
  type: 'number',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Strings Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of strings
 */
const stringArraySerializer: Serializer = {
  type: 'string-array',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Numbers Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of numbers
 */
const arrayNumberSerializer: Serializer = {
  type: 'number-array',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Numbers Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of numbers
 */
const booleanSerializer: Serializer = {
  type: 'boolean',
  serializerFunc: (value: boolean) => {
    return value ? '1' : '0';
  },
};

/**
 * Map of all built-in serializers.
 */
export const BUILD_IN_SERIALIZERS = [stringSerializer, numberSerializer, stringArraySerializer, arrayNumberSerializer, booleanSerializer];
