import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[templateVar]',
  exportAs: 'var'
})
export class VariableDirective {

  @Input('templateVar') var: unknown;

  constructor() {
  }
}
