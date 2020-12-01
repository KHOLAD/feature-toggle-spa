import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feature } from '../../../shared/models/feature';

@Component({
  selector: 'app-feature-dialog',
  templateUrl: './feature-dialog.component.html',
  styleUrls: ['./feature-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Feature) { }

  featureForm = FeatureDialogComponent.createFeatureForm();
  dialogTile = 'New Feature';
  minDate = new Date();

  private static createFeatureForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      displayName: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      technicalName: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      expiresOn: new FormControl(null),
      description: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      inverted: new FormControl(false),
      customerIds: new FormControl([], [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.dialogTile = `Update - ${this.data.displayName}`;
      this.featureForm.patchValue(this.data);
    }

    this.featureForm.valueChanges.subscribe(() => {
      console.log(this.featureForm.value);
    });
  }

}
