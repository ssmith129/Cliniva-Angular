import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { VirtualVisitRecord } from './virtual-visit-records.model';

@Injectable({
  providedIn: 'root',
})
export class VirtualVisitRecordsService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<VirtualVisitRecord[]> = new BehaviorSubject<VirtualVisitRecord[]>([]);
  dialogData: VirtualVisitRecord | null = null;

  get data(): VirtualVisitRecord[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllRecords(): Observable<VirtualVisitRecord[]> {
    const mockData: VirtualVisitRecord[] = [
      new VirtualVisitRecord({
        id: 1,
        visit_id: 'VV-001',
        patient_name: 'Sarah Johnson',
        doctor_name: 'Dr. John Deo',
        visit_date: '2024-12-15',
        duration: '30',
        chief_complaint: 'High fever and cough.',
        diagnosis: 'Viral Flu',
        prescription: 'Paracetamol, Cough Syrup',
        follow_up_date: '2024-12-20',
        notes: 'Advised rest and hydration.',
      }),
      new VirtualVisitRecord({
        id: 2,
        visit_id: 'VV-002',
        patient_name: 'Michael Brown',
        doctor_name: 'Dr. Sarah Smith',
        visit_date: '2024-12-14',
        duration: '15',
        chief_complaint: 'Skin rash.',
        diagnosis: 'Eczema warning',
        prescription: 'Topical cream',
        follow_up_date: '',
        notes: 'Avoid junk food.',
      }),
      new VirtualVisitRecord({
        id: 3,
        visit_id: 'VV-003',
        patient_name: 'Emily Davis',
        doctor_name: 'Dr. Rajesh Kumar',
        visit_date: '2024-12-16',
        duration: '45',
        chief_complaint: 'Chest pain.',
        diagnosis: 'Acid Reflux',
        prescription: 'Antacids',
        follow_up_date: '2024-12-25',
        notes: 'Recommended diet changes.',
      }),
      new VirtualVisitRecord({
        id: 4,
        visit_id: 'VV-004',
        patient_name: 'David Wilson',
        doctor_name: 'Dr. John Deo',
        visit_date: '2024-12-13',
        duration: '20',
        chief_complaint: 'Headache.',
        diagnosis: 'Migraine',
        prescription: 'Painkillers',
        follow_up_date: '',
        notes: 'Stress management advised.',
      }),
      new VirtualVisitRecord({
        id: 5,
        visit_id: 'VV-005',
        patient_name: 'Jessica Martinez',
        doctor_name: 'Dr. Sarah Smith',
        visit_date: '2024-12-12',
        duration: '25',
        chief_complaint: 'Joint pain.',
        diagnosis: 'Arthritis',
        prescription: 'Anti-inflammatory',
        follow_up_date: '2025-01-10',
        notes: 'Physiotherapy recommended.',
      }),
      new VirtualVisitRecord({
        id: 6,
        visit_id: 'VV-006',
        patient_name: 'James Anderson',
        doctor_name: 'Dr. Rajesh Kumar',
        visit_date: '2024-12-17',
        duration: '35',
        chief_complaint: 'Abdominal pain.',
        diagnosis: 'Gastritis',
        prescription: 'Proton Pump Inhibitors',
        follow_up_date: '2024-12-22',
        notes: '',
      }),
      new VirtualVisitRecord({
        id: 7,
        visit_id: 'VV-007',
        patient_name: 'Linda Taylor',
        doctor_name: 'Dr. John Deo',
        visit_date: '2024-12-18',
        duration: '10',
        chief_complaint: 'Sore throat.',
        diagnosis: 'Pharyngitis',
        prescription: 'Antibiotics',
        follow_up_date: '',
        notes: 'Warm salt water gargle.',
      }),
      new VirtualVisitRecord({
        id: 8,
        visit_id: 'VV-008',
        patient_name: 'Robert Thomas',
        doctor_name: 'Dr. Sarah Smith',
        visit_date: '2024-12-19',
        duration: '50',
        chief_complaint: 'Anxiety.',
        diagnosis: 'GAD',
        prescription: 'Anxiolytics',
        follow_up_date: '2025-01-05',
        notes: 'Counseling scheduled.',
      }),
      new VirtualVisitRecord({
        id: 9,
        visit_id: 'VV-009',
        patient_name: 'Patricia Jackson',
        doctor_name: 'Dr. Rajesh Kumar',
        visit_date: '2024-12-11',
        duration: '15',
        chief_complaint: 'Cough.',
        diagnosis: 'Bronchitis',
        prescription: 'Cough suppressants',
        follow_up_date: '2024-12-18',
        notes: '',
      }),
      new VirtualVisitRecord({
        id: 10,
        visit_id: 'VV-010',
        patient_name: 'Christopher White',
        doctor_name: 'Dr. John Deo',
        visit_date: '2024-12-20',
        duration: '20',
        chief_complaint: 'Fever.',
        diagnosis: 'Viral Fever',
        prescription: 'Antipyretics',
        follow_up_date: '',
        notes: 'Monitor temperature.',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addRecord(record: VirtualVisitRecord): Observable<VirtualVisitRecord> {
    this.dialogData = record;
    return of(record);
  }

  updateRecord(record: VirtualVisitRecord): Observable<VirtualVisitRecord> {
    this.dialogData = record;
    return of(record);
  }

  deleteRecord(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
