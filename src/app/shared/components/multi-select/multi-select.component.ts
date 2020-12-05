import {Component, Input} from '@angular/core';
import {AppCustomFieldDirective} from '../../directives/custom-form-field.directive';
import {AvailableCustomers} from '../../models/customer';

@Component({
  selector: 'app-multi-select',
  template: `
    <mat-form-field>
      <mat-label>{{placeholder}}</mat-label>
      <mat-select [required]="required" [formControl]="formController" multiple>
        <mat-option *ngFor="let val of list" [value]="val.id">{{val?.name}}</mat-option>
      </mat-select>

      <mat-error *ngIf="control?.hasError('required')">
        Field is required.
      </mat-error>
    </mat-form-field>
  `,
  styles: [
    `
      :host{
        width: 100%;
      }
      .mat-form-field {
        width: 100%;
      }
    `
  ]
})
export class MultiSelectComponent extends AppCustomFieldDirective<Array<string>>{
  @Input() list: AvailableCustomers[] = [];
  @Input() set isDisabled(val: boolean) {
    if (val) {
      this.formController.disable();
      return;
    }

    this.formController.enable();
  }
}
