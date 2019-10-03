import {
  Directive,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';

export const LL_PRO_NAME = "lzyLoadItemPos";

@Directive({
  selector: '[lzyLoadItem]',
  exportAs: 'lazyLoadItem'
})
export class LzyLoadItemDirective {

  // Field that represent the current state of the observed element
  isVisible = false;
  // Field to know if the content should be loaded
  loadContent = false;
  // item position in the results
  _pos: number;

  @Input() set pos(value: number) {
    if (value !== null && value !== undefined) {
      this._pos = value;
      // Marking the html element with the position that it is on the array so is easier to access it in the elements array
      this.renderer.setProperty(this.hostElement.nativeElement, LL_PRO_NAME, this._pos);
    }
  }

  get pos(): number {
    return this._pos;
  }

  constructor(
    public hostElement: ElementRef,
    private renderer: Renderer2) {

  }

}
