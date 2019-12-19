import { QpAbstractControl } from '../types/types';

export interface QpSerializer {
  type: string;
  serializerFunc: (value: any, control: QpAbstractControl) => void;
}
