import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from './notifications.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private data: Notification[] = [
    { id: 1, title: 'Appointment Reminder', message: 'You have an appointment with Dr. Wilson tomorrow at 10:00 AM.', type: 'Reminder', date: '2023-11-20', time: '09:00 AM', status: 'Unread' },
    { id: 2, title: 'Lab Report Ready', message: 'Your Blood Test results are now available for viewing.', type: 'Info', date: '2023-11-18', time: '02:30 PM', status: 'Read' },
    { id: 3, title: 'New Health Tip', message: 'Check out the new tip on Vitamin D and bone health.', type: 'Info', date: '2023-11-15', time: '11:00 AM', status: 'Read' },
    { id: 4, title: 'Urgent: Policy Renewal', message: 'Your health insurance policy is expiring in 5 days.', type: 'Alert', date: '2023-11-10', time: '08:45 AM', status: 'Unread' },
    { id: 5, title: 'New Message', message: 'You have a new message from Dr. Sarah Wilson.', type: 'Info', date: '2023-12-01', time: '10:15 AM', status: 'Unread' },
    { id: 6, title: 'Prescription Ready', message: 'Your prescription for Allergies is ready for pickup.', type: 'Info', date: '2023-12-05', time: '03:30 PM', status: 'Read' },
    { id: 7, title: 'Health Goal Achieved', message: 'Congratulations! You reached your step goal for today.', type: 'Info', date: '2023-12-10', time: '08:00 PM', status: 'Read' },
    { id: 8, title: 'Appointment Rescheduled', message: 'Your appointment with Dr. John Doe has been rescheduled.', type: 'Alert', date: '2023-12-15', time: '09:30 AM', status: 'Unread' },
    { id: 9, title: 'Payment Successful', message: 'Your payment for Invoice #INV-123 was successful.', type: 'Info', date: '2023-12-20', time: '11:00 AM', status: 'Read' },
    { id: 10, title: 'System Maintenance', message: 'The patient portal will be down for maintenance tonight.', type: 'Alert', date: '2023-12-25', time: '10:00 PM', status: 'Unread' },
    { id: 11, title: 'Feedback Requested', message: 'Please rate your recent visit to City Central Lab.', type: 'Info', date: '2024-01-01', time: '02:00 PM', status: 'Read' },
    { id: 12, title: 'Vaccination Due', message: 'Your next Tetanus booster is due next week.', type: 'Reminder', date: '2024-01-05', time: '09:00 AM', status: 'Unread' },
  ];

  private dataSubject = new BehaviorSubject<Notification[]>(this.data);

  constructor() { }

  getAllNotifications(): Observable<Notification[]> {
    return this.dataSubject.asObservable();
  }

  addNotification(notification: Notification): void {
    notification.id = this.data.length + 1;
    this.data.unshift(notification);
    this.dataSubject.next(this.data);
  }

  updateNotification(notification: Notification): void {
    const index = this.data.findIndex(n => n.id === notification.id);
    if (index !== -1) {
      this.data[index] = notification;
      this.dataSubject.next(this.data);
    }
  }

  deleteNotification(id: number): void {
    const index = this.data.findIndex(n => n.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
