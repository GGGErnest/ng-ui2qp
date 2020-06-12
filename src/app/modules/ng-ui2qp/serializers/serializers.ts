import {SerializeFunc, Serializer} from '../types/serializer';

/**
 * Built in serializer that is used for serializing the values retrieved from the Ui2QpFormGroup to the query params in the URL
 */
export const DefaultSerializer: Serializer = {
  type: 'string',
  serializerFunc: (value: any) => {
    return value;
  },
};

/**
 * Map of all built-in serializers.
 */
export const BUILD_IN_SERIALIZERS_MAP = new Map<string, SerializeFunc>();
BUILD_IN_SERIALIZERS_MAP.set(DefaultSerializer.type, DefaultSerializer.serializerFunc);
