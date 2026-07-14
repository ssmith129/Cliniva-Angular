import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DischargeWorkflow } from './workflow.model';

@Injectable({
  providedIn: 'root',
})
export class DischargeWorkflowService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/discharge-workflow.json';
  dataChange: BehaviorSubject<DischargeWorkflow[]> = new BehaviorSubject<DischargeWorkflow[]>([]);
  dialogData: DischargeWorkflow | null = null;

  get data(): DischargeWorkflow[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllWorkflows(): Observable<DischargeWorkflow[]> {
    const mockData: DischargeWorkflow[] = [
      new DischargeWorkflow({
        id: 1,
        workflowId: 'DW-001',
        patientName: 'Sarah Johnson',
        admissionDate: '2024-12-10',
        expectedDischargeDate: '2024-12-16',
        dischargeType: 'Routine',
        approvalStatus: 'Pending',
        pendingDepartment: 'Billing',
        finalizedBy: '',
        notes: 'Awaiting final bill generation',
      }),
      new DischargeWorkflow({
        id: 2,
        workflowId: 'DW-002',
        patientName: 'Michael Brown',
        admissionDate: '2024-12-12',
        expectedDischargeDate: '2024-12-17',
        dischargeType: 'Transfer',
        approvalStatus: 'In Progress',
        pendingDepartment: 'Nursing',
        finalizedBy: '',
        notes: 'Transferring to Rehab center',
      }),
      new DischargeWorkflow({
        id: 3,
        workflowId: 'DW-003',
        patientName: 'Emily Davis',
        admissionDate: '2024-12-05',
        expectedDischargeDate: '2024-12-15',
        dischargeType: 'Routine',
        approvalStatus: 'Approved',
        pendingDepartment: 'None',
        finalizedBy: 'Dr. Smith',
        notes: 'Ready for discharge',
      }),
      new DischargeWorkflow({
        id: 4,
        workflowId: 'DW-004',
        patientName: 'David Wilson',
        admissionDate: '2024-12-08',
        expectedDischargeDate: '2024-12-18',
        dischargeType: 'LAMA',
        approvalStatus: 'Pending',
        pendingDepartment: 'Medical',
        finalizedBy: '',
        notes: 'Patient requesting discharge against advice',
      }),
      new DischargeWorkflow({
        id: 5,
        workflowId: 'DW-005',
        patientName: 'Jessica Martinez',
        admissionDate: '2024-12-11',
        expectedDischargeDate: '2024-12-17',
        dischargeType: 'Routine',
        approvalStatus: 'Pending',
        pendingDepartment: 'Pharmacy',
        finalizedBy: '',
        notes: 'Medication reconciliation pending',
      }),
      new DischargeWorkflow({
        id: 6,
        workflowId: 'DW-006',
        patientName: 'James Anderson',
        admissionDate: '2024-12-01',
        expectedDischargeDate: '2024-12-19',
        dischargeType: 'Death',
        approvalStatus: 'In Progress',
        pendingDepartment: 'Medical Records',
        finalizedBy: '',
        notes: 'Death certificate processing',
      }),
      new DischargeWorkflow({
        id: 7,
        workflowId: 'DW-007',
        patientName: 'Linda Taylor',
        admissionDate: '2024-12-13',
        expectedDischargeDate: '2024-12-15',
        dischargeType: 'Routine',
        approvalStatus: 'Approved',
        pendingDepartment: 'None',
        finalizedBy: 'Dr. Thomas',
        notes: 'All clearances obtained',
      }),
      new DischargeWorkflow({
        id: 8,
        workflowId: 'DW-008',
        patientName: 'Robert Thomas',
        admissionDate: '2024-12-09',
        expectedDischargeDate: '2024-12-20',
        dischargeType: 'Transfer',
        approvalStatus: 'Pending',
        pendingDepartment: 'Insurance',
        finalizedBy: '',
        notes: 'Awaiting insurance approval for transfer',
      }),
      new DischargeWorkflow({
        id: 9,
        workflowId: 'DW-009',
        patientName: 'Patricia Jackson',
        admissionDate: '2024-12-14',
        expectedDischargeDate: '2024-12-16',
        dischargeType: 'Routine',
        approvalStatus: 'In Progress',
        pendingDepartment: 'Lab',
        finalizedBy: '',
        notes: 'Final lab results pending',
      }),
      new DischargeWorkflow({
        id: 10,
        workflowId: 'DW-010',
        patientName: 'Christopher White',
        admissionDate: '2024-12-02',
        expectedDischargeDate: '2024-12-21',
        dischargeType: 'Routine',
        approvalStatus: 'Pending',
        pendingDepartment: 'Physiotherapy',
        finalizedBy: '',
        notes: 'Physio clearance required',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addDischargeWorkflow(workflow: DischargeWorkflow): Observable<DischargeWorkflow> {
    this.dialogData = workflow;
    return of(workflow);
  }

  updateDischargeWorkflow(workflow: DischargeWorkflow): Observable<DischargeWorkflow> {
    this.dialogData = workflow;
    return of(workflow);
  }

  deleteDischargeWorkflow(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
