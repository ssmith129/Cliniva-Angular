import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LabReport } from './lab-reports.model';

@Injectable({
  providedIn: 'root',
})
export class LabReportsService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/lab-reports.json';
  dataChange: BehaviorSubject<LabReport[]> = new BehaviorSubject<LabReport[]>(
    []
  );
  dialogData: LabReport | null = null;

  get data(): LabReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllLabReports(): Observable<LabReport[]> {
    const mockData: LabReport[] = [
      new LabReport({
        id: 1,
        reportId: 'RPT001',
        patientName: 'Sarah Johnson',
        tests: 'CBC, Lipid Panel',
        doctorName: 'Dr. Smith',
        reportDate: '2024-11-20',
        status: 'Completed',
        department: 'Clinical Lab',
      }),
      new LabReport({
        id: 2,
        reportId: 'RPT002',
        patientName: 'John Doe',
        tests: 'Thyroid Panel',
        doctorName: 'Dr. Jones',
        reportDate: '2024-11-21',
        status: 'Pending',
        department: 'Endocrinology',
      }),
      new LabReport({
        id: 3,
        reportId: 'RPT003',
        patientName: 'Jane Smith',
        tests: 'Urinalysis',
        doctorName: 'Dr. Williams',
        reportDate: '2024-11-22',
        status: 'Completed',
        department: 'Urology',
      }),
      new LabReport({
        id: 4,
        reportId: 'RPT004',
        patientName: 'Peter Jones',
        tests: 'Glucose Test',
        doctorName: 'Dr. Brown',
        reportDate: '2024-11-23',
        status: 'Processing',
        department: 'Clinical Lab',
      }),
      new LabReport({
        id: 5,
        reportId: 'RPT005',
        patientName: 'Alice Williams',
        tests: 'X-Ray',
        doctorName: 'Dr. Davis',
        reportDate: '2024-11-24',
        status: 'Completed',
        department: 'Radiology',
      }),
      new LabReport({
        id: 6,
        reportId: 'RPT006',
        patientName: 'Robert Brown',
        tests: 'MRI Scan',
        doctorName: 'Dr. Miller',
        reportDate: '2024-11-25',
        status: 'Pending',
        department: 'Radiology',
      }),
      new LabReport({
        id: 7,
        reportId: 'RPT007',
        patientName: 'Emily Davis',
        tests: 'CT Scan',
        doctorName: 'Dr. Wilson',
        reportDate: '2024-11-26',
        status: 'Completed',
        department: 'Radiology',
      }),
      new LabReport({
        id: 8,
        reportId: 'RPT008',
        patientName: 'Michael Miller',
        tests: 'Ultrasound',
        doctorName: 'Dr. Moore',
        reportDate: '2024-11-27',
        status: 'Processing',
        department: 'Radiology',
      }),
      new LabReport({
        id: 9,
        reportId: 'RPT009',
        patientName: 'Jessica Wilson',
        tests: 'ECG',
        doctorName: 'Dr. Taylor',
        reportDate: '2024-11-28',
        status: 'Completed',
        department: 'Cardiology',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addLabReport(labReport: LabReport): Observable<LabReport> {
    this.dialogData = labReport;
    return of(labReport);
  }

  updateLabReport(labReport: LabReport): Observable<LabReport> {
    this.dialogData = labReport;
    return of(labReport);
  }

  deleteLabReport(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
