import { Component, OnInit } from '@angular/core';
import { QueryParamsFormGroup } from 'src/app/modules/query-params/classes/query-params-form-group';
import { QueryParamsDefaultRouterService } from 'src/app/modules/query-params/services/query-params-default-router.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-query-params',
  templateUrl: './query-params.component.html',
  styleUrls: ['./query-params.component.scss']
})
export class QueryParamsComponent implements OnInit {

  formGroupQP: QueryParamsFormGroup;
  formGroupQPSettings = {autoUpdating: true, isRoot: true, replaceState: false};

  constructor(private queryParamsDefaultRouterService: QueryParamsDefaultRouterService) {
    this.formGroupQP = new QueryParamsFormGroup(this.queryParamsDefaultRouterService, {
      username: {control: new FormControl(), controlSettings: {defaultVal: ''}},
      password: {control: new FormControl(), controlSettings: {defaultVal: ''}},
      addresses: {control: new QueryParamsFormGroup(this.queryParamsDefaultRouterService, {
        address1: {control: new QueryParamsFormGroup(this.queryParamsDefaultRouterService, {
          address: {control: new FormControl(), controlSettings: {defaultVal: ''}},
          state: {control: new FormControl(), controlSettings: {defaultVal: ''}},
          country: {control: new FormControl(), controlSettings: {defaultVal: ''}},
        }), controlSettings: {type: 'form-group', defaultVal: ''}},
        address2: {control: new QueryParamsFormGroup(this.queryParamsDefaultRouterService, {
          address: {control: new FormControl(), controlSettings: {defaultVal: ''}},
          state: {control: new FormControl(), controlSettings: {defaultVal: ''}},
          country: {control: new FormControl(), controlSettings: {defaultVal: ''}},
        }), controlSettings: {type: 'form-group', defaultVal: ''}},
        address3: {control: new QueryParamsFormGroup(this.queryParamsDefaultRouterService, {
          address: {control: new FormControl(), controlSettings: {defaultVal: ''}},
          state: {control: new FormControl(), controlSettings: {defaultVal: ''}},
          country: {control: new FormControl(), controlSettings: {defaultVal: ''}},
        }), controlSettings: {type: 'form-group', defaultVal: ''}},
      }),
      controlSettings: {type: 'form-group', defaultVal: ''}},
    }, this.formGroupQPSettings);
  }

  ngOnInit() {

  }

}
