import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { Feature } from '../../../shared/models/feature';

@Component({
  selector: 'app-feature-table',
  templateUrl: './feature-table.component.html',
  styleUrls: ['./feature-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureTableComponent {
  @Input()
  featureFlags: Feature[] = [];

  @Input()
  isLoading: boolean | null = false;

  @Output()
  public editFeature = new EventEmitter<Feature>();

  displayedColumns: string[] = ['id', 'inverted', 'feature_flag', 'description', 'expiresOn', 'action'];
}
