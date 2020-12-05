import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureTableModule } from './feature-table/feature-table.component.module';
import { FeatureCardComponent } from './feature-card.component';
import { FeatureDialogModule } from './feature-dialog/feature-dialog.module';
import {MatTabsModule} from '@angular/material/tabs';
import {CustomersTabModule} from './customers-tab/customers-tab.module';

@NgModule({
  declarations: [FeatureCardComponent],
  imports: [
    CommonModule,
    FeatureTableModule,
    FeatureDialogModule,
    MatTabsModule,
    CustomersTabModule
  ],
  exports: [FeatureCardComponent]
})
export class FeatureCardModule { }
