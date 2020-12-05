import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AvailableCustomers} from '../../../shared/models/customer';
import {CustomerService} from '../../../shared/services/customer.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-customers-tab',
  templateUrl: './customers-tab.component.html',
  styleUrls: ['./customers-tab.component.scss']
})
export class CustomersTabComponent implements OnInit, OnDestroy {
  readonly customersList$: Observable<AvailableCustomers[]> = this.customerService.customersList$;
  readonly customerMap = this.customerService.customerFeatureMap;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAvailableCustomers().subscribe();
  }

  ngOnDestroy(): void {
    this.customerMap.clear();
  }

  expandCustomer(customerId: string): void {
    if (!this.customerMap.has(customerId)) {
      this.customerService.getCustomerFeatures(customerId).subscribe();
    }
  }

  toggle(customerId: string, name: string): void {
    this.customerService.toggleFeature(customerId, name).subscribe();
  }
}
