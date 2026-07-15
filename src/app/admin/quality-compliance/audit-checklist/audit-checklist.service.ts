import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuditChecklist } from './audit-checklist.model';

@Injectable({
  providedIn: 'root',
})
export class AuditChecklistService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<AuditChecklist[]> = new BehaviorSubject<AuditChecklist[]>([]);
  dialogData: AuditChecklist | null = null;

  get data(): AuditChecklist[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllAuditChecklists(): Observable<AuditChecklist[]> {
    const mockData: AuditChecklist[] = [
      new AuditChecklist({
        id: 1,
        audit_id: 'AUD-001',
        audit_type: 'Internal Audit',
        department: 'ICU',
        audit_date: '2023-11-15',
        auditor_name: 'Sarah Jenkins',
        auditor_organization: 'Internal Quality Team',
        compliance_score: '95',
        total_items: '50',
        items_passed: '48',
        items_failed: '2',
        status: 'Passed',
        findings: 'Minor documentation gaps',
        recommendations: 'Update log books daily',
        follow_up_date: '2023-12-15',
        notes: 'Good overall compliance',
      }),
      new AuditChecklist({
        id: 2,
        audit_id: 'AUD-002',
        audit_type: 'Safety Audit',
        department: 'Operation Theatre',
        audit_date: '2023-11-20',
        auditor_name: 'Mike Ross',
        auditor_organization: 'Safety First Corp',
        compliance_score: '88',
        total_items: '40',
        items_passed: '35',
        items_failed: '5',
        status: 'In Progress',
        findings: 'Fire extinguisher checks overdue',
        recommendations: 'Complete checks immediately',
        follow_up_date: '2023-11-25',
        notes: 'Critical safety checks needed',
      }),
      new AuditChecklist({
        id: 3,
        audit_id: 'AUD-003',
        audit_type: 'Infection Control Audit',
        department: 'Laboratory',
        audit_date: '2023-11-25',
        auditor_name: 'Dr. Emily Blunt',
        auditor_organization: 'Health Dept',
        compliance_score: '92',
        total_items: '60',
        items_passed: '55',
        items_failed: '5',
        status: 'Passed',
        findings: 'Hand hygiene compliance excellent',
        recommendations: 'Maintain current standards',
        follow_up_date: '',
        notes: 'Top performer',
      }),
      new AuditChecklist({
        id: 4,
        audit_id: 'AUD-004',
        audit_type: 'Regulatory Audit',
        department: 'Pharmacy',
        audit_date: '2023-12-01',
        auditor_name: 'John Doe',
        auditor_organization: 'Drug Control Agency',
        compliance_score: '98',
        total_items: '100',
        items_passed: '98',
        items_failed: '2',
        status: 'Passed',
        findings: 'Storage conditions optimal',
        recommendations: 'None',
        follow_up_date: '',
        notes: 'Excellent inventory management',
      }),
      new AuditChecklist({
        id: 5,
        audit_id: 'AUD-005',
        audit_type: 'External Audit',
        department: 'Radiology',
        audit_date: '2023-12-05',
        auditor_name: 'Jane Smith',
        auditor_organization: 'ISO Certifiers',
        compliance_score: '85',
        total_items: '30',
        items_passed: '25',
        items_failed: '5',
        status: 'Failed',
        findings: 'Equipment calibration records missing',
        recommendations: 'Update calibration logs',
        follow_up_date: '2023-12-20',
        notes: 'Needs immediate attention',
      }),
      new AuditChecklist({
        id: 6,
        audit_id: 'AUD-006',
        audit_type: 'Quality Audit',
        department: 'General Ward',
        audit_date: '2023-12-10',
        auditor_name: 'Robert Brown',
        auditor_organization: 'Internal Quality Team',
        compliance_score: '90',
        total_items: '45',
        items_passed: '40',
        items_failed: '5',
        status: 'Passed',
        findings: 'Patient feedback positive',
        recommendations: 'Improve discharge process time',
        follow_up_date: '2024-01-10',
        notes: 'Steady improvement',
      }),
      new AuditChecklist({
        id: 7,
        audit_id: 'AUD-007',
        audit_type: 'Safety Audit',
        department: 'Emergency',
        audit_date: '2023-12-12',
        auditor_name: 'Alice Cooper',
        auditor_organization: 'Safety First Corp',
        compliance_score: '94',
        total_items: '50',
        items_passed: '47',
        items_failed: '3',
        status: 'Passed',
        findings: 'Emergency exits clear',
        recommendations: 'Conduct fire drill',
        follow_up_date: '2024-01-15',
        notes: 'Well prepared',
      }),
      new AuditChecklist({
        id: 8,
        audit_id: 'AUD-008',
        audit_type: 'Internal Audit',
        department: 'Admin Block',
        audit_date: '2023-12-15',
        auditor_name: 'David Lee',
        auditor_organization: 'Internal Audit',
        compliance_score: '96',
        total_items: '25',
        items_passed: '24',
        items_failed: '1',
        status: 'Passed',
        findings: 'File management organized',
        recommendations: 'Digitize older records',
        follow_up_date: '2024-02-01',
        notes: 'Efficient operations',
      }),
      new AuditChecklist({
        id: 9,
        audit_id: 'AUD-009',
        audit_type: 'Infection Control Audit',
        department: 'ICU',
        audit_date: '2023-12-18',
        auditor_name: 'Dr. House',
        auditor_organization: 'Health Dept',
        compliance_score: '99',
        total_items: '60',
        items_passed: '59',
        items_failed: '1',
        status: 'Passed',
        findings: 'Sterilization protocols followed strictly',
        recommendations: 'None',
        follow_up_date: '',
        notes: 'Exemplary',
      }),
      new AuditChecklist({
        id: 10,
        audit_id: 'AUD-010',
        audit_type: 'External Audit',
        department: 'All Departments',
        audit_date: '2023-12-20',
        auditor_name: 'Peter Parker',
        auditor_organization: 'Global Accreditation Body',
        compliance_score: '0',
        total_items: '200',
        items_passed: '0',
        items_failed: '0',
        status: 'Scheduled',
        findings: '',
        recommendations: '',
        follow_up_date: '',
        notes: 'Upcoming major audit',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addAuditChecklist(audit: AuditChecklist): Observable<AuditChecklist> {
    this.dialogData = audit;
    return of(audit);
  }

  updateAuditChecklist(audit: AuditChecklist): Observable<AuditChecklist> {
    this.dialogData = audit;
    return of(audit);
  }

  deleteAuditChecklist(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
