export interface CustomerFeature {
  name: string;
  active: boolean;
  inverted: boolean;
  expired: boolean;
}

export interface Customer {
  id: string;
  name: string;
  features?: Array<CustomerFeature>;
}

export interface AvailableCustomers extends Omit<Customer, 'features'> {}

export interface AvailableCustomerFeature extends Omit<Customer, 'name'> {}

export class CustomerAdapter {
  static adaptAvailableCustomers(c: any): AvailableCustomers {
    return {
      id: c?.id || null,
      name: c?.name || null
    };
  }

  static adaptCustomerFeature(c: any): CustomerFeature {
    return {
      name: c?.name || null,
      active: c?.active || false,
      expired: c?.expired || false,
      inverted: c?.inverted || false
    };
  }
}
