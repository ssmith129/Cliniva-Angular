import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TechnicianAssignment } from './technician-assignment.model';

@Injectable({
  providedIn: 'root',
})
export class TechnicianAssignmentService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/technician-assignment.json';
  dataChange: BehaviorSubject<TechnicianAssignment[]> = new BehaviorSubject<
    TechnicianAssignment[]
  >([]);
  dialogData: TechnicianAssignment | null = null;

  get data(): TechnicianAssignment[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllTechnicianAssignments(): Observable<TechnicianAssignment[]> {
    const mockData: TechnicianAssignment[] = [
      new TechnicianAssignment({
        id: 1,
        technicianName: 'John Doe',
        testName: 'CBC',
        patientName: 'Sarah Johnson',
        assignedDate: '2024-11-20',
        priority: 'High',
        status: 'In Progress',
        department: 'Hematology',
      }),
      new TechnicianAssignment({
        id: 2,
        technicianName: 'Jane Smith',
        testName: 'Lipid Panel',
        patientName: 'John Doe',
        assignedDate: '2024-11-21',
        priority: 'Urgent',
        status: 'Completed',
        department: 'Biochemistry',
      }),
      new TechnicianAssignment({
        id: 3,
        technicianName: 'Peter Jones',
        testName: 'Urinalysis',
        patientName: 'Jane Smith',
        assignedDate: '2024-11-22',
        priority: 'Low',
        status: 'Cancelled',
        department: 'Microbiology',
      }),
      new TechnicianAssignment({
        id: 4,
        technicianName: 'Alice Williams',
        testName: 'Thyroid Panel',
        patientName: 'Peter Jones',
        assignedDate: '2024-11-23',
        priority: 'High',
        status: 'In Progress',
        department: 'Endocrinology',
      }),
      new TechnicianAssignment({
        id: 5,
        technicianName: 'Robert Brown',
        testName: 'Glucose Test',
        patientName: 'Alice Williams',
        assignedDate: '2024-11-24',
        priority: 'Normal',
        status: 'Completed',
        department: 'Biochemistry',
      }),
      new TechnicianAssignment({
        id: 6,
        technicianName: 'Emily Davis',
        testName: 'X-Ray',
        patientName: 'Robert Brown',
        assignedDate: '2024-11-25',
        priority: 'Urgent',
        status: 'In Progress',
        department: 'Radiology',
      }),
      new TechnicianAssignment({
        id: 7,
        technicianName: 'Michael Miller',
        testName: 'MRI Scan',
        patientName: 'Emily Davis',
        assignedDate: '2024-11-26',
        priority: 'High',
        status: 'Cancelled',
        department: 'Radiology',
      }),
      new TechnicianAssignment({
        id: 8,
        technicianName: 'Jessica Wilson',
        testName: 'CT Scan',
        patientName: 'Michael Miller',
        assignedDate: '2024-11-27',
        priority: 'Normal',
        status: 'Completed',
        department: 'Radiology',
      }),
      new TechnicianAssignment({
        id: 9,
        technicianName: 'David Garcia',
        testName: 'Ultrasound',
        patientName: 'Jessica Wilson',
        assignedDate: '2024-11-28',
        priority: 'Low',
        status: 'In Progress',
        department: 'Radiology',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addTechnicianAssignment(
    technicianAssignment: TechnicianAssignment
  ): Observable<TechnicianAssignment> {
    this.dialogData = technicianAssignment;
    return of(technicianAssignment);
  }

  updateTechnicianAssignment(
    technicianAssignment: TechnicianAssignment
  ): Observable<TechnicianAssignment> {
    this.dialogData = technicianAssignment;
    return of(technicianAssignment);
  }

  deleteTechnicianAssignment(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
