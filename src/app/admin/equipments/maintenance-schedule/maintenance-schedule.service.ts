import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MaintenanceSchedule } from './maintenance-schedule.model';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceScheduleService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<MaintenanceSchedule[]> = new BehaviorSubject<MaintenanceSchedule[]>([]);
  dialogData: MaintenanceSchedule | null = null;

  get data(): MaintenanceSchedule[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllSchedules(): Observable<MaintenanceSchedule[]> {
    const mockData: MaintenanceSchedule[] = [
      new MaintenanceSchedule({
        id: 1,
        maintenance_id: 'MT-001',
        equipment_id: 'EQ-001',
        equipment_name: 'MRI Scanner',
        maintenance_type: 'Preventive',
        scheduled_date: '2024-01-15',
        scheduled_time: '09:00 AM',
        performed_by: 'In-house',
        vendor_name: '',
        estimated_duration: '4 hours',
        status: 'Scheduled',
        completion_date: '',
        next_maintenance: '2024-07-15',
        cost: '',
        work_performed: '',
        notes: 'Routine checkup.',
      }),
      new MaintenanceSchedule({
        id: 2,
        maintenance_id: 'MT-002',
        equipment_id: 'EQ-002',
        equipment_name: 'Ventilator',
        maintenance_type: 'Corrective',
        scheduled_date: '2023-12-10',
        scheduled_time: '10:00 AM',
        performed_by: 'Vendor',
        vendor_name: 'MedTech Solutions',
        estimated_duration: '2 hours',
        status: 'Completed',
        completion_date: '2023-12-10',
        next_maintenance: '2024-06-10',
        cost: '$500',
        work_performed: 'Filter replaced.',
        notes: '',
      }),
      new MaintenanceSchedule({
        id: 3,
        maintenance_id: 'MT-003',
        equipment_id: 'EQ-005',
        equipment_name: 'X-Ray Machine',
        maintenance_type: 'Inspection',
        scheduled_date: '2023-12-20',
        scheduled_time: '02:00 PM',
        performed_by: 'In-house',
        vendor_name: '',
        estimated_duration: '1 hour',
        status: 'Overdue',
        completion_date: '',
        next_maintenance: '2024-03-20',
        cost: '',
        work_performed: '',
        notes: 'Safety inspection pending.',
      }),
      new MaintenanceSchedule({
        id: 4,
        maintenance_id: 'MT-004',
        equipment_id: 'EQ-003',
        equipment_name: 'Anesthesia Machine',
        maintenance_type: 'Calibration',
        scheduled_date: '2024-01-05',
        scheduled_time: '11:00 AM',
        performed_by: 'Vendor',
        vendor_name: 'GE Service',
        estimated_duration: '3 hours',
        status: 'Scheduled',
        completion_date: '',
        next_maintenance: '2024-07-05',
        cost: '$800',
        work_performed: '',
        notes: 'Annual calibration.',
      }),
      new MaintenanceSchedule({
        id: 5,
        maintenance_id: 'MT-005',
        equipment_id: 'EQ-004',
        equipment_name: 'Defibrillator',
        maintenance_type: 'Preventive',
        scheduled_date: '2023-12-22',
        scheduled_time: '03:00 PM',
        performed_by: 'In-house',
        vendor_name: '',
        estimated_duration: '30 mins',
        status: 'In Progress',
        completion_date: '',
        next_maintenance: '2024-06-22',
        cost: '',
        work_performed: '',
        notes: 'Battery testing.',
      }),
      // Add more mock data as needed
      new MaintenanceSchedule({
        id: 6,
        maintenance_id: 'MT-006',
        equipment_id: 'EQ-007',
        equipment_name: 'Ultrasound',
        maintenance_type: 'Cleaning',
        scheduled_date: '2023-12-15',
        scheduled_time: '05:00 PM',
        performed_by: 'In-house',
        vendor_name: '',
        estimated_duration: '45 mins',
        status: 'Completed',
        completion_date: '2023-12-15',
        next_maintenance: '2024-01-15',
        cost: '0',
        work_performed: 'Probe cleaning.',
        notes: '',
      }),
      new MaintenanceSchedule({
        id: 7,
        maintenance_id: 'MT-007',
        equipment_id: 'EQ-006',
        equipment_name: 'Patient Monitor',
        maintenance_type: 'Preventive',
        scheduled_date: '2024-01-10',
        scheduled_time: '09:30 AM',
        performed_by: 'In-house',
        vendor_name: '',
        estimated_duration: '1 hour',
        status: 'Scheduled',
        completion_date: '',
        next_maintenance: '2024-07-10',
        cost: '',
        work_performed: '',
        notes: '',
      }),
      new MaintenanceSchedule({
        id: 8,
        maintenance_id: 'MT-008',
        equipment_id: 'EQ-008',
        equipment_name: 'Centrifuge',
        maintenance_type: 'Calibration',
        scheduled_date: '2023-11-20',
        scheduled_time: '10:00 AM',
        performed_by: 'Vendor',
        vendor_name: 'Thermo Service',
        estimated_duration: '2 hours',
        status: 'Completed',
        completion_date: '2023-11-20',
        next_maintenance: '2024-05-20',
        cost: '$400',
        work_performed: 'Speed calibration.',
        notes: '',
      }),
      new MaintenanceSchedule({
        id: 9,
        maintenance_id: 'MT-009',
        equipment_id: 'EQ-009',
        equipment_name: 'Infusion Pump',
        maintenance_type: 'Preventive',
        scheduled_date: '2024-01-20',
        scheduled_time: '01:00 PM',
        performed_by: 'In-house',
        vendor_name: '',
        estimated_duration: '1 hour',
        status: 'Scheduled',
        completion_date: '',
        next_maintenance: '2024-07-20',
        cost: '',
        work_performed: '',
        notes: '',
      }),
      new MaintenanceSchedule({
        id: 10,
        maintenance_id: 'MT-010',
        equipment_id: 'EQ-010',
        equipment_name: 'Wheelchair',
        maintenance_type: 'Inspection',
        scheduled_date: '2023-12-28',
        scheduled_time: '04:00 PM',
        performed_by: 'In-house',
        vendor_name: '',
        estimated_duration: '30 mins',
        status: 'Scheduled',
        completion_date: '',
        next_maintenance: '2024-06-28',
        cost: '',
        work_performed: '',
        notes: 'Check wheels and brakes.',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addSchedule(schedule: MaintenanceSchedule): Observable<MaintenanceSchedule> {
    this.dialogData = schedule;
    return of(schedule);
  }

  updateSchedule(schedule: MaintenanceSchedule): Observable<MaintenanceSchedule> {
    this.dialogData = schedule;
    return of(schedule);
  }

  deleteSchedule(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
