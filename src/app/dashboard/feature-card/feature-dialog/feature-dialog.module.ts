import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FeatureDialogComponent } from './feature-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {TextInputModule} from '../../../shared/components/text-input/text-input.module';
import {MultiSelectModule} from '../../../shared/components/multi-select/multi-select.module';

@NgModule({
  declarations: [FeatureDialogComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatInputModule,
    TextInputModule,
    MultiSelectModule,
  ],
  exports: [FeatureDialogComponent]
})
export class FeatureDialogModule { }
