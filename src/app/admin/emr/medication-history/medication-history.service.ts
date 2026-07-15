import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { MedicationHistory } from './medication-history.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MedicationHistoryService {
  private readonly API_URL = 'api/medication-history';
  isTblLoading = true;
  dataChange: BehaviorSubject<MedicationHistory[]> = new BehaviorSubject<
    MedicationHistory[]
  >([]);

  constructor() {}

  get data(): MedicationHistory[] {
    return this.dataChange.value;
  }

  getAllMedicationHistory(): Observable<MedicationHistory[]> {
    const mockData: MedicationHistory[] = [
      new MedicationHistory({
        id: 1,
        medicationId: 'MED-1001',
        patientName: 'Sarah Johnson',
        drugName: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2024-11-01T00:00:00',
        endDate: '2025-02-01T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Smith',
      }),
      new MedicationHistory({
        id: 2,
        medicationId: 'MED-1002',
        patientName: 'Michael Brown',
        drugName: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2024-10-15T00:00:00',
        endDate: '2025-01-15T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Williams',
      }),
      new MedicationHistory({
        id: 3,
        medicationId: 'MED-1003',
        patientName: 'Emily Davis',
        drugName: 'Amoxicillin',
        dosage: '250mg',
        frequency: 'Three times daily',
        startDate: '2024-11-10T00:00:00',
        endDate: '2024-11-20T00:00:00',
        status: 'Completed',
        prescribedBy: 'Dr. Johnson',
      }),
      new MedicationHistory({
        id: 4,
        medicationId: 'MED-1004',
        patientName: 'David Wilson',
        drugName: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed',
        startDate: '2024-09-20T00:00:00',
        endDate: '2024-12-20T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Brown',
      }),
      new MedicationHistory({
        id: 5,
        medicationId: 'MED-1005',
        patientName: 'Jessica Martinez',
        drugName: 'Albuterol Inhaler',
        dosage: '90mcg',
        frequency: 'As needed',
        startDate: '2024-11-05T00:00:00',
        endDate: '2025-05-05T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Davis',
      }),
      new MedicationHistory({
        id: 6,
        medicationId: 'MED-1006',
        patientName: 'James Anderson',
        drugName: 'Sertraline',
        dosage: '50mg',
        frequency: 'Once daily',
        startDate: '2024-10-01T00:00:00',
        endDate: '2025-04-01T00:00:00',
        status: 'Discontinued',
        prescribedBy: 'Dr. Miller',
      }),
      new MedicationHistory({
        id: 7,
        medicationId: 'MED-1007',
        patientName: 'Linda Taylor',
        drugName: 'Methotrexate',
        dosage: '15mg',
        frequency: 'Weekly',
        startDate: '2024-08-15T00:00:00',
        endDate: '2025-02-15T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Wilson',
      }),
      new MedicationHistory({
        id: 8,
        medicationId: 'MED-1008',
        patientName: 'Robert Thomas',
        drugName: 'Furosemide',
        dosage: '40mg',
        frequency: 'Once daily',
        startDate: '2024-09-01T00:00:00',
        endDate: '2025-03-01T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Moore',
      }),
      new MedicationHistory({
        id: 9,
        medicationId: 'MED-1009',
        patientName: 'Patricia Jackson',
        drugName: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed',
        startDate: '2024-10-20T00:00:00',
        endDate: '2024-12-31T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Taylor',
      }),
      new MedicationHistory({
        id: 10,
        medicationId: 'MED-1010',
        patientName: 'Christopher White',
        drugName: 'Naproxen',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2024-11-12T00:00:00',
        endDate: '2025-02-12T00:00:00',
        status: 'Active',
        prescribedBy: 'Dr. Anderson',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addMedicationHistory(medication: MedicationHistory): Observable<MedicationHistory> {
    return of(medication).pipe(catchError(this.handleError));
  }

  updateMedicationHistory(medication: MedicationHistory): Observable<MedicationHistory> {
    return of(medication).pipe(catchError(this.handleError));
  }

  deleteMedicationHistory(id: number): Observable<number> {
    return of(id).pipe(catchError(this.handleError));
  }

  private handleError(_error: Error) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
