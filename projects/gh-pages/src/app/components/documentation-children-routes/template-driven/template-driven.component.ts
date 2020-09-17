import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent implements OnInit {

  options = new FormControl();


  withConfigCode = `import { NgUi2Qp } from '@ng-ui2qp';
@NgModule({
  imports: [
    NgUi2Qp.withConfig({
      // Provide configuration here
    }),
    ],
})
export class YourModule {}`;

  controlDirectiveNativeInputExampleCode = {
    html: `<select [ui2qpControl]="{type:'number-array', qpName:'options'}" multiple [formControl]="options">
 <option value="">Empty</option>
 <option value="1">First option</option>
 <option value="2">Second Option</option>
 <option value="3">Third option</option>
</select>`,
    ts: `@Component({
    ...
  })
  export class ExampleComponent {
    options = new FormControl();
    ...
  }`,
  };

  controlDirectiveWithCVAExampleCode = `<component-with-control-value-accessor [ui2qpControl]="{qpName:'cva', type:'number'}>
</component-with-control-value-accessor>`;

  controlDirectiveWithoutCVAExampleCode = `<input type="checkbox" [ui2qpControl]="{qpName:'check', type:'boolean'}"
       ui2QpValueAccessor #accessor="controlValueAccessor" (controlValueChange)="ctrl.value = $event"
       #ctrl (input)="accessor.notifyChange($event.target.value)">`;

  fullExampleCode = {
    html: `// Custom component example using Material Design radio buttons
<mat-form-field appearance="fill">
    <mat-label>Choose a date</mat-label>
    <input matInput [matDatepicker]="picker" [ui2qpControl]="{qpName:'birthday'}">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
</mat-form-field>

// Example of using Ui2qpValueAccessorDirective on a native input.
<mat-form-field>
    <mat-label for="">First Name</mat-label>
    <input matInput type="checkbox" [ui2qpControl]="{qpName:'checked', type:'boolean'}"
        ui2QpValueAccessor #accessor2="controlValueAccessor" (controlValueChange)="ctrl2.value = $event"
        #ctrl2 (input)="accessor2.notifyChange($event.target.value)">
</mat-form-field>

//This example binds a FormControl instance to a native input as a way of providing it with a ControlValueAccessor implementation.
<mat-form-field>
    <mat-label for="">Last Name</mat-label>
    <select matInput name="select" [ui2qpControl]="{type:'number-array', qpName:'options'}" multiple [formControl]="options">
        <option value="">Empty</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
</mat-form-field>`,
    ts: `@Component({
...
})
export class ExampleComponent {
  options = new FormControl();
  ...
}`
};

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Template-Driven');
  }

  ngOnInit(): void {
  }

}
