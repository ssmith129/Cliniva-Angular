import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RadiologyReport } from './radiology-reports.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class RadiologyReportsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<RadiologyReport[]> = new BehaviorSubject<RadiologyReport[]>([]);
  dialogData!: RadiologyReport;

  get data(): RadiologyReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllRadiologyReports(): Observable<RadiologyReport[]> {
    const mockData: RadiologyReport[] = [
      { id: 1, img: 'assets/images/user/user1.jpg', patientName: 'John Doe', scanType: 'Chest X-Ray', modality: 'X-Ray', referredBy: 'Dr. Sarah Smith', reportDate: '2024-11-20', tat: '2 hrs', status: 'Reported', getRandomID: () => 0 },
      { id: 2, img: 'assets/images/user/user2.jpg', patientName: 'Jane Roe', scanType: 'Brain MRI', modality: 'MRI', referredBy: 'Dr. Mark Wilson', reportDate: '2024-11-21', tat: '6 hrs', status: 'Reported', getRandomID: () => 0 },
      { id: 3, img: 'assets/images/user/user3.jpg', patientName: 'Michael Chen', scanType: 'Abdominal CT Scan', modality: 'CT', referredBy: 'Dr. Emily Davis', reportDate: '2024-11-22', tat: '4 hrs', status: 'Pending', getRandomID: () => 0 },
      { id: 4, img: 'assets/images/user/user4.jpg', patientName: 'Alice Brown', scanType: 'Echocardiogram', modality: 'Ultrasound', referredBy: 'Dr. James White', reportDate: '2024-11-23', tat: '3 hrs', status: 'Reported', getRandomID: () => 0 },
      { id: 5, img: 'assets/images/user/user5.jpg', patientName: 'Robert Taylor', scanType: 'Spine MRI', modality: 'MRI', referredBy: 'Dr. Sarah Smith', reportDate: '2024-11-24', tat: '8 hrs', status: 'Pending', getRandomID: () => 0 },
      { id: 6, img: 'assets/images/user/user6.jpg', patientName: 'Sarah Miller', scanType: 'Mammography', modality: 'Mammography', referredBy: 'Dr. John Doe', reportDate: '2024-11-25', tat: '24 hrs', status: 'Reviewed', getRandomID: () => 0 },
      { id: 7, img: 'assets/images/user/user7.jpg', patientName: 'David Lee', scanType: 'Knee X-Ray', modality: 'X-Ray', referredBy: 'Dr. Emily Davis', reportDate: '2024-11-26', tat: '1 hr', status: 'Reported', getRandomID: () => 0 },
      { id: 8, img: 'assets/images/user/user8.jpg', patientName: 'Linda White', scanType: 'Thyroid Ultrasound', modality: 'Ultrasound', referredBy: 'Dr. Mark Wilson', reportDate: '2024-11-27', tat: '2 hrs', status: 'Reported', getRandomID: () => 0 },
      { id: 9, img: 'assets/images/user/user9.jpg', patientName: 'James Green', scanType: 'PET Scan', modality: 'PET', referredBy: 'Dr. Sarah Smith', reportDate: '2024-11-28', tat: '12 hrs', status: 'Pending', getRandomID: () => 0 },
      { id: 10, img: 'assets/images/user/user10.jpg', patientName: 'Patricia Black', scanType: 'Chest CT', modality: 'CT', referredBy: 'Dr. John Doe', reportDate: '2024-11-29', tat: '5 hrs', status: 'Reviewed', getRandomID: () => 0 },
    ];
    return of(mockData);
  }

  addRadiologyReport(report: RadiologyReport): Observable<RadiologyReport> {
    this.dialogData = report;
    return of(report);
  }

  updateRadiologyReport(report: RadiologyReport): Observable<RadiologyReport> {
    this.dialogData = report;
    return of(report);
  }

  deleteRadiologyReport(id: number): Observable<number> {
    return of(id);
  }
}
