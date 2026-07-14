import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Referral } from './referrals.model';

@Injectable({
  providedIn: 'root',
})
export class ReferralsService {
  private data: Referral[] = [
    {
      id: 1,
      referralId: 'REF-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      referredTo: 'Dr. Emily White',
      specialty: 'Cardiology',
      referralDate: '2023-10-25',
      reason: 'Cardiac evaluation',
      status: 'Pending',
      priority: 'Urgent',
      referredBy: 'Dr. Sarah Wilson',
    },
    {
      id: 2,
      referralId: 'REF-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      referredTo: 'Dr. Michael Brown',
      specialty: 'Neurology',
      referralDate: '2023-10-26',
      reason: 'Chronic headaches',
      status: 'Accepted',
      priority: 'Routine',
      referredBy: 'Dr. John Deo',
    },
    {
      id: 3,
      referralId: 'REF-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      referredTo: 'Dr. Lisa Green',
      specialty: 'Dermatology',
      referralDate: '2023-10-27',
      reason: 'Skin rash',
      status: 'Completed',
      priority: 'Routine',
      referredBy: 'Dr. Sarah Wilson',
    },
    {
      id: 4,
      referralId: 'REF-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      referredTo: 'Dr. Robert Taylor',
      specialty: 'Orthopedics',
      referralDate: '2023-10-28',
      reason: 'Knee pain',
      status: 'Pending',
      priority: 'Urgent',
      referredBy: 'Dr. John Deo',
    },
    {
      id: 5,
      referralId: 'REF-005',
      patientName: 'Chris Lee',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      referredTo: 'Dr. Susan Miller',
      specialty: 'Endocrinology',
      referralDate: '2023-10-29',
      reason: 'Diabetes management',
      status: 'Accepted',
      priority: 'Routine',
      referredBy: 'Dr. Sarah Wilson',
    },
    {
      id: 6,
      referralId: 'REF-006',
      patientName: 'Anna Brown',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      referredTo: 'Dr. William Clark',
      specialty: 'Ophthalmology',
      referralDate: '2023-10-30',
      reason: 'Vision issues',
      status: 'Completed',
      priority: 'Routine',
      referredBy: 'Dr. John Deo',
    },
    {
      id: 7,
      referralId: 'REF-007',
      patientName: 'David Wilson',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      referredTo: 'Dr. Karen Davis',
      specialty: 'Gastroenterology',
      referralDate: '2023-10-31',
      reason: 'Abdominal pain',
      status: 'Pending',
      priority: 'Urgent',
      referredBy: 'Dr. Sarah Wilson',
    },
    {
      id: 8,
      referralId: 'REF-008',
      patientName: 'Laura White',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      referredTo: 'Dr. Thomas Moore',
      specialty: 'Urology',
      referralDate: '2023-11-01',
      reason: 'Kidney stones',
      status: 'Accepted',
      priority: 'Routine',
      referredBy: 'Dr. John Deo',
    },
    {
      id: 9,
      referralId: 'REF-009',
      patientName: 'James Miller',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      referredTo: 'Dr. Jennifer Taylor',
      specialty: 'Psychiatry',
      referralDate: '2023-11-02',
      reason: 'Anxiety evaluation',
      status: 'Completed',
      priority: 'Routine',
      referredBy: 'Dr. Sarah Wilson',
    },
    {
      id: 10,
      referralId: 'REF-010',
      patientName: 'Sophia Taylor',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      referredTo: 'Dr. Richard Anderson',
      specialty: 'Oncology',
      referralDate: '2023-11-03',
      reason: 'Biopsy follow-up',
      status: 'Pending',
      priority: 'Urgent',
      referredBy: 'Dr. John Deo',
    },
    {
      id: 11,
      referralId: 'REF-011',
      patientName: 'Lucas Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      referredTo: 'Dr. Patricia Hall',
      specialty: 'Rheumatology',
      referralDate: '2023-11-04',
      reason: 'Joint inflammation',
      status: 'Accepted',
      priority: 'Routine',
      referredBy: 'Dr. Sarah Wilson',
    },
    {
      id: 12,
      referralId: 'REF-012',
      patientName: 'Isabella Rodriguez',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-012',
      referredTo: 'Dr. Steven Young',
      specialty: 'Pulmonology',
      referralDate: '2023-11-05',
      reason: 'Chronic cough',
      status: 'Completed',
      priority: 'Routine',
      referredBy: 'Dr. John Deo',
    },
  ];

  private dataSubject = new BehaviorSubject<Referral[]>(this.data);

  constructor() {}

  getAllReferrals(): Observable<Referral[]> {
    return this.dataSubject.asObservable();
  }

  addReferral(referral: Referral): void {
    referral.id = this.data.length + 1;
    this.data.unshift(referral);
    this.dataSubject.next(this.data);
  }

  updateReferral(referral: Referral): void {
    const index = this.data.findIndex((d) => d.id === referral.id);
    if (index !== -1) {
      this.data[index] = referral;
      this.dataSubject.next(this.data);
    }
  }

  deleteReferral(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
