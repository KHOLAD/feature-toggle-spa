import {MatFormFieldControl} from '@angular/material/form-field';
import {AbstractControl, ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {Directive, ElementRef, HostBinding, Input, OnDestroy, Optional, Self} from '@angular/core';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';

@Directive()
export abstract class AppCustomFieldDirective<T> implements MatFormFieldControl<T>, ControlValueAccessor, OnDestroy {
  static nextId = 0;

  private PLACEHOLDER = 'Placeholder';
  private REQUIRED = false;
  private DISABLED = false;

  readonly shouldLabelFloat = true;
  readonly stateChanges = new Subject<void>();

  @HostBinding()
  id = `app-field-${AppCustomFieldDirective.nextId++}`;
  @HostBinding('attr.aria-describedby')
  describedBy = '';

  controlType = 'custom-mat-field';
  focused = false;
  errorState = false;
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private elementRef: ElementRef<HTMLElement>,
    private focusMonitor: FocusMonitor
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.stateChanges.complete();
  }

  get control(): AbstractControl | null {
    if (this.ngControl?.control) {
      return this.ngControl.control;
    }

    return null;
  }

  get formController(): FormControl {
    return this.control ? this.control as FormControl : new FormControl();
  }

  get empty(): boolean {
    return !!this.ngControl?.value;
  }

  @Input()
  get placeholder(): string {
    return this.PLACEHOLDER;
  }
  set placeholder(value: string) {
    this.PLACEHOLDER = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this.REQUIRED;
  }
  set required(value: boolean) {
    this.REQUIRED = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this.DISABLED;
  }
  set disabled(value: boolean) {
    if (this.ngControl?.control) {
      this.DISABLED = coerceBooleanProperty(value);
      this.DISABLED ? this.ngControl.control.disable() : this.ngControl.control.enable();
      this.stateChanges.next();
    }
  }

  @Input()
  get value(): T | null {
    if (this.ngControl?.control) {
      return this.ngControl.value;
    }
    return null;
  }
  set value(val: T | null) {
    if (this.ngControl?.control && val !== this.ngControl.control.value) {
      this.ngControl.control.setValue(val);
      this.onChange(val);
      this.stateChanges.next();
    }
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: T): void {
    if (value && this.ngControl?.control) {
      this.ngControl.control.setValue(value);
      this.stateChanges.next();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.DISABLED = isDisabled;
    this.stateChanges.next();
  }
}
