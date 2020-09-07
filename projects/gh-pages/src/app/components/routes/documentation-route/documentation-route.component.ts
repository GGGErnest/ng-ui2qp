import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-documentation-route',
  templateUrl: './documentation-route.component.html',
  styleUrls: ['./documentation-route.component.scss']
})
export class DocumentationRouteComponent implements OnInit {

  sidebarOpened = true;
  advanceTopicsOpened = true;
  howToUseOpened = true;

  constructor(breakpointObserver: BreakpointObserver, private router: Router, private activatedRoute: ActivatedRoute) {
    breakpointObserver.observe(['(min-width: 800px)']).subscribe((result => {
      this.sidebarOpened = result.matches;
    }));
  }

  ngOnInit(): void {
  }

  onAdvanceTopicsSubMenuClick() {
    this.advanceTopicsOpened = !this.advanceTopicsOpened;
  }

  onHowToUseSubMenuClick() {
    this.howToUseOpened = !this.howToUseOpened;
    this.router.navigate(['how-to-use'], {relativeTo: this.activatedRoute});
  }

}
