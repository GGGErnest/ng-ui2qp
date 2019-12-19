import { AbstractControl, FormControl } from '@angular/forms';
import { ControlSettings } from './control-settings';
import { QpSerializer } from './qp-serializer';
import { QpDeserializer } from './qp-deserializer';

export class QpAbstractControl extends FormControl {
  serializer: QpSerializer;
  deserializer: QpDeserializer;
  controlSettings: ControlSettings;
  type: string;
  defaultVal?: any;
}
