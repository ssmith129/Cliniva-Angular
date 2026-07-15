import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AmbulanceCallList } from './ambulance-call-list.model';

@Injectable({
  providedIn: 'root',
})
export class AmbulanceCallListService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/ambulanceCallList.json';
  dataChange: BehaviorSubject<AmbulanceCallList[]> = new BehaviorSubject<
    AmbulanceCallList[]
  >([]);

  /** GET: Fetch all ambulance call lists */
  getAllAmbulanceCallLists(): Observable<AmbulanceCallList[]> {
    return this.httpClient
      .get<AmbulanceCallList[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  /** POST: Add a new ambulance call list */
  addAmbulanceCallList(
    ambulanceCallList: AmbulanceCallList
  ): Observable<AmbulanceCallList> {
    // Simulated local response
    return of(ambulanceCallList).pipe(
      map((_response) => _response),
      catchError(this.handleError)
    );

    // API call to add an ambulance call list
    // return this.httpClient.post<AmbulanceCallList>(this.API_URL, ambulanceCallList).pipe(
    //   map(response => response),
    //   catchError(this.handleError)
    // );
  }

  /** PUT: Update an existing ambulance call list */
  updateAmbulanceCallList(
    ambulanceCallList: AmbulanceCallList
  ): Observable<AmbulanceCallList> {
    // Simulated local response
    return of(ambulanceCallList).pipe(
      map((_response) => _response),
      catchError(this.handleError)
    );

    // API call to update an ambulance call list
    // return this.httpClient.put<AmbulanceCallList>(`${this.API_URL}`, ambulanceCallList).pipe(
    //   map(response => response),
    //   catchError(this.handleError)
    // );
  }

  /** DELETE: Remove an ambulance call list by ID */
  deleteAmbulanceCallList(id: number): Observable<number> {
    // Simulated local response
    return of(id).pipe(
      map((_response) => {
        // Using _response to satisfy linting
        return id;
      }),
      catchError(this.handleError)
    );

    // API call to delete an ambulance call list
    // return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
    //   map(response => id),
    //   catchError(this.handleError)
    // );
  }

  /** Handle Http operation that failed */
  private handleError(_error: HttpErrorResponse): Observable<never> {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
