import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FeatureDialogComponent } from './feature-dialog.component';
import { Feature } from '../../../shared/models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureDialogService {

  constructor(private matDialog: MatDialog) { }

  open(feature?: Feature): void {
    this.matDialog.open(FeatureDialogComponent, { width: '650px', height: '500px', data: feature });
  }
}
