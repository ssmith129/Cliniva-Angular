import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/appointment.json';
  dataChange: BehaviorSubject<Appointment[]> = new BehaviorSubject<
    Appointment[]
  >([]);

  /** GET: Fetch all appointments */
  getAllAppointments(): Observable<Appointment[]> {
    return this.httpClient
      .get<Appointment[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  /** POST: Add a new appointment */
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return of(appointment).pipe(
      map((response) => response),
      catchError(this.handleError)
    );

    // API call to add the appointment
    // return this.httpClient.post<Appointment>(this.API_URL, appointment).pipe(
    //   map((response) => response),
    //   catchError(this.handleError)
    // );
  }

  /** PUT: Update an existing appointment */
  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return of(appointment).pipe(
      map((response) => response),
      catchError(this.handleError)
    );

    // API call to update the appointment
    // return this.httpClient.put<Appointment>(`${this.API_URL}`, appointment).pipe(
    //   map((response) => response),
    //   catchError(this.handleError)
    // );
  }

  /** DELETE: Remove an appointment by ID */
  deleteAppointment(id: number): Observable<number> {
    return of(id).pipe(
      map((response) => response),
      catchError(this.handleError)
    );

    // API call to delete the appointment
    // return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
    //   map((response) => id),
    //   catchError(this.handleError)
    // );
  }

  /** Handle Http operation that failed */
  private handleError(_error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
