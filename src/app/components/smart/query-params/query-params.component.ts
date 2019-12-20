import { Component, OnInit } from '@angular/core';
import { QpRoot } from 'src/app/modules/query-params/classes/qp-root';
import { QpBuilderService } from 'src/app/modules/query-params/services/qp-builder.service';

@Component({
  selector: 'app-query-params',
  templateUrl: './query-params.component.html',
  styleUrls: ['./query-params.component.scss']
})
export class QueryParamsComponent implements OnInit {

  qpRoot: QpRoot;
  formGroupQPSettings = {autoUpdating: true, isRoot: true, replaceState: false};

  constructor(private qpBuilderService: QpBuilderService) {
    this.qpRoot = this.qpBuilderService.qpRoot({autoUpdating: true, replaceState: false}, {
      username: this.qpBuilderService.qpFormControl(),
      password: this.qpBuilderService.qpFormControl(),
      addresses: this.qpBuilderService.qpGroup({
        address1: this.qpBuilderService.qpGroup({
          address: this.qpBuilderService.qpFormControl(),
          state: this.qpBuilderService.qpFormControl(),
          country: this.qpBuilderService.qpFormControl(),
        }),
        address2: this.qpBuilderService.qpGroup({
          address: this.qpBuilderService.qpFormControl(),
          state: this.qpBuilderService.qpFormControl(),
          country: this.qpBuilderService.qpFormControl(),
        }),
        address3: this.qpBuilderService.qpGroup({
          address: this.qpBuilderService.qpFormControl(),
          state: this.qpBuilderService.qpFormControl(),
          country: this.qpBuilderService.qpFormControl(),
        }),
      })
    });
  }

  ngOnInit() {

  }

}
