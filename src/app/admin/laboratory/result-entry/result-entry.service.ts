import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ResultEntry } from './result-entry.model';

@Injectable({
  providedIn: 'root',
})
export class ResultEntryService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/result-entry.json';
  dataChange: BehaviorSubject<ResultEntry[]> = new BehaviorSubject<ResultEntry[]>([]);

  addResultEntry(resultEntry: ResultEntry): Observable<ResultEntry> {
    // In real app: return this.httpClient.post<ResultEntry>(this.API_URL, resultEntry).pipe(catchError(this.handleError));
    return of(resultEntry);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
