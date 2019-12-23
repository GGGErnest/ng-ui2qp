import { QpSerializeFunc } from '../types/types';

export interface QpSerializer {
  type: string;
  serializerFunc: QpSerializeFunc;
}
