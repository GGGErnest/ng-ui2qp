import {Component, OnInit} from '@angular/core';
import {Ui2QpBuilder, Ui2QpRoot} from 'ng-ui2qp';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.scss']
})
export class HomeRouteComponent implements OnInit {
  root: Ui2QpRoot;

  exampleCode = {
    html: `<ng-container [formGroup]="root.model">
        <mat-form-field>
          <mat-label for="">First Name</mat-label>
          <input matInput formControlName="firstName">
        </mat-form-field>
        <mat-form-field>
          <mat-label for="">Last Name</mat-label>
          <input matInput formControlName="lastName">
        </mat-form-field>
        <mat-form-field>
          <mat-label for="">Age</mat-label>
          <input matInput formControlName="age" type="number">
        </mat-form-field>
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
          })
        );
      }

      ngOnDestroy() {
        this.root.destroy();
      }
      ...
     }`
  };

  constructor(private ui2QpBuilder: Ui2QpBuilder, private router: Router, private titleService: Title) {
    this.root = this.ui2QpBuilder.root(
      this.ui2QpBuilder.group({
        firstName: this.ui2QpBuilder.control({qpName: 'fn'}),
        lastName: this.ui2QpBuilder.control({qpName: 'ln'}),
        age: this.ui2QpBuilder.control({qpName: 'ag', type: 'number'}),
      })
    );
    this.titleService.setTitle('ng-ui2qp | Home');
  }

  ngOnInit(): void {
  }

}
