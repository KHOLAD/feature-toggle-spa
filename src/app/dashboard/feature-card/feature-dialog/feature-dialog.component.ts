import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Feature } from '../../../shared/models/feature';
import {FeatureService} from '../../../shared/services/feature.service';
import {Observable} from 'rxjs';
import {CustomerService} from '../../../shared/services/customer.service';
import {AvailableCustomers} from '../../../shared/models/customer';

@Component({
  selector: 'app-feature-dialog',
  templateUrl: './feature-dialog.component.html',
  styleUrls: ['./feature-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Feature,
    private featureService: FeatureService,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<FeatureDialogComponent>
  ) { }

  featureForm = FeatureDialogComponent.createFeatureForm();
  dialogTile = 'New Feature';
  minDate = new Date();
  isLoading$: Observable<boolean> = this.featureService.featuresLoadingState$;
  customerList$: Observable<AvailableCustomers[]> = this.customerService.customersList$;
  customersLoading$: Observable<boolean> = this.customerService.isLoading$;

  private static createFeatureForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      displayName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      technicalName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\S{3,}$/)
      ]),
      expiresOn: new FormControl(null),
      description: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      inverted: new FormControl(false),
      customerIds: new FormControl([], [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.dialogTile = `Update - ${this.data.technicalName}`;
      this.featureForm.patchValue(this.data);
      this.featureForm.controls.customerIds.disable();
      this.featureForm.controls.technicalName.disable();
    }

    this.customerService.getAvailableCustomers().subscribe();
  }

  public onSubmit(): void {
    const value: Feature = this.featureForm.getRawValue();
    this.dialogRef.close(value);
  }

}
