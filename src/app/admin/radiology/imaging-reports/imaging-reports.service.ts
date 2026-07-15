import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ImagingReport } from './imaging-reports.model';

@Injectable({
  providedIn: 'root',
})
export class ImagingReportsService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<ImagingReport[]> = new BehaviorSubject<ImagingReport[]>([]);
  dialogData: ImagingReport | null = null;

  get data(): ImagingReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllImagingReports(): Observable<ImagingReport[]> {
    const mockData: ImagingReport[] = [
      new ImagingReport({
        id: 1,
        reportId: 'RPT-001',
        patientName: 'John Doe',
        scanType: 'Chest X-Ray',
        radiologistName: 'Dr. Smith',
        reportDate: '2023-12-01',
        findings: 'Clear lung fields.',
        status: 'Finalized',
        impression: 'Normal study',
        recommendations: '',
      }),
      new ImagingReport({
        id: 2,
        reportId: 'RPT-002',
        patientName: 'Jane Smith',
        scanType: 'MRI Brain',
        radiologistName: 'Dr. Jones',
        reportDate: '2023-12-02',
        findings: 'No acute intracranial abnormality.',
        status: 'Reviewed',
        impression: 'Normal',
        recommendations: '',
      }),
      new ImagingReport({
        id: 3,
        reportId: 'RPT-003',
        patientName: 'Mike Johnson',
        scanType: 'CT Abdomen',
        radiologistName: 'Dr. Brown',
        reportDate: '2023-12-03',
        findings: 'Appendix appears normal.',
        status: 'Draft',
        impression: 'Pending comparison',
        recommendations: '',
      }),
      new ImagingReport({
        id: 4,
        reportId: 'RPT-004',
        patientName: 'Sarah Davis',
        scanType: 'Ultrasound KUB',
        radiologistName: 'Dr. White',
        reportDate: '2023-12-04',
        findings: 'Mild hydronephrosis left kidney.',
        status: 'Finalized',
        impression: 'Left ureteric calculus suspected',
        recommendations: 'CT KUB recommended',
      }),
      new ImagingReport({
        id: 5,
        reportId: 'RPT-005',
        patientName: 'David Wilson',
        scanType: 'X-Ray Knee',
        radiologistName: 'Dr. Green',
        reportDate: '2023-12-05',
        findings: 'No fractures seen.',
        status: 'Reviewed',
        impression: 'Soft tissue swelling',
        recommendations: 'RICE therapy',
      }),
      new ImagingReport({
        id: 6,
        reportId: 'RPT-006',
        patientName: 'Emily Taylor',
        scanType: 'MRI Spine',
        radiologistName: 'Dr. Black',
        reportDate: '2023-12-06',
        findings: 'L4-L5 disc herniation.',
        status: 'Finalized',
        impression: 'Radiculopathy',
        recommendations: 'Physiotherapy',
      }),
      new ImagingReport({
        id: 7,
        reportId: 'RPT-007',
        patientName: 'Robert Martinez',
        scanType: 'CT Head',
        radiologistName: 'Dr. Lee',
        reportDate: '2023-12-07',
        findings: 'No acute hemorrhage.',
        status: 'Draft',
        impression: 'Pending review',
        recommendations: '',
      }),
      new ImagingReport({
        id: 8,
        reportId: 'RPT-008',
        patientName: 'Linda Anderson',
        scanType: 'Mammogram',
        radiologistName: 'Dr. Hall',
        reportDate: '2023-12-08',
        findings: 'BIRADS 1',
        status: 'Finalized',
        impression: 'Benign',
        recommendations: 'Routine screening',
      }),
      new ImagingReport({
        id: 9,
        reportId: 'RPT-009',
        patientName: 'William Thomas',
        scanType: 'X-Ray Shoulder',
        radiologistName: 'Dr. Young',
        reportDate: '2023-12-09',
        findings: 'AC joint status post separation.',
        status: 'Reviewed',
        impression: 'Healing well',
        recommendations: '',
      }),
      new ImagingReport({
        id: 10,
        reportId: 'RPT-010',
        patientName: 'Elizabeth Moore',
        scanType: 'Ultrasound Doppler',
        radiologistName: 'Dr. King',
        reportDate: '2023-12-10',
        findings: 'No DVT seen.',
        status: 'Finalized',
        impression: 'Normal venous flow',
        recommendations: '',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addImagingReport(report: ImagingReport): Observable<ImagingReport> {
    this.dialogData = report;
    return of(report);
  }

  updateImagingReport(report: ImagingReport): Observable<ImagingReport> {
    this.dialogData = report;
    return of(report);
  }

  deleteImagingReport(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
