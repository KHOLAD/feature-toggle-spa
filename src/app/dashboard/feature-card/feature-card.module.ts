import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureTableModule } from './feature-table/feature-table.component.module';
import { FeatureCardComponent } from './feature-card.component';
import { FeatureDialogModule } from './feature-dialog/feature-dialog.module';

@NgModule({
  declarations: [FeatureCardComponent],
  imports: [
    CommonModule,
    FeatureTableModule,
    FeatureDialogModule,
  ],
  exports: [FeatureCardComponent]
})
export class FeatureCardModule { }
