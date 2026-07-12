import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ComplianceDocument } from './compliance-documents.model';

@Injectable({
  providedIn: 'root',
})
export class ComplianceDocumentsService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<ComplianceDocument[]> = new BehaviorSubject<ComplianceDocument[]>([]);
  dialogData: ComplianceDocument | null = null;

  get data(): ComplianceDocument[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllComplianceDocuments(): Observable<ComplianceDocument[]> {
    const mockData: ComplianceDocument[] = [
      new ComplianceDocument({
        id: 1,
        document_id: 'DOC-001',
        document_name: 'Hospital Operating License',
        document_type: 'License',
        issuing_authority: 'State Health Department',
        issue_date: '2023-01-01',
        expiry_date: '2023-12-31',
        renewal_date: '2023-11-30',
        document_number: 'LIC/2023/123',
        status: 'Valid',
        responsible_person: 'Admin Manager',
        department: 'Administration',
        file_location: 'Cabinet A - Row 1',
        notes: 'Renew annually',
      }),
      new ComplianceDocument({
        id: 2,
        document_id: 'DOC-002',
        document_name: 'Fire Safety Certificate',
        document_type: 'Certification',
        issuing_authority: 'Fire Department',
        issue_date: '2023-03-15',
        expiry_date: '2024-03-14',
        renewal_date: '2024-02-14',
        document_number: 'FIRE/2023/456',
        status: 'Valid',
        responsible_person: 'Safety Officer',
        department: 'Safety Dept',
        file_location: 'Cabinet B - Row 2',
        notes: 'Annual inspection required',
      }),
      new ComplianceDocument({
        id: 3,
        document_id: 'DOC-003',
        document_name: 'NABH Accreditation',
        document_type: 'Accreditation',
        issuing_authority: 'NABH',
        issue_date: '2021-06-01',
        expiry_date: '2024-05-31',
        renewal_date: '2024-03-01',
        document_number: 'NABH/H-2021/001',
        status: 'Valid',
        responsible_person: 'Quality Manager',
        department: 'Quality Assurance',
        file_location: 'Director Office',
        notes: 'Full accreditation',
      }),
      new ComplianceDocument({
        id: 4,
        document_id: 'DOC-004',
        document_name: 'Pharmacy Liquid License',
        document_type: 'License',
        issuing_authority: 'Drug Control Department',
        issue_date: '2023-01-10',
        expiry_date: '2023-12-31',
        renewal_date: '2023-11-30',
        document_number: 'PH/LIC/2023/889',
        status: 'Expiring Soon',
        responsible_person: 'Chief Pharmacist',
        department: 'Pharmacy',
        file_location: 'Pharmacy Office',
        notes: 'Apply for renewal immediately',
      }),
      new ComplianceDocument({
        id: 5,
        document_id: 'DOC-005',
        document_name: 'Bio-Medical Waste Authorization',
        document_type: 'Regulatory Approval',
        issuing_authority: 'Pollution Control Board',
        issue_date: '2022-04-01',
        expiry_date: '2023-10-31',
        renewal_date: '2023-09-30',
        document_number: 'PCB/BMW/22/05',
        status: 'Expired',
        responsible_person: 'Facility Manager',
        department: 'Administration',
        file_location: 'Cabinet C',
        notes: 'Renewal application submitted',
      }),
      new ComplianceDocument({
        id: 6,
        document_id: 'DOC-006',
        document_name: 'Radiology Equipment License',
        document_type: 'License',
        issuing_authority: 'AERB',
        issue_date: '2023-01-01',
        expiry_date: '2027-12-31',
        renewal_date: '2027-11-30',
        document_number: 'AERB/RAD/23/99',
        status: 'Valid',
        responsible_person: 'Radiology Head',
        department: 'Radiology',
        file_location: 'Radiology Dept',
        notes: '5 year validity',
      }),
      new ComplianceDocument({
        id: 7,
        document_id: 'DOC-007',
        document_name: 'Staff Health Insurance Policy',
        document_type: 'Insurance',
        issuing_authority: 'ABC Insurance Co.',
        issue_date: '2023-04-01',
        expiry_date: '2024-03-31',
        renewal_date: '2024-02-28',
        document_number: 'INS/GRP/23/100',
        status: 'Valid',
        responsible_person: 'HR Manager',
        department: 'Human Resources',
        file_location: 'HR Office',
        notes: 'Group policy for all employees',
      }),
      new ComplianceDocument({
        id: 8,
        document_id: 'DOC-008',
        document_name: 'Infection Control SOP',
        document_type: 'SOP',
        issuing_authority: 'Internal Quality Team',
        issue_date: '2023-01-01',
        expiry_date: '2024-01-01',
        renewal_date: '2023-12-01',
        document_number: 'SOP/IC/2023/V1',
        status: 'Expiring Soon',
        responsible_person: 'Infection Control Officer',
        department: 'Nursing',
        file_location: 'Quality Dept',
        notes: 'Currently under review',
      }),
      new ComplianceDocument({
        id: 9,
        document_id: 'DOC-009',
        document_name: 'Building Safety Audit Report',
        document_type: 'Certification',
        issuing_authority: 'Structural Engineers Assoc',
        issue_date: '2023-06-01',
        expiry_date: '2024-05-31',
        renewal_date: '2024-04-30',
        document_number: 'STR/SAFE/23/009',
        status: 'Valid',
        responsible_person: 'Facility Manager',
        department: 'Maintenance',
        file_location: 'Facility Office',
        notes: 'Structural stability certified',
      }),
      new ComplianceDocument({
        id: 10,
        document_id: 'DOC-010',
        document_name: 'Blood Bank License',
        document_type: 'License',
        issuing_authority: 'Drug Control Department',
        issue_date: '2023-02-15',
        expiry_date: '2023-11-15',
        renewal_date: '2023-10-15',
        document_number: 'BB/LIC/23/77',
        status: 'Under Review',
        responsible_person: 'Pathologist',
        department: 'Laboratory',
        file_location: 'Lab Office',
        notes: 'Inspection pending',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addComplianceDocument(doc: ComplianceDocument): Observable<ComplianceDocument> {
    this.dialogData = doc;
    return of(doc);
  }

  updateComplianceDocument(doc: ComplianceDocument): Observable<ComplianceDocument> {
    this.dialogData = doc;
    return of(doc);
  }

  deleteComplianceDocument(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
