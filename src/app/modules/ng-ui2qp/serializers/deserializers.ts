import {DeserializeFunc, Deserializer} from '../types/deserializer';

/**
 * String deserializer. It deserializes the value retrieved from the QueryParams to a string
 */
export const stringDeserializer: Deserializer = {
  type: 'string',
  deserializerFunc: (value: any, defaultVal: any) => {
    return value;
  },
};

/**
 * Number Deserializer. It deserializes the value retrieved from the QueryParams to a number
 */
export const numberDeserializer: Deserializer = {
  type: 'number',
  deserializerFunc: (value: any, defaultVal: any) => {
    // tslint:disable-next-line:radix
    let returnValue = parseInt(value);
    if (typeof returnValue !== 'number') {
      console.error(`The current value ${value} couldn't be deserialized instead used the default value`);
      returnValue = defaultVal;
    }
    return returnValue;
  },
};

/**
 * Strings Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of strings
 */
export const stringArrayDeserializer: Deserializer = {
  type: 'string-array',
  deserializerFunc: (value: any, defaultVal: any) => {
    return value;
  },
};

/**
 * Numbers Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of numbers
 */
export const arrayNumberDeserializer: Deserializer = {
  type: 'array-number',
  deserializerFunc: (value: any, defaultVal: any) => {
    // tslint:disable-next-line:radix
    let returnValue = value.map((item) => parseInt(item));
    if (returnValue instanceof Array) {
      console.error(`The current value ${value.toString()} couldn't be deserialized instead used the default value`);
      returnValue = defaultVal;
    }
    return returnValue;
  },
};

/**
 * Map of all built-in deserializers.
 */
export const BUILT_IN_DESERIALIZERS_MAP = new Map<string, DeserializeFunc>();
BUILT_IN_DESERIALIZERS_MAP.set(stringDeserializer.type, stringDeserializer.deserializerFunc);
BUILT_IN_DESERIALIZERS_MAP.set(numberDeserializer.type, numberDeserializer.deserializerFunc);
BUILT_IN_DESERIALIZERS_MAP.set(stringArrayDeserializer.type, stringArrayDeserializer.deserializerFunc);
BUILT_IN_DESERIALIZERS_MAP.set(arrayNumberDeserializer.type, arrayNumberDeserializer.deserializerFunc);
