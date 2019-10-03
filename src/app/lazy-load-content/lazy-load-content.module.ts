import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LzyLoadContComponent } from './components/lazy-load-content/lazy-load-content.component';
import { LzyLoadItemDirective } from './directives/lazy-load-item.directive';
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
export class LazyLoadContentModule {}
