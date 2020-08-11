import {Deserializer} from '../types/deserializer';

/**
 * String deserializer. It deserializes the value retrieved from the QueryParams to a string
 */
const stringDeserializer: Deserializer = {
  type: 'string',
  deserializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Number Deserializer. It deserializes the value retrieved from the QueryParams to a number
 */
const numberDeserializer: Deserializer = {
  type: 'number',
  deserializerFunc: (value: any, defaultVal: any) => {
    // tslint:disable-next-line:radix
    const returnValue = parseInt(value);
    if (typeof returnValue !== 'number') {
      console.error(`The current value ${value} couldn't be deserialized, instead we used the default value`);
      return defaultVal;
    }
    return returnValue;
  },
};

/**
 * Strings Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of strings
 */
const stringArrayDeserializer: Deserializer = {
  type: 'string-array',
  deserializerFunc: (value: any) => {
    if (!Array.isArray(value)) {
      return new Array(value);
    }
    return value;
  },
};

/**
 * Numbers Array Deserializer. It deserializes the value retrieved from the QueryParams to an Array of numbers
 */
const arrayNumberDeserializer: Deserializer = {
  type: 'number-array',
  deserializerFunc: (value: Array<any>[] | any, defaultVal: any) => {
    let returnValue;
    if (Array.isArray(value)) {
      // tslint:disable-next-line:radix
      returnValue = value.map((item) => parseInt(item));
      if (Array.isArray(returnValue)) {
        returnValue = defaultVal;
      }
    } else {
      // tslint:disable-next-line:radix
      returnValue = new Array(parseInt(value));
    }
    return returnValue;
  },
};

/**
 * Boolean Deserializer. It deserializes the value retrieved from the QueryParams to a boolean value
 */
const booleanDeserializer: Deserializer = {
  type: 'boolean',
  deserializerFunc: (value: string) => {
    return value === '1';
  },
};

/**
 * Map of all built-in deserializers.
 */
export const BUILT_IN_DESERIALIZERS = [
  stringDeserializer,
  numberDeserializer,
  stringArrayDeserializer,
  arrayNumberDeserializer,
  booleanDeserializer
];
