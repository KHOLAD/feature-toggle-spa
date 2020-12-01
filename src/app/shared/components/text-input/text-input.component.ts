import {Component} from '@angular/core';
import {AppCustomFieldDirective} from '../../directives/custom-form-field.directive';

@Component({
  selector: 'app-text-input',
  template: `
    <mat-form-field style="width: 100%">
      <input
        matInput
        [formControl]="formController"
        [required]="required"
        [placeholder]="placeholder">

      <mat-error *ngIf="control?.hasError('required')">
        Field is required.
      </mat-error>

      <mat-error *ngIf="control?.hasError('minlength')">
        Value do not match min length of
        {{ ngControl.control?.errors?.minlength.actualLength}} /
        {{ ngControl.control?.errors?.minlength.requiredLength }}
      </mat-error>

      <mat-error *ngIf="control?.hasError('maxlength')">
        Value do not match max length of
        {{ ngControl.control?.errors?.maxlength.actualLength}} /
        {{ ngControl.control?.errors?.maxlength.requiredLength }}
      </mat-error>
    </mat-form-field>
  `,
})
export class TextInputComponent extends AppCustomFieldDirective<string>{}
