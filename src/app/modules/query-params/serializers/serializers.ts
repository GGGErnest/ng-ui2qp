import { QpDeserializer } from '../interfaces/qp-deserializer';
import { QpAbstractControl } from '../types/types';

export const stringSerializer: QpDeserializer = {
  type: 'string',
  serializerFunc: (value: any, control: QpAbstractControl) => {
    control.control.setValue(value);
  }
};

export const numberSerializer: QpDeserializer = {
  type: 'number',
  serializerFunc: (value: any, control: QpAbstractControl) => {
    if (value !== '') {
      control.control.setValue(parseInt(value));
    } else {
      control.control.setValue(control.controlSettings.defaultVal);
    }
  }
};

export const stringArrySerializer: QpDeserializer = {
  type: 'string-array',
  serializerFunc: (value: any, control: QpAbstractControl) => {
    control.control.setValue(value);
  }
};

export const arrayNumberSerializer: QpDeserializer = {
  type: 'array-number',
  serializerFunc: (value: any, control: QpAbstractControl) => {
    control.control.setValue(value.map(item => parseInt(item)));
  }
};
