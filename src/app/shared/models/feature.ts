export interface Feature {
    id?: string;
    displayName: string;
    technicalName: string;
    expiresOn?: Date;
    description: string;
    inverted: boolean;
    customerIds: string[];
}

export class FeatureAdapter {
  static adapt(f: any): Feature {
    return {
      id: f?.id,
      displayName: f?.displayName,
      technicalName: f?.technicalName,
      expiresOn: f?.expiresOn ? new Date(f.expiresOn) : f?.expiresOn,
      description: f?.description,
      inverted: f?.inverted,
      customerIds: f?.customerIds
    };
  }
}
