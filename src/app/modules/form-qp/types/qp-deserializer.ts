import { QpDeserializeFunc } from './types';

export interface QpDeserializer {
  type: string;
  deserializerFunc: QpDeserializeFunc;
}
