import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DischargeSummary } from './summary-creation.model';

@Injectable({
  providedIn: 'root',
})
export class SummaryCreationService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/discharge-summary.json';
  dataChange: BehaviorSubject<DischargeSummary[]> = new BehaviorSubject<DischargeSummary[]>([]);
  dialogData: DischargeSummary | null = null;

  get data(): DischargeSummary[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllSummaries(): Observable<DischargeSummary[]> {
    const mockData: DischargeSummary[] = [
      new DischargeSummary({
        id: 1,
        summaryId: 'DS-001',
        patientName: 'Sarah Johnson',
        admissionDate: '2024-12-10',
        dischargeDate: '2024-12-16',
        primaryDiagnosis: 'Acute Appendicitis',
        proceduresPerformed: 'Laparoscopic Appendectomy',
        treatmentGiven: 'IV Antibiotics, Analgesics',
        followUpInstructions: 'Follow up in 1 week',
        author: 'Dr. Smith',
        status: 'Finalized',
        notes: 'Uncomplicated recovery',
      }),
      new DischargeSummary({
        id: 2,
        summaryId: 'DS-002',
        patientName: 'Michael Brown',
        admissionDate: '2024-12-12',
        dischargeDate: '2024-12-17',
        primaryDiagnosis: 'Osteoarthritis Knee',
        proceduresPerformed: 'Total Knee Replacement',
        treatmentGiven: 'Surgery, PT',
        followUpInstructions: 'PT sessions x3 weekly',
        author: 'Dr. Johnson',
        status: 'Draft',
        notes: 'Pending final review',
      }),
      new DischargeSummary({
        id: 3,
        summaryId: 'DS-003',
        patientName: 'Emily Davis',
        admissionDate: '2024-12-05',
        dischargeDate: '2024-12-15',
        primaryDiagnosis: 'Cataract',
        proceduresPerformed: 'Phacoemulsification',
        treatmentGiven: 'Eye drops',
        followUpInstructions: 'Eye checkup in 2 days',
        author: 'Dr. Brown',
        status: 'Finalized',
        notes: 'Vision restored',
      }),
      new DischargeSummary({
        id: 4,
        summaryId: 'DS-004',
        patientName: 'David Wilson',
        admissionDate: '2024-12-08',
        dischargeDate: '2024-12-18',
        primaryDiagnosis: 'Inguinal Hernia',
        proceduresPerformed: 'Hernioplasty',
        treatmentGiven: 'Pain management',
        followUpInstructions: 'Avoid heavy lifting',
        author: 'Dr. Taylor',
        status: 'Draft',
        notes: 'Pending surgeon signature',
      }),
      new DischargeSummary({
        id: 5,
        summaryId: 'DS-005',
        patientName: 'Jessica Martinez',
        admissionDate: '2024-12-11',
        dischargeDate: '2024-12-17',
        primaryDiagnosis: 'Cholecystitis',
        proceduresPerformed: 'Laparoscopic Cholecystectomy',
        treatmentGiven: 'Antibiotics',
        followUpInstructions: 'Low fat diet',
        author: 'Dr. Wilson',
        status: 'Finalized',
        notes: 'Discharged on oral meds',
      }),
      new DischargeSummary({
        id: 6,
        summaryId: 'DS-006',
        patientName: 'James Anderson',
        admissionDate: '2024-12-01',
        dischargeDate: '2024-12-19',
        primaryDiagnosis: 'Pneumonia',
        proceduresPerformed: 'None',
        treatmentGiven: 'IV Antibiotics, Oxygen',
        followUpInstructions: 'Chest X-ray in 2 weeks',
        author: 'Dr. Jackson',
        status: 'Draft',
        notes: 'Completing antibiotic course',
      }),
      new DischargeSummary({
        id: 7,
        summaryId: 'DS-007',
        patientName: 'Linda Taylor',
        admissionDate: '2024-12-13',
        dischargeDate: '2024-12-15',
        primaryDiagnosis: 'Viral Fever',
        proceduresPerformed: 'None',
        treatmentGiven: 'Supportive care',
        followUpInstructions: 'Hydration',
        author: 'Dr. Thomas',
        status: 'Finalized',
        notes: 'Recovered fully',
      }),
      new DischargeSummary({
        id: 8,
        summaryId: 'DS-008',
        patientName: 'Robert Thomas',
        admissionDate: '2024-12-09',
        dischargeDate: '2024-12-20',
        primaryDiagnosis: 'Unstable Angina',
        proceduresPerformed: 'Coronary Angiogram',
        treatmentGiven: 'Medication management',
        followUpInstructions: 'Cardiology follow up',
        author: 'Dr. Martin',
        status: 'Draft',
        notes: 'Awaiting stress test report inclusion',
      }),
      new DischargeSummary({
        id: 9,
        summaryId: 'DS-009',
        patientName: 'Patricia Jackson',
        admissionDate: '2024-12-14',
        dischargeDate: '2024-12-16',
        primaryDiagnosis: 'Gastroenteritis',
        proceduresPerformed: 'None',
        treatmentGiven: 'IV Fluids',
        followUpInstructions: 'Bland diet',
        author: 'Dr. Rodriguez',
        status: 'Finalized',
        notes: 'Hydration improved',
      }),
      new DischargeSummary({
        id: 10,
        summaryId: 'DS-010',
        patientName: 'Christopher White',
        admissionDate: '2024-12-02',
        dischargeDate: '2024-12-21',
        primaryDiagnosis: 'Fracture Radius',
        proceduresPerformed: 'ORIF',
        treatmentGiven: 'Cast application',
        followUpInstructions: 'Ortho followup',
        author: 'Dr. Clark',
        status: 'Draft',
        notes: 'X-ray pending review',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addDischargeSummary(summary: DischargeSummary): Observable<DischargeSummary> {
    this.dialogData = summary;
    return of(summary);
  }

  updateDischargeSummary(summary: DischargeSummary): Observable<DischargeSummary> {
    this.dialogData = summary;
    return of(summary);
  }

  deleteDischargeSummary(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
