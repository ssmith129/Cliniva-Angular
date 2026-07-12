import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { ClinicalNote } from './clinical-notes.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClinicalNotesService {
  private readonly API_URL = 'api/clinical-notes';
  isTblLoading = true;
  dataChange: BehaviorSubject<ClinicalNote[]> = new BehaviorSubject<
    ClinicalNote[]
  >([]);

  constructor() {}

  get data(): ClinicalNote[] {
    return this.dataChange.value;
  }

  getAllClinicalNotes(): Observable<ClinicalNote[]> {
    const mockData: ClinicalNote[] = [
      new ClinicalNote({
        id: 1,
        patientName: 'John Doe',
        doctorName: 'Dr. Smith',
        noteType: 'Progress Note',
        noteDate: '2024-11-20',
        content: 'Patient reported feeling better. No new complaints.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 2,
        patientName: 'Sarah Jenkins',
        doctorName: 'Dr. Miller',
        noteType: 'Initial Assessment',
        noteDate: '2024-11-21',
        content: 'Patient presented with mild hypertension. Recommended lifestyle changes.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 3,
        patientName: 'Michael Brown',
        doctorName: 'Dr. Wilson',
        noteType: 'Follow-up Note',
        noteDate: '2024-11-22',
        content: 'Post-surgery recovery is on track. Wound healing well.',
        status: 'Draft',
      }),
      new ClinicalNote({
        id: 4,
        patientName: 'Emily Davis',
        doctorName: 'Dr. Thompson',
        noteType: 'Consultation Note',
        noteDate: '2024-11-23',
        content: 'Discussed allergy test results. Prescribed antihistamines.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 5,
        patientName: 'Robert Wilson',
        doctorName: 'Dr. Garcia',
        noteType: 'Progress Note',
        noteDate: '2024-11-24',
        content: 'Patient showing signs of improvement after starting new medication.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 6,
        patientName: 'Jessica Taylor',
        doctorName: 'Dr. Anderson',
        noteType: 'Discharge Summary',
        noteDate: '2024-11-25',
        content: 'Patient fit for discharge. Follow-up scheduled in two weeks.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 7,
        patientName: 'William Martinez',
        doctorName: 'Dr. Lee',
        noteType: 'Progress Note',
        noteDate: '2024-11-26',
        content: 'Blood pressure stabilized. Continuing current treatment plan.',
        status: 'Draft',
      }),
      new ClinicalNote({
        id: 8,
        patientName: 'Linda White',
        doctorName: 'Dr. Moore',
        noteType: 'Consultation Note',
        noteDate: '2024-11-27',
        content: 'Evaluated chronic back pain. Referred to physical therapy.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 9,
        patientName: 'David Thomas',
        doctorName: 'Dr. Taylor',
        noteType: 'Follow-up Note',
        noteDate: '2024-11-28',
        content: 'Review of lab results. All parameters within normal range.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 10,
        patientName: 'Elizabeth Jackson',
        doctorName: 'Dr. Harris',
        noteType: 'Initial Assessment',
        noteDate: '2024-11-29',
        content: 'Patient reporting persistent headaches. Ordered MRI scan.',
        status: 'Finalized',
      }),
      new ClinicalNote({
        id: 11,
        patientName: 'James Martin',
        doctorName: 'Dr. Clark',
        noteType: 'Progress Note',
        noteDate: '2024-11-30',
        content: 'Monitoring diabetic ketoacidosis. Adjusting insulin dosage.',
        status: 'Draft',
      }),
      new ClinicalNote({
        id: 12,
        patientName: 'Susan Lewis',
        doctorName: 'Dr. Walker',
        noteType: 'Consultation Note',
        noteDate: '2024-12-01',
        content: 'Discussed management of seasonal affective disorder.',
        status: 'Finalized',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addClinicalNote(note: ClinicalNote): Observable<ClinicalNote> {
    return of(note).pipe(catchError(this.handleError));
  }

  updateClinicalNote(note: ClinicalNote): Observable<ClinicalNote> {
    return of(note).pipe(catchError(this.handleError));
  }

  deleteClinicalNote(id: number): Observable<number> {
    return of(id).pipe(catchError(this.handleError));
  }

  private handleError(_error: Error) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
