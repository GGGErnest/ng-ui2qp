import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  backgroundColorOpposite: string;
  textColorOpposite: string;

  @Input() backgroundColor;

  @Input() textColor;

  constructor() {
  }

  ngOnInit(): void {
    if (this.backgroundColor) {
        this.backgroundColorOpposite = this.textColor || 'currentColor';
    } else {
      this.backgroundColor = '#616161';
      this.backgroundColorOpposite = 'currentColor';
    }

    if (this.textColor) {
      this.textColorOpposite = this.backgroundColor;
    } else {
      this.textColor = 'currentColor';
      this.textColorOpposite = '#616161';
    }
  }

}
