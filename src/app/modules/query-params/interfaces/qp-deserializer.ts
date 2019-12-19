import { QpAbstractControl } from '../types/types';

export interface QpDeserializer {
  type: string;
  serializerFunc: (value: any, control: QpAbstractControl) => void;
}
