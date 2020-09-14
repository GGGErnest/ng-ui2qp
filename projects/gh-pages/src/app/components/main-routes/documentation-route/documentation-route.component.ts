import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-documentation-route',
  templateUrl: './documentation-route.component.html',
  styleUrls: ['./documentation-route.component.scss']
})
export class DocumentationRouteComponent implements OnInit, AfterViewInit {
  sidebarOpened = true;
  advanceTopicsOpened = true;
  howToUseOpened = true;
  isScreenWidthBigger800px = false;

  @ViewChild(MatSidenav, {static: true}) sideBar: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
              private activatedRoute: ActivatedRoute, public titleService: Title) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.breakpointObserver.observe(['(min-width: 800px)']).subscribe((result => {
        this.sideBar.toggle(result.matches);
        this.isScreenWidthBigger800px = result.matches;
      }));
    }, 0);
  }

  onAdvanceTopicsSubMenuClick() {
    this.advanceTopicsOpened = !this.advanceTopicsOpened;
  }

  onHowToUseSubMenuClick() {
    this.howToUseOpened = !this.howToUseOpened;
    this.router.navigate(['how-to-use'], {relativeTo: this.activatedRoute});
  }

}
