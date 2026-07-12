import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feedback } from './feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private data: Feedback[] = [
    { id: 1, ticketId: 'TKT-101', subject: 'Long waiting time', category: 'General', rating: 2, status: 'Resolved', date: '2023-11-05', description: 'Waited for over 2 hours for my appointment.' },
    { id: 2, ticketId: 'TKT-102', subject: 'Excellent staff behavior', category: 'Service', rating: 5, status: 'Closed', date: '2023-11-15', description: 'The nurses were very helpful and friendly.' },
    { id: 3, ticketId: 'TKT-103', subject: 'Portal login issue', category: 'Technical', rating: 1, status: 'Pending', date: '2023-12-01', description: 'I am unable to login to the patient portal.' },
    { id: 4, ticketId: 'TKT-104', subject: 'Cleanliness of the ward', category: 'Maintenance', rating: 4, status: 'In-Progress', date: '2024-01-10', description: 'The ward was clean but the restroom needs more attention.' },
    { id: 5, ticketId: 'TKT-105', subject: 'Difficulty in booking online', category: 'Technical', rating: 2, status: 'Resolved', date: '2024-02-05', description: 'The booking button was not working on mobile.' },
    { id: 6, ticketId: 'TKT-106', subject: 'Friendly receptionist', category: 'Service', rating: 5, status: 'Closed', date: '2024-02-12', description: 'The receptionist was very welcoming.' },
    { id: 7, ticketId: 'TKT-107', subject: 'Food quality in canteen', category: 'General', rating: 3, status: 'Pending', date: '2024-02-20', description: 'The food was average, could be better.' },
    { id: 8, ticketId: 'TKT-108', subject: 'Billing error', category: 'Administrative', rating: 2, status: 'In-Progress', date: '2024-02-28', description: 'I was charged twice for the same consultation.' },
    { id: 9, ticketId: 'TKT-109', subject: 'Parking space availability', category: 'Maintenance', rating: 3, status: 'Resolved', date: '2024-03-05', description: 'Hard to find parking during peak hours.' },
    { id: 10, ticketId: 'TKT-110', subject: 'Effective treatment', category: 'Service', rating: 5, status: 'Closed', date: '2024-03-10', description: 'The prescribed treatment worked very well.' },
    { id: 11, ticketId: 'TKT-111', subject: 'Lab report delay', category: 'Laboratory', rating: 2, status: 'Pending', date: '2024-03-15', description: 'My blood test results took 3 days instead of 1.' },
    { id: 12, ticketId: 'TKT-112', subject: 'Pharmacy stock issue', category: 'General', rating: 3, status: 'Resolved', date: '2024-03-20', description: 'Some medications were out of stock.' },
    { id: 13, ticketId: 'TKT-113', subject: 'Refund process', category: 'Administrative', rating: 4, status: 'Closed', date: '2024-03-25', description: 'Refund for the overcharge was processed quickly.' },
    { id: 14, ticketId: 'TKT-114', subject: 'Blood test results', category: 'Laboratory', rating: 3, status: 'In-Progress', date: '2024-03-28', description: 'Waiting for the final results of the blood work.' },
    { id: 15, ticketId: 'TKT-115', subject: 'Rescheduling appointment', category: 'Service', rating: 2, status: 'Pending', date: '2024-04-01', description: 'Difficulty in rescheduling the appointment over the phone.' },
  ];

  private dataSubject = new BehaviorSubject<Feedback[]>(this.data);

  constructor() { }

  getAllFeedback(): Observable<Feedback[]> {
    return this.dataSubject.asObservable();
  }

  addFeedback(feedback: Feedback): void {
    feedback.id = this.data.length + 1;
    this.data.push(feedback);
    this.dataSubject.next(this.data);
  }

  updateFeedback(feedback: Feedback): void {
    const index = this.data.findIndex(f => f.id === feedback.id);
    if (index !== -1) {
      this.data[index] = feedback;
      this.dataSubject.next(this.data);
    }
  }

  deleteFeedback(id: number): void {
    const index = this.data.findIndex(f => f.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
