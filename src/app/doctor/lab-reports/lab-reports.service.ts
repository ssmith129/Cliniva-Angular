import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LabReport } from './lab-reports.model';

@Injectable({
  providedIn: 'root',
})
export class LabReportsService {
  private data: LabReport[] = [
    {
      id: 1,
      reportId: 'REP-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      testName: 'Complete Blood Count (CBC)',
      testType: 'Hematology',
      requestDate: '2023-10-25',
      reportDate: '2023-10-26',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Completed',
      priority: 'Routine',
    },
    {
      id: 2,
      reportId: 'REP-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      testName: 'Chest X-Ray',
      testType: 'Radiology',
      requestDate: '2023-10-26',
      requestedBy: 'Dr. John Deo',
      status: 'Pending',
      priority: 'Urgent',
    },
    {
      id: 3,
      reportId: 'REP-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      testName: 'Lipid Profile',
      testType: 'Biochemistry',
      requestDate: '2023-10-27',
      reportDate: '2023-10-28',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Critical',
      priority: 'STAT',
    },
    {
      id: 4,
      reportId: 'REP-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      testName: 'Urinalysis',
      testType: 'Clinical Pathology',
      requestDate: '2023-10-28',
      reportDate: '2023-10-29',
      requestedBy: 'Dr. John Deo',
      status: 'Completed',
      priority: 'Routine',
    },
    {
      id: 5,
      reportId: 'REP-005',
      patientName: 'Chris Lee',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      testName: 'Liver Function Test (LFT)',
      testType: 'Biochemistry',
      requestDate: '2023-10-29',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Pending',
      priority: 'Routine',
    },
    {
      id: 6,
      reportId: 'REP-006',
      patientName: 'Anna Brown',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      testName: 'MRI Brain',
      testType: 'Radiology',
      requestDate: '2023-10-30',
      reportDate: '2023-10-31',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Completed',
      priority: 'Urgent',
    },
    {
      id: 7,
      reportId: 'REP-007',
      patientName: 'David Wilson',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      testName: 'Blood Sugar (Fasting)',
      testType: 'Biochemistry',
      requestDate: '2023-10-31',
      requestedBy: 'Dr. John Deo',
      status: 'Critical',
      priority: 'STAT',
    },
    {
      id: 8,
      reportId: 'REP-008',
      patientName: 'Laura White',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      testName: 'ECG',
      testType: 'Cardiology',
      requestDate: '2023-11-01',
      reportDate: '2023-11-01',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Completed',
      priority: 'Routine',
    },
    {
      id: 9,
      reportId: 'REP-009',
      patientName: 'James Miller',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      testName: 'Thyroid Profile (T3, T4, TSH)',
      testType: 'Endocrinology',
      requestDate: '2023-11-02',
      requestedBy: 'Dr. John Deo',
      status: 'Pending',
      priority: 'Routine',
    },
    {
      id: 10,
      reportId: 'REP-010',
      patientName: 'Sophia Taylor',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      testName: 'Bone Density Scan',
      testType: 'Radiology',
      requestDate: '2023-11-03',
      reportDate: '2023-11-04',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Completed',
      priority: 'Routine',
    },
    {
      id: 11,
      reportId: 'REP-011',
      patientName: 'Lucas Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      testName: 'Covid-19 PCR Test',
      testType: 'Microbiology',
      requestDate: '2023-11-04',
      requestedBy: 'Dr. John Deo',
      status: 'Pending',
      priority: 'Urgent',
    },
    {
      id: 12,
      reportId: 'REP-012',
      patientName: 'Isabella Rodriguez',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-012',
      testName: 'Kidney Function Test (KFT)',
      testType: 'Biochemistry',
      requestDate: '2023-11-05',
      reportDate: '2023-11-06',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Completed',
      priority: 'Routine',
    },
  ];

  private dataSubject = new BehaviorSubject<LabReport[]>(this.data);

  constructor() {}

  getAllLabReports(): Observable<LabReport[]> {
    return this.dataSubject.asObservable();
  }

  addLabReport(report: LabReport): void {
    report.id = this.data.length + 1;
    this.data.unshift(report);
    this.dataSubject.next(this.data);
  }

  updateLabReport(report: LabReport): void {
    const index = this.data.findIndex((d) => d.id === report.id);
    if (index !== -1) {
      this.data[index] = report;
      this.dataSubject.next(this.data);
    }
  }

  deleteLabReport(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
