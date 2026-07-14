import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LabAnalyticsReport } from './lab-reports.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class LabAnalyticsReportsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<LabAnalyticsReport[]> = new BehaviorSubject<LabAnalyticsReport[]>([]);
  dialogData!: LabAnalyticsReport;

  get data(): LabAnalyticsReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllLabReports(): Observable<LabAnalyticsReport[]> {
    const mockData: LabAnalyticsReport[] = [
      { id: 1, img: 'assets/images/user/user1.jpg', patientName: 'John Doe', testName: 'Complete Blood Count', testCategory: 'Hematology', requestedBy: 'Dr. Sarah Smith', sampleDate: '2024-11-20', tat: '4 hrs', status: 'Completed', getRandomID: () => 0 },
      { id: 2, img: 'assets/images/user/user2.jpg', patientName: 'Jane Roe', testName: 'Lipid Profile', testCategory: 'Biochemistry', requestedBy: 'Dr. Mark Wilson', sampleDate: '2024-11-21', tat: '6 hrs', status: 'Completed', getRandomID: () => 0 },
      { id: 3, img: 'assets/images/user/user3.jpg', patientName: 'Michael Chen', testName: 'Blood Culture', testCategory: 'Microbiology', requestedBy: 'Dr. Emily Davis', sampleDate: '2024-11-22', tat: '48 hrs', status: 'Pending', getRandomID: () => 0 },
      { id: 4, img: 'assets/images/user/user4.jpg', patientName: 'Alice Brown', testName: 'Thyroid Function Test', testCategory: 'Endocrinology', requestedBy: 'Dr. James White', sampleDate: '2024-11-23', tat: '8 hrs', status: 'Completed', getRandomID: () => 0 },
      { id: 5, img: 'assets/images/user/user5.jpg', patientName: 'Robert Taylor', testName: 'HbA1c', testCategory: 'Diabetes', requestedBy: 'Dr. Sarah Smith', sampleDate: '2024-11-24', tat: '6 hrs', status: 'Completed', getRandomID: () => 0 },
      { id: 6, img: 'assets/images/user/user6.jpg', patientName: 'Sarah Miller', testName: 'Urine Culture', testCategory: 'Microbiology', requestedBy: 'Dr. John Doe', sampleDate: '2024-11-25', tat: '24 hrs', status: 'Pending', getRandomID: () => 0 },
      { id: 7, img: 'assets/images/user/user7.jpg', patientName: 'David Lee', testName: 'Liver Function Test', testCategory: 'Biochemistry', requestedBy: 'Dr. Emily Davis', sampleDate: '2024-11-26', tat: '5 hrs', status: 'Completed', getRandomID: () => 0 },
      { id: 8, img: 'assets/images/user/user8.jpg', patientName: 'Linda White', testName: 'Malaria Antigen', testCategory: 'Serology', requestedBy: 'Dr. Mark Wilson', sampleDate: '2024-11-27', tat: '2 hrs', status: 'Completed', getRandomID: () => 0 },
      { id: 9, img: 'assets/images/user/user9.jpg', patientName: 'James Green', testName: 'COVID-19 RT-PCR', testCategory: 'Molecular', requestedBy: 'Dr. Sarah Smith', sampleDate: '2024-11-28', tat: '12 hrs', status: 'Pending', getRandomID: () => 0 },
      { id: 10, img: 'assets/images/user/user10.jpg', patientName: 'Patricia Black', testName: 'Dengue NS1 Antigen', testCategory: 'Serology', requestedBy: 'Dr. John Doe', sampleDate: '2024-11-29', tat: '3 hrs', status: 'Completed', getRandomID: () => 0 },
    ];
    return of(mockData);
  }

  addLabReport(report: LabAnalyticsReport): Observable<LabAnalyticsReport> {
    this.dialogData = report;
    return of(report);
  }

  updateLabReport(report: LabAnalyticsReport): Observable<LabAnalyticsReport> {
    this.dialogData = report;
    return of(report);
  }

  deleteLabReport(id: number): Observable<number> {
    return of(id);
  }
}
