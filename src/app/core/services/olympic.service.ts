import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  public olympics$ = new BehaviorSubject<Olympic[]>([]);
  public olympic$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() : Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([])
        return caught;
      })
    );
  }

  getOlympics() : Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympic(country: string | null) : Observable<any> 
  {
    const predicate = (olympic: Olympic) => olympic.country.toLocaleLowerCase() === country?.toLocaleLowerCase();
    const olympicSearch = (olympics: Olympic[]) => olympics.find(predicate);
    this.getOlympics().pipe(map(olympicSearch), tap(olympic => this.olympic$.next(olympic))).subscribe();
    return this.olympic$.asObservable().pipe(startWith(null));
  }
}
