import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersTabComponent } from './customers-tab.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [CustomersTabComponent, CustomersTabComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  exports: [CustomersTabComponent]
})
export class CustomersTabModule { }
