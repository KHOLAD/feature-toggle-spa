import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

const imports = [
  MatToolbarModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatFormFieldModule
];

@NgModule({
  imports: [...imports],
  exports: [...imports]
})
export class MaterialModule { }
