import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'code-box',
  templateUrl: './code-box.component.html',
  styleUrls: ['./code-box.component.scss']
})
export class CodeBoxComponent implements OnInit {

  @Input() code!: string;
  @Input() languages = ['typescript', 'html', 'css'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
