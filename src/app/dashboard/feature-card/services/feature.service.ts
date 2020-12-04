import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Feature, FeatureAdapter} from '../../../shared/models/feature';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {filter, finalize, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private readonly featuresLoading$ = new ReplaySubject<boolean>(1);
  private readonly features$ = new BehaviorSubject<Feature[]>([]);
  private readonly apiUrl = 'http://localhost:8080';
  private readonly httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private httpClient: HttpClient) {}

  get featuresLoadingState$(): Observable<boolean> {
    return this.featuresLoading$.asObservable();
  }

  get featureList$(): Observable<Feature[]> {
    return this.features$.asObservable();
  }

  createFeature(feature: Feature): Observable<Feature> {
    return this.httpClient.post<Feature>(`${this.apiUrl}/feature`, feature, this.httpOptions);
  }

  updateFeature(feature: Feature): Observable<Feature> {
    return this.httpClient.put<Feature>(`${this.apiUrl}/feature/${feature.id}`, feature, this.httpOptions);
  }

  getFeatures(): Observable<Feature[]> {
    this.featuresLoading$.next(true);
    return this.httpClient.get<Feature[]>(`${this.apiUrl}/features`, this.httpOptions)
      .pipe(
        filter(r => !!r),
        map(r => r.map(FeatureAdapter.adapt)),
        tap(value => this.features$.next(value)),
        finalize(() => this.featuresLoading$.next(false)));
  }
}
