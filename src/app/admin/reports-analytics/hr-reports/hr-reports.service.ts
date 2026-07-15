import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HrReport } from './hr-reports.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class HrReportsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<HrReport[]> = new BehaviorSubject<HrReport[]>([]);
  dialogData!: HrReport;

  get data(): HrReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllHrReports(): Observable<HrReport[]> {
    const mockData: HrReport[] = [
      { id: 1, img: 'assets/images/user/user1.jpg', employeeName: 'Dr. Sarah Smith', department: 'Cardiology', designation: 'Senior Cardiologist', presentDays: 22, absentDays: 2, salary: 12500, paymentStatus: 'Paid', month: '2024-11', getRandomID: () => 0 },
      { id: 2, img: 'assets/images/user/user2.jpg', employeeName: 'Dr. Mark Wilson', department: 'Neurology', designation: 'Neurologist', presentDays: 20, absentDays: 4, salary: 11000, paymentStatus: 'Paid', month: '2024-11', getRandomID: () => 0 },
      { id: 3, img: 'assets/images/user/user3.jpg', employeeName: 'Nurse Emily Clark', department: 'General Ward', designation: 'Head Nurse', presentDays: 24, absentDays: 0, salary: 4800, paymentStatus: 'Paid', month: '2024-11', getRandomID: () => 0 },
      { id: 4, img: 'assets/images/user/user4.jpg', employeeName: 'Dr. James White', department: 'Orthopedics', designation: 'Orthopedic Surgeon', presentDays: 21, absentDays: 3, salary: 13000, paymentStatus: 'Pending', month: '2024-11', getRandomID: () => 0 },
      { id: 5, img: 'assets/images/user/user5.jpg', employeeName: 'Dr. Emily Davis', department: 'Pediatrics', designation: 'Pediatrician', presentDays: 23, absentDays: 1, salary: 10500, paymentStatus: 'Paid', month: '2024-11', getRandomID: () => 0 },
      { id: 6, img: 'assets/images/user/user6.jpg', employeeName: 'Tech. Ravi Kumar', department: 'Laboratory', designation: 'Lab Technician', presentDays: 22, absentDays: 2, salary: 3600, paymentStatus: 'Pending', month: '2024-11', getRandomID: () => 0 },
      { id: 7, img: 'assets/images/user/user7.jpg', employeeName: 'Admin. Priya Sharma', department: 'Administration', designation: 'HR Manager', presentDays: 24, absentDays: 0, salary: 5200, paymentStatus: 'Paid', month: '2024-11', getRandomID: () => 0 },
      { id: 8, img: 'assets/images/user/user8.jpg', employeeName: 'Pharm. John Lee', department: 'Pharmacy', designation: 'Pharmacist', presentDays: 20, absentDays: 4, salary: 4500, paymentStatus: 'Paid', month: '2024-11', getRandomID: () => 0 },
      { id: 9, img: 'assets/images/user/user9.jpg', employeeName: 'Dr. Linda Green', department: 'Dermatology', designation: 'Dermatologist', presentDays: 19, absentDays: 5, salary: 9800, paymentStatus: 'Pending', month: '2024-11', getRandomID: () => 0 },
      { id: 10, img: 'assets/images/user/user10.jpg', employeeName: 'Nurse David Brown', department: 'ICU', designation: 'ICU Nurse', presentDays: 23, absentDays: 1, salary: 5500, paymentStatus: 'Paid', month: '2024-11', getRandomID: () => 0 },
    ];
    return of(mockData);
  }

  addHrReport(report: HrReport): Observable<HrReport> {
    this.dialogData = report;
    return of(report);
  }

  updateHrReport(report: HrReport): Observable<HrReport> {
    this.dialogData = report;
    return of(report);
  }

  deleteHrReport(id: number): Observable<number> {
    return of(id);
  }
}
