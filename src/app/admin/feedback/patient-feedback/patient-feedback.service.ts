import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PatientFeedback } from './patient-feedback.model';

@Injectable({
  providedIn: 'root',
})
export class PatientFeedbackService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/patient-feedback.json';
  dataChange: BehaviorSubject<PatientFeedback[]> = new BehaviorSubject<PatientFeedback[]>([]);
  dialogData: PatientFeedback | null = null;

  get data(): PatientFeedback[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllFeedback(): Observable<PatientFeedback[]> {
    const mockData: PatientFeedback[] = [
      new PatientFeedback({
        id: 1,
        feedback_id: 'FB-001',
        patient_name: 'Sarah Johnson',
        feedback_date: '2024-12-01',
        category: 'Doctor Consultation',
        rating: '5',
        status: 'Reviewed',
        feedback_text: 'Excellent service by Dr. Smith.',
        reviewed_by: 'Admin',
        action_taken: 'Commendation sent to doctor',
      }),
      new PatientFeedback({
        id: 2,
        feedback_id: 'FB-002',
        patient_name: 'Michael Brown',
        feedback_date: '2024-12-02',
        category: 'Facilities',
        rating: '2',
        status: 'Action Taken',
        feedback_text: 'Waiting room AC was not working.',
        reviewed_by: 'Facility Mgr',
        action_taken: 'AC repaired',
      }),
      new PatientFeedback({
        id: 3,
        feedback_id: 'FB-003',
        patient_name: 'Emily Davis',
        feedback_date: '2024-12-03',
        category: 'Nursing Care',
        rating: '4',
        status: 'Reviewed',
        feedback_text: 'Nurses were very kind.',
        reviewed_by: 'Head Nurse',
        action_taken: '',
      }),
      new PatientFeedback({
        id: 4,
        feedback_id: 'FB-004',
        patient_name: 'David Wilson',
        feedback_date: '2024-12-04',
        category: 'Billing',
        rating: '3',
        status: 'Pending',
        feedback_text: 'Billing process was slow.',
        reviewed_by: '',
        action_taken: '',
      }),
      new PatientFeedback({
        id: 5,
        feedback_id: 'FB-005',
        patient_name: 'Jessica Martinez',
        feedback_date: '2024-12-05',
        category: 'Food Services',
        rating: '1',
        status: 'Action Taken',
        feedback_text: 'Food was cold.',
        reviewed_by: 'Canteen Mgr',
        action_taken: 'Kitchen staff warned',
      }),
      new PatientFeedback({
        id: 6,
        feedback_id: 'FB-006',
        patient_name: 'James Anderson',
        feedback_date: '2024-12-06',
        category: 'Pharmacy',
        rating: '5',
        status: 'Reviewed',
        feedback_text: 'Medicines available easily.',
        reviewed_by: 'Admin',
        action_taken: '',
      }),
      new PatientFeedback({
        id: 7,
        feedback_id: 'FB-007',
        patient_name: 'Linda Taylor',
        feedback_date: '2024-12-07',
        category: 'General',
        rating: '4',
        status: 'Reviewed',
        feedback_text: 'Overall good experience.',
        reviewed_by: 'Admin',
        action_taken: '',
      }),
      new PatientFeedback({
        id: 8,
        feedback_id: 'FB-008',
        patient_name: 'Robert Thomas',
        feedback_date: '2024-12-08',
        category: 'Doctor Consultation',
        rating: '5',
        status: 'Reviewed',
        feedback_text: 'Very professional doctors.',
        reviewed_by: 'Admin',
        action_taken: '',
      }),
      new PatientFeedback({
        id: 9,
        feedback_id: 'FB-009',
        patient_name: 'Patricia Jackson',
        feedback_date: '2024-12-09',
        category: 'Facilities',
        rating: '3',
        status: 'Pending',
        feedback_text: 'Washrooms need more cleaning.',
        reviewed_by: '',
        action_taken: '',
      }),
      new PatientFeedback({
        id: 10,
        feedback_id: 'FB-010',
        patient_name: 'Christopher White',
        feedback_date: '2024-12-10',
        category: 'Nursing Care',
        rating: '5',
        status: 'Reviewed',
        feedback_text: 'Great care provided.',
        reviewed_by: 'Head Nurse',
        action_taken: '',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addPatientFeedback(feedback: PatientFeedback): Observable<PatientFeedback> {
    this.dialogData = feedback;
    return of(feedback);
  }

  updatePatientFeedback(feedback: PatientFeedback): Observable<PatientFeedback> {
    this.dialogData = feedback;
    return of(feedback);
  }

  deletePatientFeedback(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
