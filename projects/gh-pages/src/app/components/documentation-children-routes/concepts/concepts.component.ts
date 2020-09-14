import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | Concepts');
  }

  ngOnInit(): void {
  }

}
