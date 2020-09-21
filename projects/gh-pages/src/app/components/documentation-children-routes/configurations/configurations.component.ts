import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  configurationObjectCode = `{
  autoUpdating: {
    enabled: boolean;
    debounce: boolean;
  },
  replaceState: boolean,
  logLevel: LogLevel,
  cryptoSecretKey: string
}`;

  defaultSettingsCode = `{
  autoUpdating: {
    enabled: true,
    debounce: 500
  },
  replaceState: true,
  logLevel: LogLevel.Off,
  cryptoSecretKey: 'Th3M0st5ecureS3cretK3Y'
}`;

  autoUpdatingSettingsCode = `{
  enabled: true, // Enable or disable the auto-updating
  debounce: 500 // Debounce time in milliseconds. Used to reduce the frequency the QPs get updated after changes in the model.
}`;

  loginLevelCode = `Trace, Debug, Info, Warn, Error, Off`;

  configurationsCode = `{
  qpName?: string;
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
 }`;

  groupConfigurationsCode = `this.ui2QpBuilder.group({
  firstName: this.ui2QpBuilder.control({qpName: 'fn'}),
  lastName: this.ui2QpBuilder.control({qpName: 'ln'}),
  age: this.ui2QpBuilder.control({qpName: 'ag', type: 'number', defaultVal: 0}),
  address: this.ui2QpBuilder.group({
    country: this.ui2QpBuilder.control({qpName: 'co'}),
    state: this.ui2QpBuilder.control({qpName: 'st'}),
    street: this.ui2QpBuilder.control({qpName: 'str'}),
    houseNumber: this.ui2QpBuilder.control({qpName: 'hn'}),
  }, {qpName: 'ad'}) // Configurations passed into the "address" Ui2QpGroup
})`;

  controlConfigurationsCode = `{
  qpName?: string;
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  type?: string;
  defaultVal?: any;
  state?: any;
}`;

  controlDefaultValueCode = `// Assuming "ui2QpBuilder" is an instance of Ui2QpBuilder
this.ui2QpBuilder.group({
  productName: this.ui2QpBuilder.control(),
  amount: this.ui2QpBuilder.control({type: 'number', defaultVal: 1}),
});`;

  controlDirectiveConfCode = {
    config: `{
  qpName: string;
  defaultValue?: any;
  type?: string;
}`,
    defaultVal: `{
  defaultValue: null,
  type: 'string'
}`
  };

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Configurations');
  }

  ngOnInit(): void {
  }

}
