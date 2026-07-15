import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prescription } from './prescriptions.model';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionsService {
  private data: Prescription[] = [
    {
      id: 1,
      prescriptionId: 'RX-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      prescriptionDate: '2023-10-25',
      medications: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      duration: '7 days',
      doctor: 'Dr. Sarah Wilson',
      status: 'Active',
    },
    {
      id: 2,
      prescriptionId: 'RX-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      prescriptionDate: '2023-10-26',
      medications: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      duration: '5 days',
      doctor: 'Dr. John Deo',
      status: 'Completed',
    },
    {
      id: 3,
      prescriptionId: 'RX-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      prescriptionDate: '2023-10-27',
      medications: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      doctor: 'Dr. Sarah Wilson',
      status: 'Active',
    },
    {
      id: 4,
      prescriptionId: 'RX-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      prescriptionDate: '2023-10-28',
      medications: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '90 days',
      doctor: 'Dr. John Deo',
      status: 'Active',
    },
    {
      id: 5,
      prescriptionId: 'RX-005',
      patientName: 'Chris Lee',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      prescriptionDate: '2023-10-29',
      medications: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once nightly',
      duration: '30 days',
      doctor: 'Dr. Sarah Wilson',
      status: 'Active',
    },
    {
      id: 6,
      prescriptionId: 'RX-006',
      patientName: 'Anna Brown',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      prescriptionDate: '2023-10-30',
      medications: 'Albuterol inhaler',
      dosage: '90mcg',
      frequency: 'Every 4-6 hours as needed',
      duration: '30 days',
      doctor: 'Dr. John Deo',
      status: 'Active',
    },
    {
      id: 7,
      prescriptionId: 'RX-007',
      patientName: 'David Wilson',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      prescriptionDate: '2023-10-31',
      medications: 'Levothyroxine',
      dosage: '50mcg',
      frequency: 'Once daily',
      duration: '60 days',
      doctor: 'Dr. Sarah Wilson',
      status: 'Active',
    },
    {
      id: 8,
      prescriptionId: 'RX-008',
      patientName: 'Laura White',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      prescriptionDate: '2023-11-01',
      medications: 'Omeprazole',
      dosage: '20mg',
      frequency: 'Once daily',
      duration: '14 days',
      doctor: 'Dr. John Deo',
      status: 'Completed',
    },
    {
      id: 9,
      prescriptionId: 'RX-009',
      patientName: 'James Miller',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      prescriptionDate: '2023-11-02',
      medications: 'Sertraline',
      dosage: '50mg',
      frequency: 'Once daily',
      duration: '30 days',
      doctor: 'Dr. Sarah Wilson',
      status: 'Active',
    },
    {
      id: 10,
      prescriptionId: 'RX-010',
      patientName: 'Sophia Taylor',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      prescriptionDate: '2023-11-03',
      medications: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      duration: '30 days',
      doctor: 'Dr. John Deo',
      status: 'Active',
    },
    {
      id: 11,
      prescriptionId: 'RX-011',
      patientName: 'Lucas Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      prescriptionDate: '2023-11-04',
      medications: 'Gabapentin',
      dosage: '300mg',
      frequency: '3 times daily',
      duration: '30 days',
      doctor: 'Dr. Sarah Wilson',
      status: 'Active',
    },
    {
      id: 12,
      prescriptionId: 'RX-012',
      patientName: 'Isabella Rodriguez',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-012',
      prescriptionDate: '2023-11-05',
      medications: 'Azithromycin',
      dosage: '250mg',
      frequency: 'Once daily',
      duration: '5 days',
      doctor: 'Dr. John Deo',
      status: 'Completed',
    },
  ];

  private dataSubject = new BehaviorSubject<Prescription[]>(this.data);

  constructor() {}

  getAllPrescriptions(): Observable<Prescription[]> {
    return this.dataSubject.asObservable();
  }

  addPrescription(prescription: Prescription): void {
    prescription.id = this.data.length + 1;
    this.data.unshift(prescription);
    this.dataSubject.next(this.data);
  }

  updatePrescription(prescription: Prescription): void {
    const index = this.data.findIndex((d) => d.id === prescription.id);
    if (index !== -1) {
      this.data[index] = prescription;
      this.dataSubject.next(this.data);
    }
  }

  deletePrescription(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
