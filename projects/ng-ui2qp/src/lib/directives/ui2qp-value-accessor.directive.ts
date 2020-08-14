import { Directive, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * This code was taken from ngqp lib check this https://www.ngqp.io/api-docs/directives/ControlValueAccessorDirective.html#source
 *
 * Provides an ad-hoc ControlValueAccessor to a component that doesn't implements it.
 *
 * This directive provides a ControlValueAccessor for the host on which it is applied
 * by proxying the required interface through events and an API.
 *
 *
 *     <component-without-control-value-accessor
 *              #ctrl
 *              controlValueAccessor #accessor="controlValueAccessor"
 *              (itemChange)="accessor.notifyChange($event)"
 *              (controlValueChange)="ctrl.item = $event">
 *     </component-without-control-value-accessor>
 */
@Directive({
  selector: '[ui2QpValueAccessor]',
  exportAs: 'controlValueAccessor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ui2qpValueAccessorDirective),
      multi: true
    }
  ],
})
export class Ui2qpValueAccessorDirective implements ControlValueAccessor {

  /**
   * Fired when a value should be written (model -> view).
   *
   * From the ControlValueAccessor perspective, this is the equivalent of
   * writeValue. You should bind to this event and update your component's
   * state with the given value.
   */
  @Output()  public controlValueChange = new EventEmitter<any>();

  /**
   * Fired when the control's disabled change should change.
   *
   * From the ControlValueAccessor perspective, this is the equivalent of
   * setDisabledState.
   */
  @Output()  public disabledChange = new EventEmitter<boolean>();

  private fnChange = (_: any) => {};
  private fnTouched = () => {};

  /**
   * Write a new value to the model (view -> model)
   *
   * When your component's value changes, call this method to inform
   * the model about the change.
   */
  public notifyChange(value: any): void {
    this.fnChange(value);
  }

  /**
   * Inform that the component has been touched by the user.
   */
  public notifyTouched(): void {
    this.fnTouched();
  }

  /** @internal */
  public writeValue(value: any) {
    this.controlValueChange.emit(value);
  }

  /** @internal */
  public registerOnChange(fn: (value: any) => any) {
    this.fnChange = fn;
  }

  /** @internal */
  public registerOnTouched(fn: () => any) {
    this.fnTouched = fn;
  }

  /** @internal */
  public setDisabledState(isDisabled: boolean) {
    this.disabledChange.emit(isDisabled);
  }

}
