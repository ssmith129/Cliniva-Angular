import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BreakdownReport } from './breakdown-reporting.model';

@Injectable({
  providedIn: 'root',
})
export class BreakdownReportingService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<BreakdownReport[]> = new BehaviorSubject<BreakdownReport[]>([]);
  dialogData: BreakdownReport | null = null;

  get data(): BreakdownReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllReports(): Observable<BreakdownReport[]> {
    const mockData: BreakdownReport[] = [
      new BreakdownReport({
        id: 1,
        breakdown_id: 'BD-001',
        equipment_id: 'EQ-005',
        equipment_name: 'X-Ray Machine',
        department: 'Radiology',
        reported_date: '2023-12-01',
        reported_time: '10:30 AM',
        reported_by: 'John Doe',
        problem_description: 'Image artifacts appearing on scans.',
        severity: 'High',
        status: 'Under Repair',
        assigned_to: 'Service Tech A',
        resolution_date: '',
        resolution_time: '',
        downtime_hours: '',
        repair_cost: '',
        action_taken: 'Parts ordered.',
        notes: '',
      }),
      new BreakdownReport({
        id: 2,
        breakdown_id: 'BD-002',
        equipment_id: 'EQ-002',
        equipment_name: 'Ventilator',
        department: 'ICU',
        reported_date: '2023-12-05',
        reported_time: '08:00 AM',
        reported_by: 'Jane Smith',
        problem_description: 'Alarm malfunction.',
        severity: 'Critical',
        status: 'Resolved',
        assigned_to: 'Vendor Support',
        resolution_date: '2023-12-05',
        resolution_time: '12:00 PM',
        downtime_hours: '4',
        repair_cost: '$0',
        action_taken: 'Software reset.',
        notes: '',
      }),
       new BreakdownReport({
        id: 3,
        breakdown_id: 'BD-003',
        equipment_id: 'EQ-001',
        equipment_name: 'MRI Scanner',
        department: 'Radiology',
        reported_date: '2023-12-10',
        reported_time: '02:00 PM',
        reported_by: 'Mike Johnson',
        problem_description: 'Cooling system warning.',
        severity: 'Medium',
        status: 'Reported',
        assigned_to: '',
        resolution_date: '',
        resolution_time: '',
        downtime_hours: '',
        repair_cost: '',
        action_taken: '',
        notes: 'Tech scheduled for visit.',
      }),
      new BreakdownReport({
        id: 4,
        breakdown_id: 'BD-004',
        equipment_id: 'EQ-004',
        equipment_name: 'Defibrillator',
        department: 'Emergency',
        reported_date: '2023-12-12',
        reported_time: '09:00 AM',
        reported_by: 'Sarah Brown',
        problem_description: 'Battery not charging.',
        severity: 'Critical',
        status: 'Pending Parts',
        assigned_to: 'In-house BioMed',
        resolution_date: '',
        resolution_time: '',
        downtime_hours: '48+',
        repair_cost: '',
        action_taken: 'Battery ordered.',
        notes: '',
      }),
      new BreakdownReport({
        id: 5,
        breakdown_id: 'BD-005',
        equipment_id: 'EQ-007',
        equipment_name: 'Ultrasound',
        department: 'Cardiology',
        reported_date: '2023-12-15',
        reported_time: '03:30 PM',
        reported_by: 'Dr. Emily White',
        problem_description: 'Probe connector loose.',
        severity: 'Low',
        status: 'Resolved',
        assigned_to: 'In-house BioMed',
        resolution_date: '2023-12-16',
        resolution_time: '10:00 AM',
        downtime_hours: '18',
        repair_cost: '0',
        action_taken: 'Connector tightened.',
        notes: '',
      }),
      new BreakdownReport({
        id: 6,
        breakdown_id: 'BD-006',
        equipment_id: 'EQ-010',
        equipment_name: 'Wheelchair',
        department: 'General Ward',
        reported_date: '2023-12-18',
        reported_time: '11:00 AM',
        reported_by: 'Nurse Ratched',
        problem_description: 'Brake stuck.',
        severity: 'Low',
        status: 'Resolved',
        assigned_to: 'Maintenance',
        resolution_date: '2023-12-18',
        resolution_time: '11:30 AM',
        downtime_hours: '0.5',
        repair_cost: '0',
        action_taken: 'Lubricated.',
        notes: '',
      }),
      new BreakdownReport({
        id: 7,
        breakdown_id: 'BD-007',
        equipment_id: 'EQ-009',
        equipment_name: 'Infusion Pump',
        department: 'ICU',
        reported_date: '2023-12-20',
        reported_time: '07:00 AM',
        reported_by: 'Nurse Jackie',
        problem_description: 'Error code E-404.',
        severity: 'High',
        status: 'Under Repair',
        assigned_to: 'Vendor',
        resolution_date: '',
        resolution_time: '',
        downtime_hours: '',
        repair_cost: '',
        action_taken: 'Sent to manufacturer.',
        notes: '',
      }),
      new BreakdownReport({
        id: 8,
        breakdown_id: 'BD-008',
        equipment_id: 'EQ-003',
        equipment_name: 'Anesthesia Machine',
        department: 'Operation Theatre',
        reported_date: '2023-12-22',
        reported_time: '06:00 AM',
        reported_by: 'Dr. House',
        problem_description: 'Gas flow meter inaccurate.',
        severity: 'Critical',
        status: 'Resolved',
        assigned_to: 'GE Service',
        resolution_date: '2023-12-22',
        resolution_time: '08:00 AM',
        downtime_hours: '2',
        repair_cost: '$500',
        action_taken: 'Recalibrated.',
        notes: '',
      }),
      new BreakdownReport({
        id: 9,
        breakdown_id: 'BD-009',
        equipment_id: 'EQ-006',
        equipment_name: 'Patient Monitor',
        department: 'General Ward',
        reported_date: '2023-12-25',
        reported_time: '08:00 PM',
        reported_by: 'Night Nurse',
        problem_description: 'Screen flickering.',
        severity: 'Medium',
        status: 'Reported',
        assigned_to: '',
        resolution_date: '',
        resolution_time: '',
        downtime_hours: '',
        repair_cost: '',
        action_taken: '',
        notes: '',
      }),
      new BreakdownReport({
        id: 10,
        breakdown_id: 'BD-010',
        equipment_id: 'EQ-008',
        equipment_name: 'Centrifuge',
        department: 'Laboratory',
        reported_date: '2023-12-26',
        reported_time: '09:00 AM',
        reported_by: 'Lab Tech',
        problem_description: 'Noisy operation.',
        severity: 'Low',
        status: 'Under Repair',
        assigned_to: 'In-house',
        resolution_date: '',
        resolution_time: '',
        downtime_hours: '',
        repair_cost: '',
        action_taken: 'Checking bearings.',
        notes: '',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addReport(report: BreakdownReport): Observable<BreakdownReport> {
    this.dialogData = report;
    return of(report);
  }

  updateReport(report: BreakdownReport): Observable<BreakdownReport> {
    this.dialogData = report;
    return of(report);
  }

  deleteReport(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
