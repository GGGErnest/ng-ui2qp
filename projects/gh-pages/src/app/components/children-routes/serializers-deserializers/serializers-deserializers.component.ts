import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-serializers-deserializers',
  templateUrl: './serializers-deserializers.component.html',
  styleUrls: ['./serializers-deserializers.component.scss']
})
export class SerializersDeserializersComponent implements OnInit {

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
       // tslint:disable-next-line:radix
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

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Serializers and Deserializers');
  }

  ngOnInit(): void {
  }

}
