import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClinicalReport } from './clinical-reports.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ClinicalReportsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/clinical-reports.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<ClinicalReport[]> = new BehaviorSubject<ClinicalReport[]>([]);
  dialogData!: ClinicalReport;

  get data(): ClinicalReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllClinicalReports(): Observable<ClinicalReport[]> {
    const mockData: ClinicalReport[] = [
      {
        id: 1,
        img: 'assets/images/user/user1.jpg',
        patientName: 'John Doe',
        doctorName: 'Dr. Sarah Smith',
        diagnosis: 'Hypertension',
        visitDate: '2024-11-20',
        status: 'Under Treatment',
        getRandomID: () => 0
      },
      {
        id: 2,
        img: 'assets/images/user/user2.jpg',
        patientName: 'Jane Roe',
        doctorName: 'Dr. Mark Wilson',
        diagnosis: 'Fracture',
        visitDate: '2024-11-22',
        status: 'Recovered',
        getRandomID: () => 0
      },
      {
        id: 3,
        img: 'assets/images/user/user3.jpg',
        patientName: 'Michael Chen',
        doctorName: 'Dr. Emily Davis',
        diagnosis: 'Migraine',
        visitDate: '2024-11-25',
        status: 'Under Treatment',
        getRandomID: () => 0
      },
      {
        id: 4,
        img: 'assets/images/user/user4.jpg',
        patientName: 'Alice Brown',
        doctorName: 'Dr. James White',
        diagnosis: 'Viral Fever',
        visitDate: '2024-11-26',
        status: 'Critical',
        getRandomID: () => 0
      },
      {
        id: 5,
        img: 'assets/images/user/user5.jpg',
        patientName: 'Robert Taylor',
        doctorName: 'Dr. Sarah Smith',
        diagnosis: 'Diabetes',
        visitDate: '2024-11-18',
        status: 'Under Treatment',
        getRandomID: () => 0
      },
      {
        id: 6,
        img: 'assets/images/user/user6.jpg',
        patientName: 'Sarah Miller',
        doctorName: 'Dr. John Doe',
        diagnosis: 'Flu',
        visitDate: '2024-11-15',
        status: 'Recovered',
        getRandomID: () => 0
      },
      {
        id: 7,
        img: 'assets/images/user/user7.jpg',
        patientName: 'David Lee',
        doctorName: 'Dr. Emily Davis',
        diagnosis: 'Malaria',
        visitDate: '2024-11-12',
        status: 'Critical',
        getRandomID: () => 0
      },
      {
        id: 8,
        img: 'assets/images/user/user8.jpg',
        patientName: 'Linda White',
        doctorName: 'Dr. Mark Wilson',
        diagnosis: 'Typhoid',
        visitDate: '2024-11-10',
        status: 'Recovered',
        getRandomID: () => 0
      },
      {
        id: 9,
        img: 'assets/images/user/user9.jpg',
        patientName: 'James Green',
        doctorName: 'Dr. Sarah Smith',
        diagnosis: 'Dengue',
        visitDate: '2024-11-08',
        status: 'Under Treatment',
        getRandomID: () => 0
      },
      {
        id: 10,
        img: 'assets/images/user/user10.jpg',
        patientName: 'Patricia Black',
        doctorName: 'Dr. John Doe',
        diagnosis: 'Covid-19',
        visitDate: '2024-11-05',
        status: 'Critical',
        getRandomID: () => 0
      }
    ];
    return of(mockData);
  }

  addClinicalReport(clinicalReport: ClinicalReport): Observable<ClinicalReport> {
    this.dialogData = clinicalReport;
    return of(clinicalReport);
  }

  updateClinicalReport(clinicalReport: ClinicalReport): Observable<ClinicalReport> {
    this.dialogData = clinicalReport;
    return of(clinicalReport);
  }

  deleteClinicalReport(id: number): Observable<number> {
    return of(id);
  }
}
