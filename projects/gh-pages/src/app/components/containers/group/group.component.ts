import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  configurationsCode = `{
  qpName?: string;
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  }`;

  constructor() {
  }

  ngOnInit(): void {
  }

}
