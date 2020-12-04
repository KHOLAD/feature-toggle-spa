import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FeatureDialogComponent} from './feature-card/feature-dialog/feature-dialog.component';
import {getFeatureDialogConfig} from './feature-card/feature-dialog/dialog-config';
import {filter, mergeMap, switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FeatureService} from './feature-card/services/feature.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  private readonly onDestroy$ = new Subject<void>();
  constructor(private matDialog: MatDialog, private featureService: FeatureService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openFeatureDialog(): void {
    const dialogRef = this.matDialog.open(FeatureDialogComponent, getFeatureDialogConfig());
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.onDestroy$),
        filter(v => !!v),
        mergeMap((f) =>
          this.featureService.createFeature(f).pipe(
            switchMap(() => this.featureService.getFeatures()))
        ),
      ).subscribe();
  }
}
