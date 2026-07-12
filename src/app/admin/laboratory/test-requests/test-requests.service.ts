import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TestRequest } from './test-requests.model';

@Injectable({
  providedIn: 'root',
})
export class TestRequestsService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/test-requests.json';
  dataChange: BehaviorSubject<TestRequest[]> = new BehaviorSubject<
    TestRequest[]
  >([]);
  dialogData: TestRequest | null = null;

  get data(): TestRequest[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllTestRequests(): Observable<TestRequest[]> {
    const mockData: TestRequest[] = [
      new TestRequest({
        id: 1,
        requestId: 'REQ-1001',
        patientName: 'Sarah Johnson',
        testName: 'Complete Blood Count (CBC)',
        doctorName: 'Dr. Smith',
        requestDate: '2024-11-20',
        date: '2025-12-10T09:00:00',
        status: 'Pending',
        priority: 'High',
        sampleType: 'Blood',
        notes: 'Patient has history of anemia',
      }),
      new TestRequest({
        id: 2,
        requestId: 'REQ-1002',
        patientName: 'Jane Roe',
        testName: 'Lipid Profile',
        doctorName: 'Dr. Jones',
        requestDate: '2024-11-21',
        date: '2025-12-11T10:30:00',
        status: 'Completed',
        priority: 'Normal',
        sampleType: 'Blood',
        notes: 'Regular checkup',
      }),
      new TestRequest({
        id: 3,
        requestId: 'REQ-1003',
        patientName: 'Peter Pan',
        testName: 'Thyroid Panel',
        doctorName: 'Dr. Williams',
        requestDate: '2024-11-22',
        date: '2025-12-12T09:30:00',
        status: 'Pending',
        priority: 'High',
        sampleType: 'Blood',
        notes: 'Follow-up on thyroid levels',
      }),
      new TestRequest({
        id: 4,
        requestId: 'REQ-1004',
        patientName: 'Wendy Darling',
        testName: 'Urinalysis',
        doctorName: 'Dr. Brown',
        requestDate: '2024-11-23',
        date: '2025-12-13T11:00:00',
        status: 'Cancelled',
        priority: 'Normal',
        sampleType: 'Urine',
        notes: 'Routine checkup',
      }),
      new TestRequest({
        id: 5,
        requestId: 'REQ-1005',
        patientName: 'Captain Hook',
        testName: 'Glucose Tolerance Test',
        doctorName: 'Dr. Davis',
        requestDate: '2024-11-24',
        date: '2025-12-14T08:00:00',
        status: 'In Progress',
        priority: 'High',
        sampleType: 'Blood',
        notes: 'Diabetic screening',
      }),
      new TestRequest({
        id: 6,
        requestId: 'REQ-1006',
        patientName: 'Smee',
        testName: 'Prostate Specific Antigen (PSA)',
        doctorName: 'Dr. Miller',
        requestDate: '2024-11-25',
        date: '2025-12-15T10:00:00',
        status: 'Completed',
        priority: 'Normal',
        sampleType: 'Blood',
        notes: 'Annual checkup',
      }),
      new TestRequest({
        id: 7,
        requestId: 'REQ-1007',
        patientName: 'Tiger Lily',
        testName: 'C-Reactive Protein (CRP)',
        doctorName: 'Dr. Wilson',
        requestDate: '2024-11-26',
        date: '2025-12-16T09:00:00',
        status: 'Pending',
        priority: 'Low',
        sampleType: 'Blood',
        notes: 'Inflammation markers',
      }),
      new TestRequest({
        id: 8,
        requestId: 'REQ-1008',
        patientName: 'Mr. Smee',
        testName: 'Vitamin D Level',
        doctorName: 'Dr. Moore',
        requestDate: '2024-11-27',
        date: '2025-12-17T14:00:00',
        status: 'Cancelled',
        priority: 'Low',
        sampleType: 'Blood',
        notes: 'Vitamin deficiency check',
      }),
      new TestRequest({
        id: 9,
        requestId: 'REQ-1009',
        patientName: 'Tinker Bell',
        testName: 'Iron Studies',
        doctorName: 'Dr. Taylor',
        requestDate: '2024-11-28',
        date: '2025-12-18T08:30:00',
        status: 'In Progress',
        priority: 'High',
        sampleType: 'Blood',
        notes: 'Anemia investigation',
      }),
      new TestRequest({
        id: 10,
        requestId: 'REQ-1010',
        patientName: 'Crocodile',
        testName: 'Electrolyte Panel',
        doctorName: 'Dr. White',
        requestDate: '2024-11-29',
        date: '2025-12-19T10:00:00',
        status: 'Completed',
        priority: 'Normal',
        sampleType: 'Blood',
        notes: 'Fluid balance check',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addTestRequest(testRequest: TestRequest): Observable<TestRequest> {
    this.dialogData = testRequest;
    return of(testRequest);
  }

  updateTestRequest(testRequest: TestRequest): Observable<TestRequest> {
    this.dialogData = testRequest;
    return of(testRequest);
  }

  deleteTestRequest(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
