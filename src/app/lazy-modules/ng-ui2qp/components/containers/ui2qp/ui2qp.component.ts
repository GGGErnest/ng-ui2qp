import {Component, OnInit} from '@angular/core';
import {Ui2QpRoot} from '../../../../../modules/ng-ui2qp/classes/ui2qp-root';
import {Ui2QpBuilder} from '../../../../../modules/ng-ui2qp/services/ui2qp-builder.service';
import {Ui2QpFormGroup} from '../../../../../modules/ng-ui2qp/classes/ui2qp-form-group';

@Component({
  selector: 'app-form-qp',
  templateUrl: './ui2qp.component.html',
  styleUrls: ['./ui2qp.component.scss'],
})
export class Ui2QpComponent implements OnInit {
  root: Ui2QpRoot;
  showAddress3 = false;
  model: Ui2QpFormGroup;

  constructor(private ui2QpBuilder: Ui2QpBuilder) {
    this.model = this.ui2QpBuilder.group({
      username: this.ui2QpBuilder.control(),
      password: this.ui2QpBuilder.control(),
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
    });

    this.root = this.ui2QpBuilder.root({autoUpdating: {enabled: true}, replaceState: false});
    // this.root.model = this.model;
  }

  ngOnInit() {
  }

  toggleAddress3() {
    if (!this.showAddress3) {
      this.root.model = this.model;

      const addressGroup = this.ui2QpBuilder.group({
        address: this.ui2QpBuilder.control(),
        state: this.ui2QpBuilder.control(),
        country: this.ui2QpBuilder.control(),
      });
      (this.model.get('addresses') as Ui2QpFormGroup).addControl(
        'address3',
        addressGroup
      );
      this.showAddress3 = true;
    } else {
      (this.model.get('addresses') as Ui2QpFormGroup).removeControl(
        'address3'
      );
      this.showAddress3 = false;
    }
  }

  updateQp() {
    this.root.updateQp();
  }
}
