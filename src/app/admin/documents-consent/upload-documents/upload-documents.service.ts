import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UploadDocument } from './upload-documents.model';

@Injectable({
  providedIn: 'root',
})
export class UploadDocumentsService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/upload-documents.json';
  dataChange: BehaviorSubject<UploadDocument[]> = new BehaviorSubject<UploadDocument[]>([]);
  dialogData: UploadDocument | null = null;

  get data(): UploadDocument[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllDocuments(): Observable<UploadDocument[]> {
    const mockData: UploadDocument[] = [
      new UploadDocument({
        id: 1,
        document_id: 'DOC-001',
        patient_name: 'Sarah Johnson',
        document_type: 'Medical Report',
        document_name: 'Blood Test Results',
        upload_date: '2024-12-10',
        uploaded_by: 'Dr. Smith',
        status: 'Verified',
        notes: 'Routine checkup results',
      }),
      new UploadDocument({
        id: 2,
        document_id: 'DOC-002',
        patient_name: 'Michael Brown',
        document_type: 'X-Ray',
        document_name: 'Chest X-Ray',
        upload_date: '2024-12-11',
        uploaded_by: 'Tech. Jones',
        status: 'Pending',
        notes: 'Review required',
      }),
      new UploadDocument({
        id: 3,
        document_id: 'DOC-003',
        patient_name: 'Emily Davis',
        document_type: 'Prescription',
        document_name: 'Antibiotics Rx',
        upload_date: '2024-12-12',
        uploaded_by: 'Dr. Adams',
        status: 'Verified',
        notes: 'For infection',
      }),
      new UploadDocument({
        id: 4,
        document_id: 'DOC-004',
        patient_name: 'David Wilson',
        document_type: 'Lab Report',
        document_name: 'Urine Analysis',
        upload_date: '2024-12-13',
        uploaded_by: 'Lab Tech',
        status: 'Rejected',
        notes: 'Sample contaminated',
      }),
      new UploadDocument({
        id: 5,
        document_id: 'DOC-005',
        patient_name: 'Jessica Martinez',
        document_type: 'Insurance Document',
        document_name: 'Policy Copy',
        upload_date: '2024-12-14',
        uploaded_by: 'Admin Staff',
        status: 'Verified',
        notes: 'Valid until 2025',
      }),
      new UploadDocument({
        id: 6,
        document_id: 'DOC-006',
        patient_name: 'James Anderson',
        document_type: 'MRI Scan',
        document_name: 'Brain MRI',
        upload_date: '2024-12-15',
        uploaded_by: 'Radiologist',
        status: 'Pending',
        notes: 'Detailed report attached',
      }),
      new UploadDocument({
        id: 7,
        document_id: 'DOC-007',
        patient_name: 'Linda Taylor',
        document_type: 'ID Proof',
        document_name: 'Driving License',
        upload_date: '2024-12-16',
        uploaded_by: 'Receptionist',
        status: 'Verified',
        notes: 'Identity verification',
      }),
      new UploadDocument({
        id: 8,
        document_id: 'DOC-008',
        patient_name: 'Robert Thomas',
        document_type: 'CT Scan',
        document_name: 'Abdominal CT',
        upload_date: '2024-12-17',
        uploaded_by: 'Tech. Mike',
        status: 'Pending',
        notes: 'Pending review',
      }),
      new UploadDocument({
        id: 9,
        document_id: 'DOC-009',
        patient_name: 'Patricia Jackson',
        document_type: 'Medical Report',
        document_name: 'Discharge Summary',
        upload_date: '2024-12-18',
        uploaded_by: 'Dr. Lee',
        status: 'Verified',
        notes: 'Previous hospitalization',
      }),
      new UploadDocument({
        id: 10,
        document_id: 'DOC-010',
        patient_name: 'Christopher White',
        document_type: 'Other',
        document_name: 'Referral Letter',
        upload_date: '2024-12-19',
        uploaded_by: 'Dr. Kim',
        status: 'Verified',
        notes: 'Referred from City Hospital',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addUploadDocument(uploadDocument: UploadDocument): Observable<UploadDocument> {
    this.dialogData = uploadDocument;
    return of(uploadDocument);
  }

  updateUploadDocument(uploadDocument: UploadDocument): Observable<UploadDocument> {
    this.dialogData = uploadDocument;
    return of(uploadDocument);
  }

  deleteUploadDocument(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
