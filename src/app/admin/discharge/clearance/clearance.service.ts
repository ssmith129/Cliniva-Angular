import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Clearance } from './clearance.model';

@Injectable({
  providedIn: 'root',
})
export class ClearanceService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/clearance.json';
  dataChange: BehaviorSubject<Clearance[]> = new BehaviorSubject<Clearance[]>([]);
  dialogData: Clearance | null = null;

  get data(): Clearance[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllClearances(): Observable<Clearance[]> {
    const mockData: Clearance[] = [
      new Clearance({
        id: 1,
        clearanceId: 'CLR-001',
        patientName: 'Sarah Johnson',
        department: 'Billing',
        requestedDate: '2024-12-15',
        clearedDate: '2024-12-16',
        status: 'Cleared',
        clearedBy: 'John Doe',
        notes: 'Final bill settled',
      }),
      new Clearance({
        id: 2,
        clearanceId: 'CLR-002',
        patientName: 'Michael Brown',
        department: 'Pharmacy',
        requestedDate: '2024-12-16',
        clearedDate: '',
        status: 'Pending',
        clearedBy: '',
        notes: 'Meds return pending',
      }),
      new Clearance({
        id: 3,
        clearanceId: 'CLR-003',
        patientName: 'Emily Davis',
        department: 'Lab',
        requestedDate: '2024-12-14',
        clearedDate: '2024-12-15',
        status: 'Cleared',
        clearedBy: 'Jane Smith',
        notes: 'All reports dispatched',
      }),
      new Clearance({
        id: 4,
        clearanceId: 'CLR-004',
        patientName: 'David Wilson',
        department: 'Nursing',
        requestedDate: '2024-12-17',
        clearedDate: '',
        status: 'Pending',
        clearedBy: '',
        notes: 'File completion pending',
      }),
      new Clearance({
        id: 5,
        clearanceId: 'CLR-005',
        patientName: 'Jessica Martinez',
        department: 'Dietary',
        requestedDate: '2024-12-16',
        clearedDate: '2024-12-16',
        status: 'Cleared',
        clearedBy: 'Chef Alex',
        notes: 'No dues',
      }),
      new Clearance({
        id: 6,
        clearanceId: 'CLR-006',
        patientName: 'James Anderson',
        department: 'Physiotherapy',
        requestedDate: '2024-12-18',
        clearedDate: '',
        status: 'Rejected',
        clearedBy: 'Dr. PT',
        notes: 'Session pending payment',
      }),
      new Clearance({
        id: 7,
        clearanceId: 'CLR-007',
        patientName: 'Linda Taylor',
        department: 'Radiology',
        requestedDate: '2024-12-15',
        clearedDate: '2024-12-15',
        status: 'Cleared',
        clearedBy: 'Tech Mike',
        notes: 'Films handovers done',
      }),
      new Clearance({
        id: 8,
        clearanceId: 'CLR-008',
        patientName: 'Robert Thomas',
        department: 'Cardiology',
        requestedDate: '2024-12-19',
        clearedDate: '',
        status: 'Pending',
        clearedBy: '',
        notes: 'Pending monitor return',
      }),
      new Clearance({
        id: 9,
        clearanceId: 'CLR-009',
        patientName: 'Patricia Jackson',
        department: 'Housekeeping',
        requestedDate: '2024-12-16',
        clearedDate: '2024-12-16',
        status: 'Cleared',
        clearedBy: 'Supervisor Ann',
        notes: 'Room verified',
      }),
      new Clearance({
        id: 10,
        clearanceId: 'CLR-010',
        patientName: 'Christopher White',
        department: 'Engineering',
        requestedDate: '2024-12-20',
        clearedDate: '',
        status: 'Pending',
        clearedBy: '',
        notes: 'TV remote return',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addClearance(clearance: Clearance): Observable<Clearance> {
    this.dialogData = clearance;
    return of(clearance);
  }

  updateClearance(clearance: Clearance): Observable<Clearance> {
    this.dialogData = clearance;
    return of(clearance);
  }

  deleteClearance(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
