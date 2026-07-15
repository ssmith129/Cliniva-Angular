import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PatientEncounter } from './patient-encounters.model';

@Injectable({
  providedIn: 'root',
})
export class PatientEncountersService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/patient-encounters.json';
  dataChange: BehaviorSubject<PatientEncounter[]> = new BehaviorSubject<PatientEncounter[]>([]);
  dialogData: PatientEncounter | null = null;

  get data(): PatientEncounter[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllPatientEncounters(): Observable<PatientEncounter[]> {
    const mockData: PatientEncounter[] = [
      new PatientEncounter({
        id: 1,
        encounterId: 'ENC-1001',
        patientName: 'Sarah Johnson',
        doctorName: 'Dr. Smith',
        encounterDate: '2024-11-20T09:00:00',
        encounterType: 'OPD',
        department: 'General Medicine',
        diagnosis: 'Viral Fever',
        status: 'Completed',
      }),
      new PatientEncounter({
        id: 2,
        encounterId: 'ENC-1002',
        patientName: 'John Doe',
        doctorName: 'Dr. Jones',
        encounterDate: '2024-11-21T10:30:00',
        encounterType: 'IPD',
        department: 'Orthopedics',
        diagnosis: 'Fracture Tibia',
        status: 'Admitted',
      }),
      new PatientEncounter({
        id: 3,
        encounterId: 'ENC-1003',
        patientName: 'Jane Smith',
        doctorName: 'Dr. Williams',
        encounterDate: '2024-11-22T11:00:00',
        encounterType: 'Emergency',
        department: 'Emergency Medicine',
        diagnosis: 'Acute Abdominal Pain',
        status: 'Transferred',
      }),
      new PatientEncounter({
        id: 4,
        encounterId: 'ENC-1004',
        patientName: 'Peter Jones',
        doctorName: 'Dr. Brown',
        encounterDate: '2024-11-23T14:00:00',
        encounterType: 'OPD',
        department: 'Dermatology',
        diagnosis: 'Eczema',
        status: 'Completed',
      }),
      new PatientEncounter({
        id: 5,
        encounterId: 'ENC-1005',
        patientName: 'Alice Williams',
        doctorName: 'Dr. Davis',
        encounterDate: '2024-11-24T09:15:00',
        encounterType: 'IPD',
        department: 'Cardiology',
        diagnosis: 'Angina',
        status: 'Admitted',
      }),
      new PatientEncounter({
        id: 6,
        encounterId: 'ENC-1006',
        patientName: 'Robert Brown',
        doctorName: 'Dr. Miller',
        encounterDate: '2024-11-25T16:00:00',
        encounterType: 'OPD',
        department: 'Neurology',
        diagnosis: 'Migraine',
        status: 'FollowUp',
      }),
      new PatientEncounter({
        id: 7,
        encounterId: 'ENC-1007',
        patientName: 'Emily Davis',
        doctorName: 'Dr. Wilson',
        encounterDate: '2024-11-26T10:00:00',
        encounterType: 'Emergency',
        department: 'Trauma Center',
        diagnosis: 'Road Accident',
        status: 'Critical',
      }),
       new PatientEncounter({
        id: 8,
        encounterId: 'ENC-1008',
        patientName: 'Michael Miller',
        doctorName: 'Dr. Moore',
        encounterDate: '2024-11-27T11:30:00',
        encounterType: 'OPD',
        department: 'Pediatrics',
        diagnosis: 'Common Cold',
        status: 'Completed',
      }),
       new PatientEncounter({
        id: 9,
        encounterId: 'ENC-1009',
        patientName: 'Jessica Wilson',
        doctorName: 'Dr. Taylor',
        encounterDate: '2024-11-28T13:45:00',
        encounterType: 'IPD',
        department: 'Gynecology',
        diagnosis: 'Pregnancy Monitoring',
        status: 'Admitted',
      }),
       new PatientEncounter({
        id: 10,
        encounterId: 'ENC-1010',
        patientName: 'David Garcia',
        doctorName: 'Dr. White',
        encounterDate: '2024-11-29T15:00:00',
        encounterType: 'OPD',
        department: 'ENT',
        diagnosis: 'Tonsillitis',
        status: 'Completed',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addPatientEncounter(patientEncounter: PatientEncounter): Observable<PatientEncounter> {
    this.dialogData = patientEncounter;
    return of(patientEncounter);
  }

  updatePatientEncounter(patientEncounter: PatientEncounter): Observable<PatientEncounter> {
    this.dialogData = patientEncounter;
    return of(patientEncounter);
  }

  deletePatientEncounter(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
