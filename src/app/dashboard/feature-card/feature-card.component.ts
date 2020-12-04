import {Component, OnDestroy, OnInit} from '@angular/core';
import { Feature } from 'src/app/shared/models/feature';
import {MatDialog} from '@angular/material/dialog';
import {FeatureDialogComponent} from './feature-dialog/feature-dialog.component';
import {getFeatureDialogConfig} from './feature-dialog/dialog-config';
import {FeatureService} from './services/feature.service';
import {Observable, Subject} from 'rxjs';
import {filter, mergeMap, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent implements OnInit, OnDestroy {
  readonly features$: Observable<Feature[]> = this.featureService.featureList$;
  readonly isLoading$ = this.featureService.featuresLoadingState$;
  private readonly onDestroy$ = new Subject<void>();

  constructor(private matDialog: MatDialog, private featureService: FeatureService) { }

  ngOnInit(): void {
    this.featureService.getFeatures().subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  editFeature(feature: Feature): void {
    const dialogRef = this.matDialog.open(FeatureDialogComponent, getFeatureDialogConfig(feature));
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.onDestroy$),
        filter(v => !!v),
        mergeMap((f) =>
          this.featureService.updateFeature(f).pipe(switchMap(() => this.featureService.getFeatures()))
        ),
      ).subscribe();
  }

}
