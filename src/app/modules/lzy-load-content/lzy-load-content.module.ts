import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LzyLoadContComponent } from './components/lzy-load-content/lzy-load-content.component';
import { LzyLoadItemDirective } from './directives/lzy-load-item.directive';
//

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LzyLoadContComponent,
    LzyLoadItemDirective
  ],
  exports: [
    LzyLoadContComponent,
    LzyLoadItemDirective
  ]
})
export class LzyLoadContentModule {}
