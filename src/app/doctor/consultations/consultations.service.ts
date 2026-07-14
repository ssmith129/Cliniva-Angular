import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Consultation } from './consultations.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultationsService {
  private data: Consultation[] = [
    {
      id: 1,
      consultationId: 'CONST-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      consultationDate: '2023-10-25',
      consultationTime: '10:00 AM',
      chiefComplaint: 'Headache and fever',
      diagnosis: 'Viral Infection',
      doctor: 'Dr. Sarah Wilson',
      status: 'Completed',
    },
    {
      id: 2,
      consultationId: 'CONST-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      consultationDate: '2023-10-26',
      consultationTime: '11:00 AM',
      chiefComplaint: 'Back pain',
      diagnosis: 'Muscle Strain',
      doctor: 'Dr. John Deo',
      status: 'In Progress',
    },
    {
      id: 3,
      consultationId: 'CONST-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      consultationDate: '2023-10-27',
      consultationTime: '12:00 PM',
      chiefComplaint: 'Stomach ache',
      diagnosis: 'Gastritis',
      doctor: 'Dr. Sarah Wilson',
      status: 'Scheduled',
    },
    {
      id: 4,
      consultationId: 'CONST-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      consultationDate: '2023-10-28',
      consultationTime: '09:30 AM',
      chiefComplaint: 'Sore throat',
      diagnosis: 'Tonsillitis',
      doctor: 'Dr. Sarah Wilson',
      status: 'Completed',
    },
    {
      id: 5,
      consultationId: 'CONST-005',
      patientName: 'Chris Lee',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      consultationDate: '2023-10-29',
      consultationTime: '01:00 PM',
      chiefComplaint: 'Joint pain',
      diagnosis: 'Arthritis',
      doctor: 'Dr. John Deo',
      status: 'In Progress',
    },
    {
      id: 6,
      consultationId: 'CONST-006',
      patientName: 'Anna Brown',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      consultationDate: '2023-10-30',
      consultationTime: '10:30 AM',
      chiefComplaint: 'Skin rash',
      diagnosis: 'Dermatitis',
      doctor: 'Dr. Sarah Wilson',
      status: 'Scheduled',
    },
    {
      id: 7,
      consultationId: 'CONST-007',
      patientName: 'David Wilson',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      consultationDate: '2023-10-31',
      consultationTime: '11:30 AM',
      chiefComplaint: 'Cough and cold',
      diagnosis: 'Common Cold',
      doctor: 'Dr. John Deo',
      status: 'Completed',
    },
    {
      id: 8,
      consultationId: 'CONST-008',
      patientName: 'Laura White',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      consultationDate: '2023-11-01',
      consultationTime: '02:30 PM',
      chiefComplaint: 'Dizziness',
      diagnosis: 'Vertigo',
      doctor: 'Dr. Sarah Wilson',
      status: 'In Progress',
    },
    {
      id: 9,
      consultationId: 'CONST-009',
      patientName: 'James Miller',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      consultationDate: '2023-11-02',
      consultationTime: '03:30 PM',
      chiefComplaint: 'Chest pain',
      diagnosis: 'Angina',
      doctor: 'Dr. John Deo',
      status: 'Scheduled',
    },
    {
      id: 10,
      consultationId: 'CONST-010',
      patientName: 'Sophia Taylor',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      consultationDate: '2023-11-03',
      consultationTime: '09:00 AM',
      chiefComplaint: 'Fatigue',
      diagnosis: 'Anemia',
      doctor: 'Dr. Sarah Wilson',
      status: 'Completed',
    },
    {
      id: 11,
      consultationId: 'CONST-011',
      patientName: 'Lucas Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      consultationDate: '2023-11-04',
      consultationTime: '11:00 AM',
      chiefComplaint: 'Allergy',
      diagnosis: 'Hay Fever',
      doctor: 'Dr. John Deo',
      status: 'In Progress',
    },
    {
      id: 12,
      consultationId: 'CONST-012',
      patientName: 'Isabella Rodriguez',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-012',
      consultationDate: '2023-11-05',
      consultationTime: '04:00 PM',
      chiefComplaint: 'Migraine',
      diagnosis: 'Migraine',
      doctor: 'Dr. Sarah Wilson',
      status: 'Scheduled',
    },
  ];

  private dataSubject = new BehaviorSubject<Consultation[]>(this.data);

  constructor() {}

  getAllConsultations(): Observable<Consultation[]> {
    return this.dataSubject.asObservable();
  }

  addConsultation(consultation: Consultation): void {
    consultation.id = this.data.length + 1;
    this.data.unshift(consultation);
    this.dataSubject.next(this.data);
  }

  updateConsultation(consultation: Consultation): void {
    const index = this.data.findIndex((d) => d.id === consultation.id);
    if (index !== -1) {
      this.data[index] = consultation;
      this.dataSubject.next(this.data);
    }
  }

  deleteConsultation(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
