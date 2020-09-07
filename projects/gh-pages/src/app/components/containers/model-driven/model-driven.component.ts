import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ui2QpBuilder, Ui2QpRoot} from 'ng-ui2qp';

@Component({
  selector: 'app-model-driven',
  templateUrl: './model-driven.component.html',
  styleUrls: ['./model-driven.component.scss']
})
export class ModelDrivenComponent implements OnInit, OnDestroy {

  root: Ui2QpRoot;

  withConfigCode = `import { NgUi2Qp } from '@ng-ui2qp';

    @NgModule({
        imports: [
            NgUi2Qp.withConfig({
                // Provide configuration here
            }),
        ],
    })
    export class YourModule {}`;

  createRootCode = {
    withModel: `// Assuming ui2QpBuilder is a reference of Ui2QpBuilder that was injected in the component
    const root: Ui2QpRoot  = this.ui2QpBuilder.root(
        this.ui2QpBuilder.group({
         firstName: this.ui2QpBuilder.control(),
         lastName: this.ui2QpBuilder.control(),
        }));`
  };

  modelBindingCode = `// Assuming the "root" property is a Ui2QpRoot accessible where this code is executed
    this.root.model = <Ui2QpGroup instance>;`;

  nestedModelExampleCode = `// The comments are the Qps will be added to the URL for a model with this structure
    {
      firstname: this.ui2QpBuilder.control(),                   //firstname=Yazbel
      lastname: this.ui2QpBuilder.control(),                    //lastname=Cordova
      address: this.ui2QpBuilder.group({
       houseNumber: this.ui2QpBuilder.control({type:'number'}), //address.houseNumber=12
       street: this.ui2QpBuilder.control(),                     //address.street=MoritzburgerStr
       country:this.ui2QpBuilder.control(),                     //address.country=Germany
       state:this.ui2QpBuilder.control(),                       //address.state=Brandenburg
       })
     }`;

  flatModelExampleCode = `// The comments are the Qps will be added to the URL for a model with this structure
    {
      firstname: this.ui2QpBuilder.control(),                   //firstname=Yazbel
      lastname: this.ui2QpBuilder.control(),                    //lastname=Cordova
     }`;

  codesExample = {
    html: `<ng-container [formGroup]="root.model">
        <mat-form-field>
          <mat-label>First Name</mat-label>
          <input matInput formControlName="firstName">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="lastName">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Age</mat-label>
          <input matInput formControlName="age" type="number">
        </mat-form-field>
        <ng-container formGroupName="address">
          <mat-form-field>
            <mat-label>Country</mat-label>
            <input matInput formControlName="country">
          </mat-form-field>
          <mat-form-field>
            <mat-label>State</mat-label>
            <input matInput formControlName="state">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Street</mat-label>
            <input matInput formControlName="street">
          </mat-form-field>
          <mat-form-field>
            <mat-label>House Number</mat-label>
            <input matInput formControlName="houseNumber">
          </mat-form-field>
        </ng-container>
      </ng-container>`,
    css: `Nothing to see here :)`,
    ts: `import {Ui2QpBuilder, Ui2QpGroup, Ui2QpRoot} from 'ng-ui2qp';
     ...
     @Component({
     ...
     })
     export class FullExampleComponent implements OnDestroy{
      root: Ui2QpRoot;
      constructor(private ui2QpBuilder: Ui2QpBuilder) {
         this.root = this.ui2QpBuilder.root(
          this.ui2QpBuilder.group({
            firstName: this.ui2QpBuilder.control({qpName: 'fn'}),
            lastName: this.ui2QpBuilder.control({qpName: 'ln'}),
            age: this.ui2QpBuilder.control({qpName: 'ag', type: 'number', defaultVal: 0}),
            address: this.ui2QpBuilder.group({
              country: this.ui2QpBuilder.control({qpName: 'co'}),
              state: this.ui2QpBuilder.control({qpName: 'st'}),
              street: this.ui2QpBuilder.control({qpName: 'str'}),
              houseNumber: this.ui2QpBuilder.control({qpName: 'hn'}),
            }, {qpName: 'ad'})
          })
        );
      }

      ngOnDestroy() {
        this.root.destroy();
      }
      ...
     }`
  };

  controlDefaultValueCode = `// Assuming "ui2QpBuilder" is an instance of Ui2QpBuilder
    this.ui2QpBuilder.group({
        productName: this.ui2QpBuilder.control(),
        amount: this.ui2QpBuilder.control({type: 'number', defaultVal: 1}),
     }));`;

  constructor(private ui2QpBuilder: Ui2QpBuilder) {
    this.root = this.ui2QpBuilder.root(
      this.ui2QpBuilder.group({
        firstName: this.ui2QpBuilder.control({qpName: 'fn'}),
        lastName: this.ui2QpBuilder.control({qpName: 'ln'}),
        age: this.ui2QpBuilder.control({qpName: 'ag', type: 'number', defaultVal: 0}),
        address: this.ui2QpBuilder.group({
          country: this.ui2QpBuilder.control({qpName: 'co'}),
          state: this.ui2QpBuilder.control({qpName: 'st'}),
          street: this.ui2QpBuilder.control({qpName: 'str'}),
          houseNumber: this.ui2QpBuilder.control({qpName: 'hn'}),
        }, {qpName: 'ad'})
      })
    );
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.root.destroy();
  }

}
