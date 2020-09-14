import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Ui2QpBuilder, Ui2QpRoot} from 'ng-ui2qp';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-getting-starter-route',
  templateUrl: './getting-starter-route.component.html',
  styleUrls: ['./getting-starter-route.component.scss']
})
export class GettingStarterRouteComponent implements OnInit {
  sidebarOpened = true;
  root: Ui2QpRoot;

  codesExamples = {
    installation: {
      schematics: `ng add ng-ui2qp`,
      npm: `npm i ng-ui2qp`
    },
    importModule: `NgUi2QpModule`,
    injectBuilder: `constructor(private ui2QpBuilder: Ui2QpBuilder) {
     ...
    }`,
    createGroup: `const model = this.ui2QpBuilder.group(
        {
          firstName: this.ui2QpBuilder.control(),
          lastName: this.ui2QpBuilder.control(),
        });`,
    createRoot: {
      withModel: `const root: Ui2QpRoot  = this.ui2QpBuilder.root(model);`,
      allInOnce: `const root: Ui2QpRoot  = this.ui2QpBuilder.root(
        this.ui2QpBuilder.group({
         firstName: this.ui2QpBuilder.control(),
         lastName: this.ui2QpBuilder.control(),
        }));`
    },
    bindModelWithTemplate: `<ng-container [formGroup]="root.model">
      <input formControlName="firstName">
      <input formControlName="lastName">
    </ng-container>`,
    defaultSettings: `{
      autoUpdating: {enabled: true, debounce: 500},
      replaceState: true,
      logLevel: LogLevel.Off,
      cryptoSecretKey: 'Th3M0st5ecureS3cretK3Y'
    }`,
    fullExample: {
      html: `<ng-container [formGroup]="root.model">
      <input formControlName="firstName">
      <input formControlName="lastName">
    </ng-container>`,
      ts: `import {Ui2QpBuilder, Ui2QpGroup, Ui2QpRoot} from 'ng-ui2qp';
     ...
     @Component({
     ...
     })
     export class FullExampleComponent{
      root: Ui2QpRoot;
      constructor(private ui2QpBuilder: Ui2QpBuilder) {
       this.root = this.ui2QpBuilder.root(
        this.ui2QpBuilder.group({
         firstName: this.ui2QpBuilder.control(),
         lastName: this.ui2QpBuilder.control(),
        }));
      }
      ...
     }`,
      css: `Nothing here :)`
    }
  };
  constructor(breakpointObserver: BreakpointObserver, private ui2QpBuilder: Ui2QpBuilder, public titleService: Title ) {
    breakpointObserver.observe(['(min-width: 800px)']).subscribe((result => {
      this.sidebarOpened = result.matches;
    }));

    this.root = this.ui2QpBuilder.root(
      this.ui2QpBuilder.group({
        firstName: this.ui2QpBuilder.control(),
        lastName: this.ui2QpBuilder.control(),
      })
    );

    this.titleService.setTitle('ng-ui2qp | Getting Starter');
  }

  ngOnInit(): void {

  }

}
