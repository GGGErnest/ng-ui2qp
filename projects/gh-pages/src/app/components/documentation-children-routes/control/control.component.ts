import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  configurationsCode = `{
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
     }));`;

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Ui2QpControl');
  }

  ngOnInit(): void {
  }

}
