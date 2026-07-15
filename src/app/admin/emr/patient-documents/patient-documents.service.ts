import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { PatientDocument } from './patient-documents.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientDocumentsService {
  private readonly API_URL = 'api/patient-documents';
  isTblLoading = true;
  dataChange: BehaviorSubject<PatientDocument[]> = new BehaviorSubject<
    PatientDocument[]
  >([]);

  constructor() {}

  get data(): PatientDocument[] {
    return this.dataChange.value;
  }

  getAllPatientDocuments(): Observable<PatientDocument[]> {
    const mockData: PatientDocument[] = [
      new PatientDocument({
        id: 1,
        docId: 'DOC-1001',
        patientName: 'Sarah Johnson',
        docType: 'Lab Report',
        uploadDate: '2024-11-20T09:00:00',
        uploadedBy: 'Dr. Smith',
        fileUrl: '/documents/lab-report-1001.pdf',
        fileSize: '2.5 MB',
        status: 'Verified',
      }),
      new PatientDocument({
        id: 2,
        docId: 'DOC-1002',
        patientName: 'Michael Brown',
        docType: 'X-Ray',
        uploadDate: '2024-11-19T14:30:00',
        uploadedBy: 'Dr. Williams',
        fileUrl: '/documents/xray-1002.jpg',
        fileSize: '5.1 MB',
        status: 'Uploaded',
      }),
      new PatientDocument({
        id: 3,
        docId: 'DOC-1003',
        patientName: 'Emily Davis',
        docType: 'Discharge Summary',
        uploadDate: '2024-11-18T11:15:00',
        uploadedBy: 'Dr. Johnson',
        fileUrl: '/documents/discharge-1003.pdf',
        fileSize: '1.8 MB',
        status: 'Verified',
      }),
      new PatientDocument({
        id: 4,
        docId: 'DOC-1004',
        patientName: 'David Wilson',
        docType: 'MRI Scan',
        uploadDate: '2024-11-17T16:45:00',
        uploadedBy: 'Dr. Brown',
        fileUrl: '/documents/mri-1004.dcm',
        fileSize: '15.3 MB',
        status: 'Uploaded',
      }),
      new PatientDocument({
        id: 5,
        docId: 'DOC-1005',
        patientName: 'Jessica Martinez',
        docType: 'Prescription',
        uploadDate: '2024-11-16T10:00:00',
        uploadedBy: 'Dr. Davis',
        fileUrl: '/documents/prescription-1005.pdf',
        fileSize: '0.5 MB',
        status: 'Verified',
      }),
      new PatientDocument({
        id: 6,
        docId: 'DOC-1006',
        patientName: 'James Anderson',
        docType: 'Consent Form',
        uploadDate: '2024-11-15T13:20:00',
        uploadedBy: 'Dr. Miller',
        fileUrl: '/documents/consent-1006.pdf',
        fileSize: '1.2 MB',
        status: 'Pending',
      }),
      new PatientDocument({
        id: 7,
        docId: 'DOC-1007',
        patientName: 'Linda Taylor',
        docType: 'Blood Test',
        uploadDate: '2024-11-14T09:30:00',
        uploadedBy: 'Dr. Wilson',
        fileUrl: '/documents/blood-test-1007.pdf',
        fileSize: '1.9 MB',
        status: 'Verified',
      }),
      new PatientDocument({
        id: 8,
        docId: 'DOC-1008',
        patientName: 'Robert Thomas',
        docType: 'CT Scan',
        uploadDate: '2024-11-13T15:00:00',
        uploadedBy: 'Dr. Moore',
        fileUrl: '/documents/ct-scan-1008.dcm',
        fileSize: '12.7 MB',
        status: 'Uploaded',
      }),
      new PatientDocument({
        id: 9,
        docId: 'DOC-1009',
        patientName: 'Patricia Jackson',
        docType: 'ECG Report',
        uploadDate: '2024-11-12T11:45:00',
        uploadedBy: 'Dr. Taylor',
        fileUrl: '/documents/ecg-1009.pdf',
        fileSize: '0.8 MB',
        status: 'Verified',
      }),
      new PatientDocument({
        id: 10,
        docId: 'DOC-1010',
        patientName: 'Christopher White',
        docType: 'Physical Therapy Notes',
        uploadDate: '2024-11-11T14:15:00',
        uploadedBy: 'Dr. Anderson',
        fileUrl: '/documents/pt-notes-1010.pdf',
        fileSize: '1.1 MB',
        status: 'Uploaded',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addPatientDocument(document: PatientDocument): Observable<PatientDocument> {
    return of(document).pipe(catchError(this.handleError));
  }

  updatePatientDocument(document: PatientDocument): Observable<PatientDocument> {
    return of(document).pipe(catchError(this.handleError));
  }

  deletePatientDocument(id: number): Observable<number> {
    return of(id).pipe(catchError(this.handleError));
  }

  private handleError(_error: Error) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
