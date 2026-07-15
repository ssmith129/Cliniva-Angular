import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LabReport } from './lab-reports.model';

@Injectable({
  providedIn: 'root'
})
export class LabReportsService {
  private data: LabReport[] = [
    { id: 1, reportId: 'LAB001', testName: 'Complete Blood Count', testType: 'Hematology', requestDate: '2023-11-01', reportDate: '2023-11-02', status: 'Final', priority: 'Routine', doctorName: 'Dr. Sarah Wilson', labName: 'City Central Lab', results: 'Normal' },
    { id: 2, reportId: 'LAB002', testName: 'Lipid Profile', testType: 'Biochemistry', requestDate: '2023-11-05', reportDate: '2023-11-06', status: 'Final', priority: 'Routine', doctorName: 'Dr. John Doe', labName: 'Modern Diagnostics', results: 'High Cholesterol' },
    { id: 3, reportId: 'LAB003', testName: 'Thyroid Profile', testType: 'Endocrinology', requestDate: '2023-12-10', reportDate: '2023-12-11', status: 'Final', priority: 'Urgent', doctorName: 'Dr. Emily Brown', labName: 'Quick Results Lab', results: 'Normal' },
    { id: 4, reportId: 'LAB004', testName: 'PCR Test', testType: 'Microbiology', requestDate: '2024-01-05', status: 'Pending', priority: 'Urgent', doctorName: 'Dr. Michael Smith', labName: 'City Central Lab' },
    { id: 5, reportId: 'LAB005', testName: 'Urine Analysis', testType: 'Clinical Pathology', requestDate: '2024-01-15', reportDate: '2024-01-16', status: 'Final', priority: 'Routine', doctorName: 'Dr. Sarah Wilson', labName: 'City Central Lab', results: 'Normal' },
    { id: 6, reportId: 'LAB006', testName: 'Blood Glucose Test', testType: 'Biochemistry', requestDate: '2024-02-01', reportDate: '2024-02-02', status: 'Final', priority: 'Urgent', doctorName: 'Dr. John Doe', labName: 'Modern Diagnostics', results: 'Normal' },
    { id: 7, reportId: 'LAB007', testName: 'Vitamin D Test', testType: 'Biochemistry', requestDate: '2024-02-10', reportDate: '2024-02-12', status: 'Final', priority: 'Routine', doctorName: 'Dr. Emily Brown', labName: 'Quick Results Lab', results: 'Low' },
    { id: 8, reportId: 'LAB008', testName: 'Liver Function Test', testType: 'Biochemistry', requestDate: '2024-02-15', reportDate: '2024-02-16', status: 'Final', priority: 'Routine', doctorName: 'Dr. Michael Smith', labName: 'City Central Lab', results: 'Normal' },
    { id: 9, reportId: 'LAB009', testName: 'Kidney Function Test', testType: 'Biochemistry', requestDate: '2024-02-20', reportDate: '2024-02-21', status: 'Final', priority: 'Routine', doctorName: 'Dr. Sarah Wilson', labName: 'City Central Lab', results: 'Normal' },
    { id: 10, reportId: 'LAB010', testName: 'Chest X-Ray', testType: 'Radiology', requestDate: '2024-03-01', reportDate: '2024-03-02', status: 'Final', priority: 'Urgent', doctorName: 'Dr. John Doe', labName: 'Modern Diagnostics', results: 'Clear' },
    { id: 11, reportId: 'LAB011', testName: 'ECG', testType: 'Cardiology', requestDate: '2024-03-10', reportDate: '2024-03-10', status: 'Final', priority: 'Urgent', doctorName: 'Dr. Emily Brown', labName: 'Quick Results Lab', results: 'Normal' },
    { id: 12, reportId: 'LAB012', testName: 'Stool Test', testType: 'Clinical Pathology', requestDate: '2024-03-15', status: 'Pending', priority: 'Routine', doctorName: 'Dr. Michael Smith', labName: 'City Central Lab' },
  ];

  private dataSubject = new BehaviorSubject<LabReport[]>(this.data);

  constructor() { }

  getAllLabReports(): Observable<LabReport[]> {
    return this.dataSubject.asObservable();
  }

  addLabReport(report: LabReport): void {
    report.id = this.data.length + 1;
    this.data.unshift(report);
    this.dataSubject.next(this.data);
  }

  updateLabReport(report: LabReport): void {
    const index = this.data.findIndex(r => r.id === report.id);
    if (index !== -1) {
      this.data[index] = report;
      this.dataSubject.next(this.data);
    }
  }

  deleteLabReport(id: number): void {
    const index = this.data.findIndex(r => r.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
