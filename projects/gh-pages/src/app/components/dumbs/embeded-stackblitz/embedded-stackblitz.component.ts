import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StackblitzSettings } from '../../../models/stackblitz';
import sdk from '@stackblitz/sdk';

@Component({
  selector: 'app-embedded-stackblitz',
  templateUrl: './embedded-stackblitz.component.html',
  styleUrls: ['./embedded-stackblitz.component.scss']
})
export class EmbeddedStackblitzComponent implements AfterViewInit {

  @Input() configurations!: StackblitzSettings;
  @ViewChild('embedded') outlet: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    sdk.embedProjectId(this.outlet.nativeElement, this.configurations.projectId, this.configurations.opts).then(vm => {
      console.log('Everything went well', vm);
    }).catch(error => {
      console.log(error);
    });
  }
}
