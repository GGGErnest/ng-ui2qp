import { QpDeserializeFunc } from '../types/types';

export interface QpDeserializer {
  type: string;
  deserializerFunc: QpDeserializeFunc;
}
