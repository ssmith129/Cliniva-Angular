import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SignedConsent } from './signed-consent.model';

@Injectable({
  providedIn: 'root',
})
export class SignedConsentService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/signed-consent.json';
  dataChange: BehaviorSubject<SignedConsent[]> = new BehaviorSubject<SignedConsent[]>([]);
  dialogData: SignedConsent | null = null;

  get data(): SignedConsent[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllConsents(): Observable<SignedConsent[]> {
    const mockData: SignedConsent[] = [
      new SignedConsent({
        id: 1,
        consent_id: 'SGN-001',
        patient_name: 'Sarah Johnson',
        consent_type: 'Surgery Consent',
        procedure_name: 'Appendectomy',
        signed_date: '2024-12-10',
        signed_time: '10:00 AM',
        signed_by: 'Sarah Johnson',
        relationship: 'Self',
        witness_name: 'Nurse Mary',
        status: 'Signed',
        notes: 'Patient understood all risks',
      }),
      new SignedConsent({
        id: 2,
        consent_id: 'SGN-002',
        patient_name: 'Michael Brown',
        consent_type: 'Anesthesia Consent',
        procedure_name: 'Knee Replacement',
        signed_date: '2024-12-11',
        signed_time: '02:30 PM',
        signed_by: 'John Brown',
        relationship: 'Parent',
        witness_name: 'Dr. Smith',
        status: 'Signed',
        notes: 'Minor patient',
      }),
      new SignedConsent({
        id: 3,
        consent_id: 'SGN-003',
        patient_name: 'Emily Davis',
        consent_type: 'Treatment Consent',
        procedure_name: 'Chemotherapy',
        signed_date: '2024-12-12',
        signed_time: '',
        signed_by: '',
        relationship: '',
        witness_name: '',
        status: 'Pending',
        notes: 'Waiting for family discussion',
      }),
      new SignedConsent({
        id: 4,
        consent_id: 'SGN-004',
        patient_name: 'David Wilson',
        consent_type: 'Blood Transfusion',
        procedure_name: 'Emergency Transfusion',
        signed_date: '2024-12-13',
        signed_time: '11:45 PM',
        signed_by: 'David Wilson',
        relationship: 'Self',
        witness_name: 'Nurse Joy',
        status: 'Signed',
        notes: 'Urgent',
      }),
      new SignedConsent({
        id: 5,
        consent_id: 'SGN-005',
        patient_name: 'Jessica Martinez',
        consent_type: 'Discharge AMA',
        procedure_name: 'N/A',
        signed_date: '2024-12-14',
        signed_time: '09:00 AM',
        signed_by: 'Jessica Martinez',
        relationship: 'Self',
        witness_name: 'Admin Staff',
        status: 'Signed',
        notes: 'Patient insisted on leaving',
      }),
      new SignedConsent({
        id: 6,
        consent_id: 'SGN-006',
        patient_name: 'James Anderson',
        consent_type: 'Research Participation',
        procedure_name: 'Drug Trial A',
        signed_date: '2024-12-15',
        signed_time: '',
        signed_by: '',
        relationship: '',
        witness_name: '',
        status: 'Expired',
        notes: 'Trial enrollment closed',
      }),
      new SignedConsent({
        id: 7,
        consent_id: 'SGN-007',
        patient_name: 'Linda Taylor',
        consent_type: 'Photography',
        procedure_name: 'Skin Lesion Documentation',
        signed_date: '2024-12-16',
        signed_time: '03:15 PM',
        signed_by: 'Linda Taylor',
        relationship: 'Self',
        witness_name: 'Dr. Lee',
        status: 'Signed',
        notes: 'For medical records only',
      }),
      new SignedConsent({
        id: 8,
        consent_id: 'SGN-008',
        patient_name: 'Robert Thomas',
        consent_type: 'General Consent',
        procedure_name: 'Admission',
        signed_date: '2024-12-17',
        signed_time: '08:00 AM',
        signed_by: 'Robert Thomas',
        relationship: 'Self',
        witness_name: 'Receptionist',
        status: 'Signed',
        notes: 'Standard admission',
      }),
      new SignedConsent({
        id: 9,
        consent_id: 'SGN-009',
        patient_name: 'Patricia Jackson',
        consent_type: 'Surgery Consent',
        procedure_name: 'Cataract Surgery',
        signed_date: '2024-12-18',
        signed_time: '',
        signed_by: '',
        relationship: '',
        witness_name: '',
        status: 'Pending',
        notes: 'Scheduled for next week',
      }),
      new SignedConsent({
        id: 10,
        consent_id: 'SGN-010',
        patient_name: 'Christopher White',
        consent_type: 'Anesthesia Consent',
        procedure_name: 'Dental Extraction',
        signed_date: '2024-12-19',
        signed_time: '01:00 PM',
        signed_by: 'Christopher White',
        relationship: 'Self',
        witness_name: 'Dr. Dentist',
        status: 'Signed',
        notes: 'Local anesthesia',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addSignedConsent(signedConsent: SignedConsent): Observable<SignedConsent> {
    this.dialogData = signedConsent;
    return of(signedConsent);
  }

  updateSignedConsent(signedConsent: SignedConsent): Observable<SignedConsent> {
    this.dialogData = signedConsent;
    return of(signedConsent);
  }

  deleteSignedConsent(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
