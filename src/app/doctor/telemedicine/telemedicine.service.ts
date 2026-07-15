import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TelemedicineSession } from './telemedicine.model';

@Injectable({
  providedIn: 'root',
})
export class TelemedicineService {
  private data: TelemedicineSession[] = [
    {
      id: 1,
      sessionId: 'TEL-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      scheduledDate: '2023-11-05',
      scheduledTime: '10:00 AM',
      duration: '30 mins',
      consultationType: 'Video',
      status: 'Scheduled',
      doctor: 'Dr. Sarah Wilson',
    },
    {
      id: 2,
      sessionId: 'TEL-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      scheduledDate: '2023-11-06',
      scheduledTime: '02:00 PM',
      duration: '45 mins',
      consultationType: 'Audio',
      status: 'In Progress',
      doctor: 'Dr. John Deo',
    },
    {
      id: 3,
      sessionId: 'TEL-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      scheduledDate: '2023-11-07',
      scheduledTime: '11:00 AM',
      duration: '30 mins',
      consultationType: 'Video',
      status: 'Completed',
      doctor: 'Dr. Sarah Wilson',
    },
    {
      id: 4,
      sessionId: 'TEL-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      scheduledDate: '2023-11-08',
      scheduledTime: '09:00 AM',
      duration: '15 mins',
      consultationType: 'Audio',
      status: 'Scheduled',
      doctor: 'Dr. John Deo',
    },
    {
      id: 5,
      sessionId: 'TEL-005',
      patientName: 'Robert Wilson',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      scheduledDate: '2023-11-09',
      scheduledTime: '10:30 AM',
      duration: '30 mins',
      consultationType: 'Video',
      status: 'Scheduled',
      doctor: 'Dr. Sarah Wilson',
    },
    {
      id: 6,
      sessionId: 'TEL-006',
      patientName: 'Sarah Miller',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      scheduledDate: '2023-11-10',
      scheduledTime: '01:00 PM',
      duration: '45 mins',
      consultationType: 'Video',
      status: 'Scheduled',
      doctor: 'Dr. John Deo',
    },
    {
      id: 7,
      sessionId: 'TEL-007',
      patientName: 'David Taylor',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      scheduledDate: '2023-11-11',
      scheduledTime: '02:00 PM',
      duration: '20 mins',
      consultationType: 'Audio',
      status: 'Scheduled',
      doctor: 'Dr. Sarah Wilson',
    },
    {
      id: 8,
      sessionId: 'TEL-008',
      patientName: 'Linda Anderson',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      scheduledDate: '2023-11-12',
      scheduledTime: '03:30 PM',
      duration: '30 mins',
      consultationType: 'Video',
      status: 'Scheduled',
      doctor: 'Dr. John Deo',
    },
    {
      id: 9,
      sessionId: 'TEL-009',
      patientName: 'James White',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      scheduledDate: '2023-11-13',
      scheduledTime: '11:30 AM',
      duration: '30 mins',
      consultationType: 'Video',
      status: 'Scheduled',
      doctor: 'Dr. Sarah Wilson',
    },
    {
      id: 10,
      sessionId: 'TEL-010',
      patientName: 'Patricia Garcia',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      scheduledDate: '2023-11-14',
      scheduledTime: '04:00 PM',
      duration: '15 mins',
      consultationType: 'Audio',
      status: 'Scheduled',
      doctor: 'Dr. John Deo',
    },
    {
      id: 11,
      sessionId: 'TEL-011',
      patientName: 'William Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      scheduledDate: '2023-11-15',
      scheduledTime: '09:30 AM',
      duration: '30 mins',
      consultationType: 'Video',
      status: 'Scheduled',
      doctor: 'Dr. Sarah Wilson',
    },
    {
      id: 12,
      sessionId: 'TEL-012',
      patientName: 'Elizabeth Robinson',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-012',
      scheduledDate: '2023-11-16',
      scheduledTime: '10:00 AM',
      duration: '30 mins',
      consultationType: 'Video',
      status: 'Scheduled',
      doctor: 'Dr. John Deo',
    },
  ];

  private dataSubject = new BehaviorSubject<TelemedicineSession[]>(this.data);

  constructor() {}

  getAllSessions(): Observable<TelemedicineSession[]> {
    return this.dataSubject.asObservable();
  }

  addSession(session: TelemedicineSession): void {
    session.id = this.data.length + 1;
    this.data.unshift(session);
    this.dataSubject.next(this.data);
  }

  updateSession(session: TelemedicineSession): void {
    const index = this.data.findIndex((d) => d.id === session.id);
    if (index !== -1) {
      this.data[index] = session;
      this.dataSubject.next(this.data);
    }
  }

  deleteSession(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
