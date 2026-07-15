import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ConsentTemplate } from './consent-templates.model';

@Injectable({
  providedIn: 'root',
})
export class ConsentTemplatesService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/consent-templates.json';
  dataChange: BehaviorSubject<ConsentTemplate[]> = new BehaviorSubject<ConsentTemplate[]>([]);
  dialogData: ConsentTemplate | null = null;

  get data(): ConsentTemplate[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllTemplates(): Observable<ConsentTemplate[]> {
    const mockData: ConsentTemplate[] = [
      new ConsentTemplate({
        id: 1,
        template_id: 'TMP-001',
        template_name: 'General Surgery Consent',
        category: 'Surgery Consent',
        department: 'General Surgery',
        version: '1.0',
        created_date: '2024-01-01',
        created_by: 'Admin',
        status: 'Active',
        template_content: 'Standard surgery consent content...',
      }),
      new ConsentTemplate({
        id: 2,
        template_id: 'TMP-002',
        template_name: 'Anesthesia Consent Form',
        category: 'Anesthesia Consent',
        department: 'All Departments',
        version: '2.1',
        created_date: '2024-02-15',
        created_by: 'Dr. John',
        status: 'Active',
        template_content: 'Anesthesia risks and benefits...',
      }),
      new ConsentTemplate({
        id: 3,
        template_id: 'TMP-003',
        template_name: 'MRI Contrast Consent',
        category: 'Treatment Consent',
        department: 'Radiology',
        version: '1.2',
        created_date: '2024-03-10',
        created_by: 'Admin',
        status: 'Active',
        template_content: 'Consent for MRI with contrast dye...',
      }),
      new ConsentTemplate({
        id: 4,
        template_id: 'TMP-004',
        template_name: 'Blood Transfusion Consent',
        category: 'Blood Transfusion',
        department: 'All Departments',
        version: '1.0',
        created_date: '2024-01-20',
        created_by: 'Dr. Smith',
        status: 'Active',
        template_content: 'Blood product administration consent...',
      }),
      new ConsentTemplate({
        id: 5,
        template_id: 'TMP-005',
        template_name: 'Discharge Against Medical Advice',
        category: 'Discharge AMA',
        department: 'All Departments',
        version: '1.0',
        created_date: '2024-04-05',
        created_by: 'Legal Dept',
        status: 'Active',
        template_content: 'Patient leaves hospital against advice...',
      }),
      new ConsentTemplate({
        id: 6,
        template_id: 'TMP-006',
        template_name: 'Clinical Trial Participation',
        category: 'Research Participation',
        department: 'Oncology',
        version: '3.0',
        created_date: '2024-05-12',
        created_by: 'Dr. Research',
        status: 'Draft',
        template_content: 'Informed consent for clinical trial...',
      }),
      new ConsentTemplate({
        id: 7,
        template_id: 'TMP-007',
        template_name: 'Medical Photography Consent',
        category: 'Photography',
        department: 'Dermatology',
        version: '1.1',
        created_date: '2024-06-20',
        created_by: 'Admin',
        status: 'Active',
        template_content: 'Consent to take medical photos...',
      }),
      new ConsentTemplate({
        id: 8,
        template_id: 'TMP-008',
        template_name: 'Chemotherapy Consent',
        category: 'Treatment Consent',
        department: 'Oncology',
        version: '2.0',
        created_date: '2024-02-28',
        created_by: 'Dr. Chemo',
        status: 'Archived',
        template_content: 'Old chemotherapy consent form...',
      }),
      new ConsentTemplate({
        id: 9,
        template_id: 'TMP-009',
        template_name: 'Cardiac Catheterization',
        category: 'Surgery Consent',
        department: 'Cardiology',
        version: '1.5',
        created_date: '2024-07-15',
        created_by: 'Dr. Heart',
        status: 'Active',
        template_content: 'Cath lab procedure consent...',
      }),
      new ConsentTemplate({
        id: 10,
        template_id: 'TMP-010',
        template_name: 'General Hospital Admission',
        category: 'General Consent',
        department: 'All Departments',
        version: '4.0',
        created_date: '2024-01-01',
        created_by: 'Admin',
        status: 'Active',
        template_content: 'General admission terms and conditions...',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addConsentTemplate(consentTemplate: ConsentTemplate): Observable<ConsentTemplate> {
    this.dialogData = consentTemplate;
    return of(consentTemplate);
  }

  updateConsentTemplate(consentTemplate: ConsentTemplate): Observable<ConsentTemplate> {
    this.dialogData = consentTemplate;
    return of(consentTemplate);
  }

  deleteConsentTemplate(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
