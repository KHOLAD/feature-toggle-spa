import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureTableComponent } from './feature-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [FeatureTableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports: [FeatureTableComponent]
})
export class FeatureTableModule { }
