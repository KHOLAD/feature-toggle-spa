import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Feature, FeatureAdapter} from '../models/feature';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {filter, finalize, map, tap} from 'rxjs/operators';
import {apiUrl, httpOptions} from '../../shell/config';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private readonly featuresLoading$ = new ReplaySubject<boolean>(1);
  private readonly features$ = new BehaviorSubject<Feature[]>([]);

  constructor(private httpClient: HttpClient) {}

  get featuresLoadingState$(): Observable<boolean> {
    return this.featuresLoading$.asObservable();
  }

  get featureList$(): Observable<Feature[]> {
    return this.features$.asObservable();
  }

  createFeature(feature: Feature): Observable<Feature> {
    return this.httpClient.post<Feature>(`${apiUrl}/feature`, feature, httpOptions);
  }

  updateFeature(feature: Feature): Observable<Feature> {
    return this.httpClient.put<Feature>(`${apiUrl}/feature/${feature.id}`, feature, httpOptions);
  }

  getFeatures(): Observable<Feature[]> {
    this.featuresLoading$.next(true);
    return this.httpClient.get<Feature[]>(`${apiUrl}/features`, httpOptions)
      .pipe(
        filter(r => !!r),
        map(r => r.map(FeatureAdapter.adapt)),
        tap(value => this.features$.next(value)),
        finalize(() => this.featuresLoading$.next(false)));
  }
}
