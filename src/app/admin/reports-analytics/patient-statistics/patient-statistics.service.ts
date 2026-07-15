import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PatientStatistic } from './patient-statistics.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class PatientStatisticsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<PatientStatistic[]> = new BehaviorSubject<PatientStatistic[]>([]);
  dialogData!: PatientStatistic;

  get data(): PatientStatistic[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllPatientStatistics(): Observable<PatientStatistic[]> {
    const mockData: PatientStatistic[] = [
      { id: 1, img: 'assets/images/user/user1.jpg', patientName: 'John Doe', age: 45, gender: 'Male', bloodGroup: 'B+', diagnosis: 'Hypertension', admissionDate: '2024-11-01', ward: 'Cardiology', status: 'Admitted', getRandomID: () => 0 },
      { id: 2, img: 'assets/images/user/user2.jpg', patientName: 'Jane Roe', age: 32, gender: 'Female', bloodGroup: 'A+', diagnosis: 'Fracture - Radius', admissionDate: '2024-11-03', ward: 'Orthopedics', status: 'Discharged', getRandomID: () => 0 },
      { id: 3, img: 'assets/images/user/user3.jpg', patientName: 'Michael Chen', age: 58, gender: 'Male', bloodGroup: 'O-', diagnosis: 'Chronic Migraine', admissionDate: '2024-11-05', ward: 'Neurology', status: 'Admitted', getRandomID: () => 0 },
      { id: 4, img: 'assets/images/user/user4.jpg', patientName: 'Alice Brown', age: 67, gender: 'Female', bloodGroup: 'AB+', diagnosis: 'Heart Failure', admissionDate: '2024-11-07', ward: 'Cardiology ICU', status: 'Critical', getRandomID: () => 0 },
      { id: 5, img: 'assets/images/user/user5.jpg', patientName: 'Robert Taylor', age: 52, gender: 'Male', bloodGroup: 'B-', diagnosis: 'Type 2 Diabetes', admissionDate: '2024-11-09', ward: 'Endocrinology', status: 'Admitted', getRandomID: () => 0 },
      { id: 6, img: 'assets/images/user/user6.jpg', patientName: 'Sarah Miller', age: 29, gender: 'Female', bloodGroup: 'A-', diagnosis: 'Pneumonia', admissionDate: '2024-11-11', ward: 'Pulmonology', status: 'Discharged', getRandomID: () => 0 },
      { id: 7, img: 'assets/images/user/user7.jpg', patientName: 'David Lee', age: 41, gender: 'Male', bloodGroup: 'O+', diagnosis: 'Malaria', admissionDate: '2024-11-13', ward: 'General Medicine', status: 'Admitted', getRandomID: () => 0 },
      { id: 8, img: 'assets/images/user/user8.jpg', patientName: 'Linda White', age: 73, gender: 'Female', bloodGroup: 'B+', diagnosis: 'Stroke', admissionDate: '2024-11-15', ward: 'Neurology ICU', status: 'Critical', getRandomID: () => 0 },
      { id: 9, img: 'assets/images/user/user9.jpg', patientName: 'James Green', age: 36, gender: 'Male', bloodGroup: 'AB-', diagnosis: 'Appendicitis', admissionDate: '2024-11-17', ward: 'Surgery', status: 'Discharged', getRandomID: () => 0 },
      { id: 10, img: 'assets/images/user/user10.jpg', patientName: 'Patricia Black', age: 61, gender: 'Female', bloodGroup: 'A+', diagnosis: 'Kidney Disease', admissionDate: '2024-11-19', ward: 'Nephrology', status: 'Admitted', getRandomID: () => 0 },
    ];
    return of(mockData);
  }

  addPatientStatistic(stat: PatientStatistic): Observable<PatientStatistic> {
    this.dialogData = stat;
    return of(stat);
  }

  updatePatientStatistic(stat: PatientStatistic): Observable<PatientStatistic> {
    this.dialogData = stat;
    return of(stat);
  }

  deletePatientStatistic(id: number): Observable<number> {
    return of(id);
  }
}
