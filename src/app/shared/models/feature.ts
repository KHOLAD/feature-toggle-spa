export interface Feature {
    id?: string;
    displayName: string;
    technicalName: string;
    expiresOn?: Date;
    description: string;
    inverted: boolean;
    customerIds: string[];
}