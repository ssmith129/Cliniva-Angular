import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Complaint } from './complaint-resolution.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintResolutionService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/complaint-resolution.json';
  dataChange: BehaviorSubject<Complaint[]> = new BehaviorSubject<Complaint[]>([]);
  dialogData: Complaint | null = null;

  get data(): Complaint[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllComplaints(): Observable<Complaint[]> {
    const mockData: Complaint[] = [
      new Complaint({
        id: 1,
        complaint_id: 'CMP-001',
        patient_name: 'Sarah Johnson',
        complaint_date: '2024-12-01',
        category: 'Staff Behavior',
        priority: 'High',
        status: 'Resolved',
        complaint_details: 'Rude behavior by receptionist.',
        assigned_to: 'Admin',
        resolution_date: '2024-12-02',
        resolution_details: 'Staff member counseled.',
      }),
      new Complaint({
        id: 2,
        complaint_id: 'CMP-002',
        patient_name: 'Michael Brown',
        complaint_date: '2024-12-02',
        category: 'Medical Care',
        priority: 'Medium',
        status: 'In Progress',
        complaint_details: 'Delayed medication administration.',
        assigned_to: 'Head Nurse',
        resolution_date: '',
        resolution_details: '',
      }),
      new Complaint({
        id: 3,
        complaint_id: 'CMP-003',
        patient_name: 'Emily Davis',
        complaint_date: '2024-12-03',
        category: 'Billing Issues',
        priority: 'High',
        status: 'Pending',
        complaint_details: 'Overcharged for consultation.',
        assigned_to: 'Billing Mgr',
        resolution_date: '',
        resolution_details: '',
      }),
      new Complaint({
        id: 4,
        complaint_id: 'CMP-004',
        patient_name: 'David Wilson',
        complaint_date: '2024-12-04',
        category: 'Facility Issues',
        priority: 'Low',
        status: 'Resolved',
        complaint_details: 'Broken chair in waiting area.',
        assigned_to: 'Facility Mgr',
        resolution_date: '2024-12-05',
        resolution_details: 'Chair replaced.',
      }),
      new Complaint({
        id: 5,
        complaint_id: 'CMP-005',
        patient_name: 'Jessica Martinez',
        complaint_date: '2024-12-05',
        category: 'Food Quality',
        priority: 'Medium',
        status: 'Closed',
        complaint_details: 'Food was too salty.',
        assigned_to: 'Canteen Mgr',
        resolution_date: '2024-12-05',
        resolution_details: 'Feedback noted.',
      }),
      new Complaint({
        id: 6,
        complaint_id: 'CMP-006',
        patient_name: 'James Anderson',
        complaint_date: '2024-12-06',
        category: 'Wait Time',
        priority: 'Medium',
        status: 'In Progress',
        complaint_details: 'Waited 2 hours for doctor.',
        assigned_to: 'Admin',
        resolution_date: '',
        resolution_details: '',
      }),
      new Complaint({
        id: 7,
        complaint_id: 'CMP-007',
        patient_name: 'Linda Taylor',
        complaint_date: '2024-12-07',
        category: 'Staff Behavior',
        priority: 'Low',
        status: 'Resolved',
        complaint_details: 'Nurse did not explain procedure well.',
        assigned_to: 'Head Nurse',
        resolution_date: '2024-12-08',
        resolution_details: 'Nurse re-trained on communication.',
      }),
      new Complaint({
        id: 8,
        complaint_id: 'CMP-008',
        patient_name: 'Robert Thomas',
        complaint_date: '2024-12-08',
        category: 'Other',
        priority: 'Low',
        status: 'Pending',
        complaint_details: 'Parking was full.',
        assigned_to: 'Admin',
        resolution_date: '',
        resolution_details: '',
      }),
      new Complaint({
        id: 9,
        complaint_id: 'CMP-009',
        patient_name: 'Patricia Jackson',
        complaint_date: '2024-12-09',
        category: 'Medical Care',
        priority: 'High',
        status: 'In Progress',
        complaint_details: 'Incorrect dosage instructions given.',
        assigned_to: 'Medical Director',
        resolution_date: '',
        resolution_details: '',
      }),
      new Complaint({
        id: 10,
        complaint_id: 'CMP-010',
        patient_name: 'Christopher White',
        complaint_date: '2024-12-10',
        category: 'Billing Issues',
        priority: 'Medium',
        status: 'Resolved',
        complaint_details: 'Invoice format errors.',
        assigned_to: 'Billing Mgr',
        resolution_date: '2024-12-11',
        resolution_details: 'Corrected invoice sent.',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addComplaint(complaint: Complaint): Observable<Complaint> {
    this.dialogData = complaint;
    return of(complaint);
  }

  updateComplaint(complaint: Complaint): Observable<Complaint> {
    this.dialogData = complaint;
    return of(complaint);
  }

  deleteComplaint(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
