import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Feature } from '../../../shared/models/feature';

@Component({
  selector: 'app-feature-table',
  templateUrl: './feature-table.component.html',
  styleUrls: ['./feature-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureTableComponent {
  @Input()
  isLoading = false;

  @Input()
  featureFlags: Feature[] = [
    {
      id: "1",
      displayName: "My feature",
      technicalName: "my-feature",
      expiresOn: new Date(),
      description: "Description",
      inverted: true,
      customerIds: ["1", "2"]
    }
  ]

  @Output()
  public onEdit = new EventEmitter<Feature>()

  displayedColumns: string[] = ['id', 'inverted', 'feature_flag', 'description', 'expiresOn', 'action'];
}
