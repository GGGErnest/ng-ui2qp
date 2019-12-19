import { NgModule } from '@angular/core';
import { LzyLoadContComponent } from './components/lzy-load-content/lzy-load-content.component';
import { LzyLoadItemDirective } from './directives/lzy-load-item.directive';

@NgModule({
  declarations: [LzyLoadContComponent, LzyLoadItemDirective],
  imports: [
  ],
  exports: [LzyLoadContComponent, LzyLoadItemDirective]
})
export class LzyLoadModule { }
