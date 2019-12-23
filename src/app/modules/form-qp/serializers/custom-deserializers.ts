import { QpDeserializer } from '../types/qp-deserializer';

export const stringDeserializer: QpDeserializer = {
  type: 'string',
  deserializerFunc: (value: any, defaultVal:any) => {
    return value
  }
};

export const numberDeserializer: QpDeserializer = {
  type: 'number',
  deserializerFunc: (value: any, defaultVal: any) => {
    if (value !== '') {
      return parseInt(value);
    } else {
     return defaultVal;
    }
  }
};

export const stringArryDeserializer: QpDeserializer = {
  type: 'string-array',
  deserializerFunc: (value: any, defaultVal: any) => {
    return value;
  }
};

export const arrayNumberDeserializer: QpDeserializer = {
  type: 'array-number',
  deserializerFunc: (value: any, defaultVal: any) => {
    return value.map(item => parseInt(item));
  }
};

export const CUSTOM_DESERIALIZERS = [ stringDeserializer, numberDeserializer, stringArryDeserializer, arrayNumberDeserializer];
