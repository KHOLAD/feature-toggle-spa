import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AvailableCustomerFeature, AvailableCustomers, Customer, CustomerAdapter, CustomerFeature} from '../models/customer';
import {apiUrl, httpOptions} from '../../shell/config';
import {filter, finalize, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerFeatureMap = new Map<string, CustomerFeature[]>();
  private readonly customers$ = new BehaviorSubject<AvailableCustomers[]>([]);
  private readonly customersLoading$ = new ReplaySubject<boolean>(1);

  get customersList$(): Observable<AvailableCustomers[]> {
    return this.customers$.asObservable();
  }

  get isLoading$(): Observable<boolean> {
    return this.customersLoading$.asObservable();
  }

  constructor(private httpClient: HttpClient) { }

  getAvailableCustomers(): Observable<AvailableCustomers[]> {
    this.customersLoading$.next(true);
    return this.httpClient.get<AvailableCustomers[]>(`${apiUrl}/customers`, httpOptions)
      .pipe(
        map(c => c.map(CustomerAdapter.adaptAvailableCustomers)),
        tap(value => this.customers$.next(value)),
        finalize(() => this.customersLoading$.next(false))
      );
  }

  getCustomerFeatures(customerId: string): Observable<CustomerFeature[]> {
    return this.httpClient.get<AvailableCustomerFeature>(`${apiUrl}/customer/${customerId}`, httpOptions)
      .pipe(
        map(f => {
          const customerFeatures = f?.features?.map(CustomerAdapter.adaptCustomerFeature) || [];
          this.customerFeatureMap.set(f.id, customerFeatures);
          return customerFeatures;
        })
      );
  }

  toggleFeature(customerId: string, technicalName: string): Observable<CustomerFeature> {
    return this.httpClient.put<CustomerFeature>(`${apiUrl}/toggle/${customerId}/${technicalName}`, httpOptions)
      .pipe(
        map(cf => {
          const userFeatures = this.customerFeatureMap.get(customerId) || [];
          this.customerFeatureMap.set(customerId, userFeatures.map(uf => {
            if (uf.name === technicalName) { return Object.assign({}, uf, { active: cf.active }); }
            return uf;
          }));

          return cf;
        })
      );
  }
}

