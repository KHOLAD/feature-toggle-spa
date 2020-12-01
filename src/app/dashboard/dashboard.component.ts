import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeatureDialogComponent } from './feature-card/feature-dialog/feature-dialog.component';
import { FeatureDialogService } from './feature-card/feature-dialog/feature-dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private featureDialog: FeatureDialogService) { }

  openFeatureDialog() {
    this.featureDialog.open();
  }
}
