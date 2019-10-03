import { NgModule } from '@angular/core';
import { LzyLoadContComponent } from './components/lazy-load-content/lazy-load-content.component';
import { LzyLoadItemDirective } from './directives/lazy-load-item.directive';



@NgModule({
  declarations: [LzyLoadContComponent, LzyLoadItemDirective],
  imports: [
  ],
  exports: [LzyLoadContComponent, LzyLoadItemDirective]
})
export class LzyLoadModule { }
