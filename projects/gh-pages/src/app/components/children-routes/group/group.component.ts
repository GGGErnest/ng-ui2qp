import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

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

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Ui2QpGroup');
  }

  ngOnInit(): void {
  }

}
