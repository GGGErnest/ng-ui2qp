import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-documentation-route',
  templateUrl: './documentation-route.component.html',
  styleUrls: ['./documentation-route.component.scss']
})
export class DocumentationRouteComponent implements OnInit {

  sidebarOpened = true;
  advanceTopicsOpened = true;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(min-width: 800px)']).subscribe((result => {
      this.sidebarOpened = result.matches;
    }));
  }

  ngOnInit(): void {
  }

  onSubMenuClick($event: Event) {
    console.log('executed');
      this.advanceTopicsOpened = !this.advanceTopicsOpened;
  }

}
