import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Certificate } from './certificates.model';

@Injectable({
  providedIn: 'root',
})
export class CertificatesService {
  private data: Certificate[] = [
    {
      id: 1,
      certificateId: 'CERT-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      certificateType: 'Medical Fitness',
      issueDate: '2023-10-25',
      validUntil: '2024-10-25',
      purpose: 'Job Application',
      issuedBy: 'Dr. Sarah Wilson',
      status: 'Issued',
    },
    {
      id: 2,
      certificateId: 'CERT-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      certificateType: 'Sick Leave',
      issueDate: '2023-10-26',
      validUntil: '2023-10-30',
      purpose: 'Viral Fever',
      issuedBy: 'Dr. John Deo',
      status: 'Pending',
    },
    {
      id: 3,
      certificateId: 'CERT-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      certificateType: 'Vaccination',
      issueDate: '2023-10-27',
      purpose: 'Travel',
      issuedBy: 'Dr. Sarah Wilson',
      status: 'Issued',
    },
    {
      id: 4,
      certificateId: 'CERT-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      certificateType: 'Disability Certificate',
      issueDate: '2023-10-28',
      validUntil: '2025-10-28',
      purpose: 'Government Benefits',
      issuedBy: 'Dr. Sarah Wilson',
      status: 'Issued',
    },
    {
      id: 5,
      certificateId: 'CERT-005',
      patientName: 'Chris Lee',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      certificateType: 'Birth Certificate',
      issueDate: '2023-10-29',
      purpose: 'School Admission',
      issuedBy: 'Dr. John Deo',
      status: 'Pending',
    },
    {
      id: 6,
      certificateId: 'CERT-006',
      patientName: 'Anna Brown',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      certificateType: 'Medical Fitness',
      issueDate: '2023-10-30',
      validUntil: '2024-10-30',
      purpose: 'Visa Application',
      issuedBy: 'Dr. Sarah Wilson',
      status: 'Issued',
    },
    {
      id: 7,
      certificateId: 'CERT-007',
      patientName: 'David Wilson',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      certificateType: 'Sick Leave',
      issueDate: '2023-10-31',
      validUntil: '2023-11-05',
      purpose: 'Migraine',
      issuedBy: 'Dr. John Deo',
      status: 'Issued',
    },
    {
      id: 8,
      certificateId: 'CERT-008',
      patientName: 'Laura White',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      certificateType: 'Vaccination',
      issueDate: '2023-11-01',
      purpose: 'General Immunity',
      issuedBy: 'Dr. Sarah Wilson',
      status: 'Issued',
    },
    {
      id: 9,
      certificateId: 'CERT-009',
      patientName: 'James Miller',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      certificateType: 'Death Certificate',
      issueDate: '2023-11-02',
      purpose: 'Legal Records',
      issuedBy: 'Dr. John Deo',
      status: 'Pending',
    },
    {
      id: 10,
      certificateId: 'CERT-010',
      patientName: 'Sophia Taylor',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      certificateType: 'Medical Fitness',
      issueDate: '2023-11-03',
      validUntil: '2024-11-03',
      purpose: 'Sports Participation',
      issuedBy: 'Dr. Sarah Wilson',
      status: 'Issued',
    },
    {
      id: 11,
      certificateId: 'CERT-011',
      patientName: 'Lucas Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      certificateType: 'Sick Leave',
      issueDate: '2023-11-04',
      validUntil: '2023-11-08',
      purpose: 'Flu',
      issuedBy: 'Dr. John Deo',
      status: 'Pending',
    },
    {
      id: 12,
      certificateId: 'CERT-012',
      patientName: 'Isabella Rodriguez',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-012',
      certificateType: 'Vaccination',
      issueDate: '2023-11-05',
      purpose: 'Travel',
      issuedBy: 'Dr. Sarah Wilson',
      status: 'Issued',
    },
  ];

  private dataSubject = new BehaviorSubject<Certificate[]>(this.data);

  constructor() {}

  getAllCertificates(): Observable<Certificate[]> {
    return this.dataSubject.asObservable();
  }

  addCertificate(certificate: Certificate): void {
    certificate.id = this.data.length + 1;
    this.data.unshift(certificate);
    this.dataSubject.next(this.data);
  }

  updateCertificate(certificate: Certificate): void {
    const index = this.data.findIndex((d) => d.id === certificate.id);
    if (index !== -1) {
      this.data[index] = certificate;
      this.dataSubject.next(this.data);
    }
  }

  deleteCertificate(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
