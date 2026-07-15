import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Surgery } from './surgeries.model';

@Injectable({
  providedIn: 'root',
})
export class SurgeriesService {
  private data: Surgery[] = [
    {
      id: 1,
      surgeryId: 'SUR-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      surgeryType: 'General',
      procedureName: 'Appendectomy',
      surgeryDate: '2023-11-01',
      surgeryTime: '10:00 AM',
      duration: '2 hours',
      surgeon: 'Dr. Sarah Wilson',
      anesthesiologist: 'Dr. Mike Smith',
      operatingRoom: 'OR-1',
      status: 'Scheduled',
      priority: 'Routine',
    },
    {
      id: 2,
      surgeryId: 'SUR-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      surgeryType: 'Orthopedic',
      procedureName: 'Knee Replacement',
      surgeryDate: '2023-11-02',
      surgeryTime: '02:00 PM',
      duration: '3 hours',
      surgeon: 'Dr. John Deo',
      anesthesiologist: 'Dr. Lisa White',
      operatingRoom: 'OR-3',
      status: 'In Progress',
      priority: 'Elective',
    },
    {
      id: 3,
      surgeryId: 'SUR-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      surgeryType: 'Cardiac',
      procedureName: 'Bypass Surgery',
      surgeryDate: '2023-11-03',
      surgeryTime: '08:00 AM',
      duration: '5 hours',
      surgeon: 'Dr. Sarah Wilson',
      anesthesiologist: 'Dr. Mark Brown',
      operatingRoom: 'OR-2',
      status: 'Completed',
      priority: 'Emergency',
    },
    {
      id: 4,
      surgeryId: 'SUR-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      surgeryType: 'Neurological',
      procedureName: 'Craniotomy',
      surgeryDate: '2023-11-04',
      surgeryTime: '09:00 AM',
      duration: '4 hours',
      surgeon: 'Dr. John Deo',
      anesthesiologist: 'Dr. Lisa White',
      operatingRoom: 'OR-4',
      status: 'Scheduled',
      priority: 'Emergency',
    },
    {
      id: 5,
      surgeryId: 'SUR-005',
      patientName: 'Robert Wilson',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      surgeryType: 'General',
      procedureName: 'Hernia Repair',
      surgeryDate: '2023-11-05',
      surgeryTime: '11:00 AM',
      duration: '1.5 hours',
      surgeon: 'Dr. Sarah Wilson',
      anesthesiologist: 'Dr. Mike Smith',
      operatingRoom: 'OR-1',
      status: 'Scheduled',
      priority: 'Routine',
    },
    {
      id: 6,
      surgeryId: 'SUR-006',
      patientName: 'Sarah Miller',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      surgeryType: 'Orthopedic',
      procedureName: 'Hip Replacement',
      surgeryDate: '2023-11-06',
      surgeryTime: '01:00 PM',
      duration: '3 hours',
      surgeon: 'Dr. John Deo',
      anesthesiologist: 'Dr. Lisa White',
      operatingRoom: 'OR-3',
      status: 'Scheduled',
      priority: 'Elective',
    },
    {
      id: 7,
      surgeryId: 'SUR-007',
      patientName: 'David Taylor',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      surgeryType: 'Urological',
      procedureName: 'Nephrectomy',
      surgeryDate: '2023-11-07',
      surgeryTime: '08:30 AM',
      duration: '3.5 hours',
      surgeon: 'Dr. Sarah Wilson',
      anesthesiologist: 'Dr. Mark Brown',
      operatingRoom: 'OR-2',
      status: 'Scheduled',
      priority: 'Routine',
    },
    {
      id: 8,
      surgeryId: 'SUR-008',
      patientName: 'Linda Anderson',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      surgeryType: 'Ophthalmic',
      procedureName: 'Cataract Surgery',
      surgeryDate: '2023-11-08',
      surgeryTime: '10:30 AM',
      duration: '1 hour',
      surgeon: 'Dr. John Deo',
      anesthesiologist: 'Dr. Mike Smith',
      operatingRoom: 'OR-5',
      status: 'Scheduled',
      priority: 'Routine',
    },
    {
      id: 9,
      surgeryId: 'SUR-009',
      patientName: 'James White',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      surgeryType: 'General',
      procedureName: 'Cholecystectomy',
      surgeryDate: '2023-11-09',
      surgeryTime: '02:30 PM',
      duration: '2 hours',
      surgeon: 'Dr. Sarah Wilson',
      anesthesiologist: 'Dr. Lisa White',
      operatingRoom: 'OR-1',
      status: 'Scheduled',
      priority: 'Routine',
    },
    {
      id: 10,
      surgeryId: 'SUR-010',
      patientName: 'Patricia Garcia',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      surgeryType: 'Gynecological',
      procedureName: 'Hysterectomy',
      surgeryDate: '2023-11-10',
      surgeryTime: '09:30 AM',
      duration: '3 hours',
      surgeon: 'Dr. John Deo',
      anesthesiologist: 'Dr. Mark Brown',
      operatingRoom: 'OR-4',
      status: 'Scheduled',
      priority: 'Routine',
    },
    {
      id: 11,
      surgeryId: 'SUR-011',
      patientName: 'William Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      surgeryType: 'Plastic',
      procedureName: 'Skin Graft',
      surgeryDate: '2023-11-11',
      surgeryTime: '11:30 AM',
      duration: '2.5 hours',
      surgeon: 'Dr. Sarah Wilson',
      anesthesiologist: 'Dr. Mike Smith',
      operatingRoom: 'OR-2',
      status: 'Scheduled',
      priority: 'Routine',
    },
    {
      id: 12,
      surgeryId: 'SUR-012',
      patientName: 'Elizabeth Robinson',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-012',
      surgeryType: 'Orthopedic',
      procedureName: 'ACL Repair',
      surgeryDate: '2023-11-12',
      surgeryTime: '01:30 PM',
      duration: '2 hours',
      surgeon: 'Dr. John Deo',
      anesthesiologist: 'Dr. Lisa White',
      operatingRoom: 'OR-3',
      status: 'Scheduled',
      priority: 'Routine',
    },
  ];

  private dataSubject = new BehaviorSubject<Surgery[]>(this.data);

  constructor() {}

  getAllSurgeries(): Observable<Surgery[]> {
    return this.dataSubject.asObservable();
  }

  addSurgery(surgery: Surgery): void {
    surgery.id = this.data.length + 1;
    this.data.unshift(surgery);
    this.dataSubject.next(this.data);
  }

  updateSurgery(surgery: Surgery): void {
    const index = this.data.findIndex((d) => d.id === surgery.id);
    if (index !== -1) {
      this.data[index] = surgery;
      this.dataSubject.next(this.data);
    }
  }

  deleteSurgery(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
