import { Component } from '@angular/core';
import { Feature } from 'src/app/shared/models/feature';
import { FeatureDialogService } from './feature-dialog/feature-dialog.service';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {
  constructor(private featureDialogService: FeatureDialogService) { }

  editFeature(feature: Feature) {
    this.featureDialogService.open(feature);
  }

}
