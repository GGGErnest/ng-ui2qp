import {Component, OnDestroy} from '@angular/core';
import {Deserializer, Serializer, Ui2QpBuilder, Ui2QpDeserializersService, Ui2QpGroup, Ui2QpRoot, Ui2QpSerializersService} from 'ng-ui2qp';

@Component({
  selector: 'app-form-qp',
  templateUrl: './ui2qp.component.html',
  styleUrls: ['./ui2qp.component.scss'],
})
export class Ui2QpComponent implements OnDestroy {

  root: Ui2QpRoot;
  showAddress3 = false;
  model: Ui2QpGroup;

  constructor(private ui2QpBuilder: Ui2QpBuilder, private serializersService: Ui2QpSerializersService,
              private deserializersService: Ui2QpDeserializersService) {

    const dateTimePickerType = 'datetime-picker';
    // defining a custom serializer for the datetime-picker
    const datetimePickerSerializer: Serializer = {
      type: dateTimePickerType,
      serializerFunc: (value: Date) => {
        return value !== null && value !== undefined ? value.toISOString() : null;
      }
    };

    this.serializersService.register(datetimePickerSerializer);

    // defining a custom deserializer for the datetime-picker
    const datetimePickerDeserializer: Deserializer = {
      type: dateTimePickerType,
      deserializerFunc: (value: string) => {
        return value !== null && value !== '' ? new Date(value) : '';
      }
    };

    this.deserializersService.register(datetimePickerDeserializer);

    this.root = this.ui2QpBuilder.root({autoUpdating: {enabled: true}, replaceState: true},
      this.ui2QpBuilder.group({
        username: this.ui2QpBuilder.control(),
        password: this.ui2QpBuilder.control(),
        birthday: this.ui2QpBuilder.control(dateTimePickerType),
        addresses: this.ui2QpBuilder.group({
          address1: this.ui2QpBuilder.group({
            address: this.ui2QpBuilder.control(),
            state: this.ui2QpBuilder.control(),
            country: this.ui2QpBuilder.control(),
            number: this.ui2QpBuilder.control('number'),
          }),
          address2: this.ui2QpBuilder.group({
            address: this.ui2QpBuilder.control(),
            state: this.ui2QpBuilder.control(),
            country: this.ui2QpBuilder.control(),
          }),
        }),
      }));
  }

  toggleAddress3() {

    if (!this.showAddress3) {

      const addressGroup = this.ui2QpBuilder.group({
        address: this.ui2QpBuilder.control(),
        state: this.ui2QpBuilder.control(),
        country: this.ui2QpBuilder.control(),
      });

      (this.root.model.get('addresses') as Ui2QpGroup).addControl('address3', addressGroup);

      this.showAddress3 = true;

    } else {
      (this.root.model.get('addresses') as Ui2QpGroup).removeControl('address3');
      this.showAddress3 = false;
    }

  }

  updateQp() {
    this.root.updateQp();
  }

  ngOnDestroy() {
    this.root.destroy();
  }
}
