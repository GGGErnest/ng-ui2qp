import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Changelog');
  }

  ngOnInit(): void {
  }

}
