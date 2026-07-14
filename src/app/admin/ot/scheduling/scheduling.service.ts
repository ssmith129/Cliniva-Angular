import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OTSchedule } from './scheduling.model';

@Injectable({
  providedIn: 'root',
})
export class OTSchedulingService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/ot-scheduling.json';
  dataChange: BehaviorSubject<OTSchedule[]> = new BehaviorSubject<OTSchedule[]>([]);
  dialogData: OTSchedule | null = null;

  get data(): OTSchedule[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllOTSchedules(): Observable<OTSchedule[]> {
    const mockData: OTSchedule[] = [
      new OTSchedule({
        id: 1,
        scheduleId: 'OT-SCH-001',
        patientName: 'Sarah Johnson',
        surgeryType: 'Appendectomy',
        surgeonName: 'Dr. Smith',
        anesthetistName: 'Dr. Williams',
        otRoom: 'OT-1',
        scheduledDate: '2024-12-16',
        scheduledTime: '09:00 AM',
        duration: '2 hours',
        status: 'Scheduled',
        notes: 'Patient fasting since midnight',
      }),
      new OTSchedule({
        id: 2,
        scheduleId: 'OT-SCH-002',
        patientName: 'Michael Brown',
        surgeryType: 'Knee Replacement',
        surgeonName: 'Dr. Johnson',
        anesthetistName: 'Dr. Davis',
        otRoom: 'OT-2',
        scheduledDate: '2024-12-16',
        scheduledTime: '11:00 AM',
        duration: '3 hours',
        status: 'In Progress',
        notes: 'Surgery started on time',
      }),
      new OTSchedule({
        id: 3,
        scheduleId: 'OT-SCH-003',
        patientName: 'Emily Davis',
        surgeryType: 'Cataract Surgery',
        surgeonName: 'Dr. Brown',
        anesthetistName: 'Dr. Miller',
        otRoom: 'OT-3',
        scheduledDate: '2024-12-15',
        scheduledTime: '02:00 PM',
        duration: '1 hour',
        status: 'Completed',
        notes: 'Surgery successful',
      }),
      new OTSchedule({
        id: 4,
        scheduleId: 'OT-SCH-004',
        patientName: 'David Wilson',
        surgeryType: 'Hernia Repair',
        surgeonName: 'Dr. Taylor',
        anesthetistName: 'Dr. Anderson',
        otRoom: 'OT-1',
        scheduledDate: '2024-12-17',
        scheduledTime: '08:00 AM',
        duration: '2 hours',
        status: 'Scheduled',
        notes: 'Pre-op assessment completed',
      }),
      new OTSchedule({
        id: 5,
        scheduleId: 'OT-SCH-005',
        patientName: 'Jessica Martinez',
        surgeryType: 'Gallbladder Removal',
        surgeonName: 'Dr. Wilson',
        anesthetistName: 'Dr. Moore',
        otRoom: 'OT-2',
        scheduledDate: '2024-12-17',
        scheduledTime: '01:00 PM',
        duration: '2.5 hours',
        status: 'Scheduled',
        notes: 'Laparoscopic procedure',
      }),
      new OTSchedule({
        id: 6,
        scheduleId: 'OT-SCH-006',
        patientName: 'James Anderson',
        surgeryType: 'Hip Replacement',
        surgeonName: 'Dr. Jackson',
        anesthetistName: 'Dr. White',
        otRoom: 'OT-4',
        scheduledDate: '2024-12-18',
        scheduledTime: '10:00 AM',
        duration: '4 hours',
        status: 'Scheduled',
        notes: 'Complex case, extended time allocated',
      }),
      new OTSchedule({
        id: 7,
        scheduleId: 'OT-SCH-007',
        patientName: 'Linda Taylor',
        surgeryType: 'Thyroidectomy',
        surgeonName: 'Dr. Thomas',
        anesthetistName: 'Dr. Harris',
        otRoom: 'OT-3',
        scheduledDate: '2024-12-14',
        scheduledTime: '09:30 AM',
        duration: '2 hours',
        status: 'Completed',
        notes: 'No complications',
      }),
      new OTSchedule({
        id: 8,
        scheduleId: 'OT-SCH-008',
        patientName: 'Robert Thomas',
        surgeryType: 'Cardiac Bypass',
        surgeonName: 'Dr. Martin',
        anesthetistName: 'Dr. Garcia',
        otRoom: 'OT-1',
        scheduledDate: '2024-12-19',
        scheduledTime: '07:00 AM',
        duration: '5 hours',
        status: 'Scheduled',
        notes: 'High-risk surgery, full team on standby',
      }),
      new OTSchedule({
        id: 9,
        scheduleId: 'OT-SCH-009',
        patientName: 'Patricia Jackson',
        surgeryType: 'Tonsillectomy',
        surgeonName: 'Dr. Rodriguez',
        anesthetistName: 'Dr. Lee',
        otRoom: 'OT-2',
        scheduledDate: '2024-12-13',
        scheduledTime: '03:00 PM',
        duration: '1 hour',
        status: 'Cancelled',
        notes: 'Patient developed fever',
      }),
      new OTSchedule({
        id: 10,
        scheduleId: 'OT-SCH-010',
        patientName: 'Christopher White',
        surgeryType: 'Spinal Fusion',
        surgeonName: 'Dr. Clark',
        anesthetistName: 'Dr. Lewis',
        otRoom: 'OT-4',
        scheduledDate: '2024-12-20',
        scheduledTime: '08:30 AM',
        duration: '6 hours',
        status: 'Scheduled',
        notes: 'Multi-level fusion procedure',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addOTSchedule(schedule: OTSchedule): Observable<OTSchedule> {
    this.dialogData = schedule;
    return of(schedule);
  }

  updateOTSchedule(schedule: OTSchedule): Observable<OTSchedule> {
    this.dialogData = schedule;
    return of(schedule);
  }

  deleteOTSchedule(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
