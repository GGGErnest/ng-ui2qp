import { QpSerializeFunc } from './types';

export interface QpSerializer {
  type: string;
  serializerFunc: QpSerializeFunc;
}
