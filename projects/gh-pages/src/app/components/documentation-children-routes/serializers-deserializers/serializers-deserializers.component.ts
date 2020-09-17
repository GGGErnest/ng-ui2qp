import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Deserializer, Serializer, Ui2QpDeserializersService, Ui2QpSerializersService} from 'ng-ui2qp';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-serializers-deserializers',
  templateUrl: './serializers-deserializers.component.html',
  styleUrls: ['./serializers-deserializers.component.scss']
})
export class SerializersDeserializersComponent implements OnInit {

  datePickerControl = new FormControl();

  serializerTypeCode = `{
  type: string;
  serializerFunc: (value: any) => string;
}`;

  stringSerializerCode = `{
  type: 'string',
  serializerFunc: (value: any) => {
    return value;
  },
}`;

  deserializerTypeCode = `{
  type: string;
  deserializerFunc: (value: any, defaultValue: any) => any;
}`;

  numberDeserializerCode = `{
  type: 'number',
  deserializerFunc: (value: any, defaultVal: any) => {
    const returnValue = parseInt(value);
    if (typeof returnValue !== 'number') {
      console.error("The value couldn't be deserialized, instead we used the default value");
      return defaultVal;
    }
    return returnValue;
  },
}`;

  customDeserializerCode = `//Assuming that the deserializer service was injected
this.deserializerService.register({
  type: 'datetime-picker', // Chosen type
  deserializerFunc: (value: string, defaultValue: Date) => {
    return value !== null && value !== '' ? new Date(value) : '';
  }
});`;

  customSerializerCode = `//Assuming that the serializer service was injected
this.serializerService.register({
  type: 'datetime-picker', // Chosen type
  serializerFunc: (value: Date) => {
    return value !== null && value !== undefined ? value.toISOString() : null;
  }
});`;

  codeExample = {
    html: `<mat-form-field appearance="fill">
    <mat-label>Choose a date</mat-label>
    <input matInput [matDatepicker]="picker" [formControl]="datePickerControl" [ui2qpControl]="{type:'datetime-picker', qpName:'date'}">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
</mat-form-field>`,
    ts: `import {Deserializer, Serializer, Ui2QpDeserializersService, Ui2QpSerializersService} from 'ng-ui2qp';
...
@Component({
...
})
export class FullExampleComponent implements OnDestroy{

  datePicker: FormControl = new FormControl();

  constructor(private serializersService: Ui2QpSerializersService,
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
        return new Date(value);
      }
    };

    this.deserializersService.register(datetimePickerDeserializer);
  }
}`,
    css: `Nothing to see here :)`
  };

  constructor(private title: Title, private serializersService: Ui2QpSerializersService,
              private deserializersService: Ui2QpDeserializersService) {
    this.title.setTitle('ng-ui2qp | Serializers and Deserializers');
    this.exampleCodeInit();
  }

  ngOnInit(): void {
  }

  exampleCodeInit() {

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
        return new Date(value);
      }
    };

    this.deserializersService.register(datetimePickerDeserializer);
  }

}
