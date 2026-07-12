import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TreatmentPlan } from './treatment-plans.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TreatmentPlansService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'api/treatment-plans';
  isTblLoading = true;
  dataChange: BehaviorSubject<TreatmentPlan[]> = new BehaviorSubject<
    TreatmentPlan[]
  >([]);
  dialogData: TreatmentPlan | null = null;

  get data(): TreatmentPlan[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllTreatmentPlans(): Observable<TreatmentPlan[]> {
    const mockData: TreatmentPlan[] = [
      new TreatmentPlan({
        id: 1,
        patientName: 'Alice Smith',
        doctorName: 'Dr. Brown',
        diagnosis: 'Hypertension',
        treatment: 'Medication, diet, exercise',
        startDate: '2024-11-01',
        endDate: '2025-11-01',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 2,
        patientName: 'Robert Johnson',
        doctorName: 'Dr. Williams',
        diagnosis: 'Type 2 Diabetes',
        treatment: 'Insulin therapy, carb counting',
        startDate: '2024-10-15',
        endDate: '2025-10-15',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 3,
        patientName: 'Emily Wilson',
        doctorName: 'Dr. Jones',
        diagnosis: 'Asthma',
        treatment: 'Inhaler, avoid triggers',
        startDate: '2024-09-20',
        endDate: '2025-09-20',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 4,
        patientName: 'Michael Davis',
        doctorName: 'Dr. Miller',
        diagnosis: 'Post-Op Recovery',
        treatment: 'Physical therapy, pain management',
        startDate: '2024-11-10',
        endDate: '2024-12-10',
        status: 'Completed',
      }),
      new TreatmentPlan({
        id: 5,
        patientName: 'Sarah Thompson',
        doctorName: 'Dr. Garcia',
        diagnosis: 'Chronic Back Pain',
        treatment: 'Yoga, acupuncture, NSAIDs',
        startDate: '2024-08-05',
        endDate: '2025-02-05',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 6,
        patientName: 'James Anderson',
        doctorName: 'Dr. Martinez',
        diagnosis: 'High Cholesterol',
        treatment: 'Statins, low-fat diet',
        startDate: '2024-11-05',
        endDate: '2025-05-05',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 7,
        patientName: 'Linda White',
        doctorName: 'Dr. Robinson',
        diagnosis: 'Anxiety Disorder',
        treatment: 'CBT, SSRIs',
        startDate: '2024-10-01',
        endDate: '2025-04-01',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 8,
        patientName: 'David Lee',
        doctorName: 'Dr. Clark',
        diagnosis: 'Osteoarthritis',
        treatment: 'Weight loss, gentle exercise',
        startDate: '2024-07-15',
        endDate: '2025-07-15',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 9,
        patientName: 'Elizabeth Moore',
        doctorName: 'Dr. Rodriguez',
        diagnosis: 'Hypothyroidism',
        treatment: 'Levothyroxine',
        startDate: '2024-06-20',
        endDate: '2025-06-20',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 10,
        patientName: 'William Taylor',
        doctorName: 'Dr. Lewis',
        diagnosis: 'Sleep Apnea',
        treatment: 'CPAP machine, weight management',
        startDate: '2024-11-15',
        endDate: '2025-11-15',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 11,
        patientName: 'Jennifer Harris',
        doctorName: 'Dr. Walker',
        diagnosis: 'Iron Deficiency Anemia',
        treatment: 'Iron supplements, vitamin C',
        startDate: '2024-11-25',
        endDate: '2025-02-25',
        status: 'Active',
      }),
      new TreatmentPlan({
        id: 12,
        patientName: 'Charles Martin',
        doctorName: 'Dr. Hall',
        diagnosis: 'Migraine',
        treatment: 'Triptans, trigger identification',
        startDate: '2024-05-10',
        endDate: '2024-11-10',
        status: 'Completed',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addTreatmentPlan(treatmentPlan: TreatmentPlan): Observable<TreatmentPlan> {
    this.dialogData = treatmentPlan;
    return of(treatmentPlan);
  }

  updateTreatmentPlan(treatmentPlan: TreatmentPlan): Observable<TreatmentPlan> {
    this.dialogData = treatmentPlan;
    return of(treatmentPlan);
  }

  deleteTreatmentPlan(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
