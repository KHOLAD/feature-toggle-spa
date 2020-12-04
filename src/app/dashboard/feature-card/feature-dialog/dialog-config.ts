import {MatDialogConfig} from '@angular/material/dialog';
import {Feature} from '../../../shared/models/feature';

export const getFeatureDialogConfig = (feature?: Feature): MatDialogConfig => {
  return { width: '650px', height: '500px', data: feature };
};
