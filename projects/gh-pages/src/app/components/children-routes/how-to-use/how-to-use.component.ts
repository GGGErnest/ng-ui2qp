import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss']
})
export class HowToUseComponent implements OnInit {


  constructor(private title: Title) {
    this.title.setTitle('ng-ui2qp | How to use');
  }

  ngOnInit(): void {
  }

}
