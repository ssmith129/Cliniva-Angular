import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SurgeryRecord } from './surgery-records.model';

@Injectable({
  providedIn: 'root',
})
export class SurgeryRecordsService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/surgery-records.json';
  dataChange: BehaviorSubject<SurgeryRecord[]> = new BehaviorSubject<SurgeryRecord[]>([]);
  dialogData: SurgeryRecord | null = null;

  get data(): SurgeryRecord[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllSurgeryRecords(): Observable<SurgeryRecord[]> {
    const mockData: SurgeryRecord[] = [
      new SurgeryRecord({
        id: 1,
        surgeryId: 'SUR-001',
        patientName: 'Sarah Johnson',
        surgeryType: 'Appendectomy',
        surgeonName: 'Dr. Smith',
        surgeryDate: '2024-12-15',
        startTime: '09:00 AM',
        endTime: '11:00 AM',
        outcome: 'Successful',
        anesthesiaType: 'General',
        complications: 'None',
        bloodLoss: '50ml',
        notes: 'Routine procedure',
      }),
      new SurgeryRecord({
        id: 2,
        surgeryId: 'SUR-002',
        patientName: 'Michael Brown',
        surgeryType: 'Knee Replacement',
        surgeonName: 'Dr. Johnson',
        surgeryDate: '2024-12-16',
        startTime: '10:00 AM',
        endTime: '01:00 PM',
        outcome: 'Successful',
        anesthesiaType: 'Spinal',
        complications: 'None',
        bloodLoss: '200ml',
        notes: 'Good alignment achieved',
      }),
      new SurgeryRecord({
        id: 3,
        surgeryId: 'SUR-003',
        patientName: 'Emily Davis',
        surgeryType: 'Cataract Surgery',
        surgeonName: 'Dr. Brown',
        surgeryDate: '2024-12-15',
        startTime: '02:00 PM',
        endTime: '03:00 PM',
        outcome: 'Successful',
        anesthesiaType: 'Local',
        complications: 'None',
        bloodLoss: 'Minimal',
        notes: 'IOL implanted',
      }),
      new SurgeryRecord({
        id: 4,
        surgeryId: 'SUR-004',
        patientName: 'David Wilson',
        surgeryType: 'Hernia Repair',
        surgeonName: 'Dr. Taylor',
        surgeryDate: '2024-12-17',
        startTime: '08:00 AM',
        endTime: '10:00 AM',
        outcome: 'Successful',
        anesthesiaType: 'General',
        complications: 'None',
        bloodLoss: '30ml',
        notes: 'Mesh placement successful',
      }),
      new SurgeryRecord({
        id: 5,
        surgeryId: 'SUR-005',
        patientName: 'Jessica Martinez',
        surgeryType: 'Gallbladder Removal',
        surgeonName: 'Dr. Wilson',
        surgeryDate: '2024-12-17',
        startTime: '01:00 PM',
        endTime: '03:30 PM',
        outcome: 'Complicated',
        anesthesiaType: 'General',
        complications: 'Bile leak detected',
        bloodLoss: '100ml',
        notes: 'Converted to open surgery',
      }),
      new SurgeryRecord({
        id: 6,
        surgeryId: 'SUR-006',
        patientName: 'James Anderson',
        surgeryType: 'Hip Replacement',
        surgeonName: 'Dr. Jackson',
        surgeryDate: '2024-12-18',
        startTime: '09:00 AM',
        endTime: '01:00 PM',
        outcome: 'Successful',
        anesthesiaType: 'General',
        complications: 'None',
        bloodLoss: '300ml',
        notes: 'Stable implant',
      }),
      new SurgeryRecord({
        id: 7,
        surgeryId: 'SUR-007',
        patientName: 'Linda Taylor',
        surgeryType: 'Thyroidectomy',
        surgeonName: 'Dr. Thomas',
        surgeryDate: '2024-12-14',
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        outcome: 'Successful',
        anesthesiaType: 'General',
        complications: 'None',
        bloodLoss: '40ml',
        notes: 'Nerves preserved',
      }),
      new SurgeryRecord({
        id: 8,
        surgeryId: 'SUR-008',
        patientName: 'Robert Thomas',
        surgeryType: 'Cardiac Bypass',
        surgeonName: 'Dr. Martin',
        surgeryDate: '2024-12-19',
        startTime: '07:00 AM',
        endTime: '01:00 PM',
        outcome: 'Successful',
        anesthesiaType: 'General',
        complications: 'None',
        bloodLoss: '500ml',
        notes: 'Grafts patent',
      }),
      new SurgeryRecord({
        id: 9,
        surgeryId: 'SUR-009',
        patientName: 'Patricia Jackson',
        surgeryType: 'Tonsillectomy',
        surgeonName: 'Dr. Rodriguez',
        surgeryDate: '2024-12-13',
        startTime: '04:00 PM',
        endTime: '05:00 PM',
        outcome: 'Successful',
        anesthesiaType: 'General',
        complications: 'None',
        bloodLoss: 'Minimal',
        notes: 'Uneventful',
      }),
      new SurgeryRecord({
        id: 10,
        surgeryId: 'SUR-010',
        patientName: 'Christopher White',
        surgeryType: 'Spinal Fusion',
        surgeonName: 'Dr. Clark',
        surgeryDate: '2024-12-20',
        startTime: '08:00 AM',
        endTime: '02:00 PM',
        outcome: 'Successful',
        anesthesiaType: 'General',
        complications: 'None',
        bloodLoss: '400ml',
        notes: 'Hardware placement verified',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addSurgeryRecord(record: SurgeryRecord): Observable<SurgeryRecord> {
    this.dialogData = record;
    return of(record);
  }

  updateSurgeryRecord(record: SurgeryRecord): Observable<SurgeryRecord> {
    this.dialogData = record;
    return of(record);
  }

  deleteSurgeryRecord(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
