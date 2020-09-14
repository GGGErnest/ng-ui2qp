import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Introduction');
  }

  ngOnInit(): void {
  }

}
