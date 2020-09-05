import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-getting-starter-route',
  templateUrl: './getting-starter-route.component.html',
  styleUrls: ['./getting-starter-route.component.scss']
})
export class GettingStarterRouteComponent implements OnInit {
  sidebarOpened = true;
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(min-width: 800px)']).subscribe((result => {
      this.sidebarOpened = result.matches;
    }));
  }

  ngOnInit(): void {

  }

}
