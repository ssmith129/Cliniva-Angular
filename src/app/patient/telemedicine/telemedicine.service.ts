import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TelemedicineSession } from './telemedicine.model';

@Injectable({
  providedIn: 'root'
})
export class TelemedicineService {
  private data: TelemedicineSession[] = [
    { id: 1, sessionId: 'SESS001', doctorName: 'Dr. Sarah Wilson', img: 'assets/images/user/user1.jpg', specialty: 'General Physician', scheduledDate: '2023-11-25', scheduledTime: '10:00 AM', duration: '30 mins', consultationType: 'Video Call', status: 'Scheduled' },
    { id: 2, sessionId: 'SESS002', doctorName: 'Dr. John Doe', img: 'assets/images/user/user2.jpg', specialty: 'Cardiologist', scheduledDate: '2023-11-28', scheduledTime: '02:30 PM', duration: '20 mins', consultationType: 'Audio Call', status: 'Scheduled' },
    { id: 3, sessionId: 'SESS003', doctorName: 'Dr. Emily Brown', img: 'assets/images/user/user3.jpg', specialty: 'Dermatologist', scheduledDate: '2023-11-20', scheduledTime: '11:00 AM', duration: '15 mins', consultationType: 'Chat', status: 'Completed' },
    { id: 4, sessionId: 'SESS004', doctorName: 'Dr. Michael Smith', img: 'assets/images/user/user4.jpg', specialty: 'Pediatrician', scheduledDate: '2023-11-15', scheduledTime: '09:00 AM', duration: '30 mins', consultationType: 'Video Call', status: 'Cancelled' },
    { id: 5, sessionId: 'SESS005', doctorName: 'Dr. Sarah Wilson', img: 'assets/images/user/user1.jpg', specialty: 'General Physician', scheduledDate: '2023-12-01', scheduledTime: '11:30 AM', duration: '20 mins', consultationType: 'Audio Call', status: 'Scheduled' },
    { id: 6, sessionId: 'SESS006', doctorName: 'Dr. John Doe', img: 'assets/images/user/user2.jpg', specialty: 'Cardiologist', scheduledDate: '2023-12-05', scheduledTime: '03:00 PM', duration: '30 mins', consultationType: 'Video Call', status: 'Scheduled' },
    { id: 7, sessionId: 'SESS007', doctorName: 'Dr. Emily Brown', img: 'assets/images/user/user3.jpg', specialty: 'Dermatologist', scheduledDate: '2023-12-10', scheduledTime: '10:45 AM', duration: '15 mins', consultationType: 'Chat', status: 'Completed' },
    { id: 8, sessionId: 'SESS008', doctorName: 'Dr. Michael Smith', img: 'assets/images/user/user4.jpg', specialty: 'Pediatrician', scheduledDate: '2023-12-15', scheduledTime: '02:15 PM', duration: '20 mins', consultationType: 'Video Call', status: 'Scheduled' },
    { id: 9, sessionId: 'SESS009', doctorName: 'Dr. Sarah Wilson', img: 'assets/images/user/user1.jpg', specialty: 'General Physician', scheduledDate: '2023-12-20', scheduledTime: '09:30 AM', duration: '30 mins', consultationType: 'Audio Call', status: 'Scheduled' },
    { id: 10, sessionId: 'SESS010', doctorName: 'Dr. John Doe', img: 'assets/images/user/user2.jpg', specialty: 'Cardiologist', scheduledDate: '2023-12-25', scheduledTime: '04:00 PM', duration: '15 mins', consultationType: 'Video Call', status: 'Scheduled' },
    { id: 11, sessionId: 'SESS011', doctorName: 'Dr. Emily Brown', img: 'assets/images/user/user3.jpg', specialty: 'Dermatologist', scheduledDate: '2024-01-01', scheduledTime: '11:00 AM', duration: '30 mins', consultationType: 'Chat', status: 'Completed' },
    { id: 12, sessionId: 'SESS012', doctorName: 'Dr. Michael Smith', img: 'assets/images/user/user4.jpg', specialty: 'Pediatrician', scheduledDate: '2024-01-05', scheduledTime: '01:30 PM', duration: '20 mins', consultationType: 'Video Call', status: 'Scheduled' },
  ];

  private dataSubject = new BehaviorSubject<TelemedicineSession[]>(this.data);

  constructor() { }

  getAllSessions(): Observable<TelemedicineSession[]> {
    return this.dataSubject.asObservable();
  }

  addSession(session: TelemedicineSession): void {
    session.id = this.data.length + 1;
    this.data.unshift(session);
    this.dataSubject.next(this.data);
  }

  updateSession(session: TelemedicineSession): void {
    const index = this.data.findIndex(s => s.id === session.id);
    if (index !== -1) {
      this.data[index] = session;
      this.dataSubject.next(this.data);
    }
  }

  deleteSession(id: number): void {
    const index = this.data.findIndex(s => s.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
