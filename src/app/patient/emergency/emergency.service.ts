import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmergencyRequest } from './emergency.model';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  private data: EmergencyRequest[] = [
    { id: 1, requestId: 'REQ001', type: 'Ambulance', date: '2023-09-10', time: '10:30 AM', status: 'Resolved', location: '123 Main St, New York' },
    { id: 2, requestId: 'REQ002', type: 'Doctor', date: '2023-10-25', time: '02:15 PM', status: 'Resolved', location: '456 Elm St, Brooklyn' },
    { id: 3, requestId: 'REQ003', type: 'Ambulance', date: '2023-11-12', time: '08:45 AM', status: 'Resolved', location: '789 Oak Ave, Queens' },
    { id: 4, requestId: 'REQ004', type: 'Doctor', date: '2024-01-05', time: '11:20 PM', status: 'Resolved', location: '321 Pine Rd, Bronx' },
    { id: 5, requestId: 'REQ005', type: 'Ambulance', date: '2024-02-10', time: '09:15 AM', status: 'Resolved', location: '159 Cedar St, Manhattan' },
    { id: 6, requestId: 'REQ006', type: 'Doctor', date: '2024-02-18', time: '04:45 PM', status: 'Resolved', location: '753 Birch Ln, Staten Island' },
    { id: 7, requestId: 'REQ007', type: 'Ambulance', date: '2024-03-02', time: '01:30 AM', status: 'Resolved', location: '852 Maple Dr, Brooklyn' },
    { id: 8, requestId: 'REQ008', type: 'Doctor', date: '2024-03-10', time: '10:00 AM', status: 'Resolved', location: '951 Walnut Ct, Queens' },
    { id: 9, requestId: 'REQ009', type: 'Ambulance', date: '2024-03-15', time: '07:20 PM', status: 'Resolved', location: '369 Cherry Way, Bronx' },
    { id: 10, requestId: 'REQ010', type: 'Doctor', date: '2024-03-20', time: '11:50 AM', status: 'Resolved', location: '147 Willow St, Manhattan' },
    { id: 11, requestId: 'REQ011', type: 'Ambulance', date: '2024-03-25', time: '03:10 PM', status: 'Resolved', location: '258 Aspen Blvd, Brooklyn' },
    { id: 12, requestId: 'REQ012', type: 'Doctor', date: '2024-03-28', time: '08:40 PM', status: 'Resolved', location: '963 Spruce Ave, Queens' },
  ];

  private dataSubject = new BehaviorSubject<EmergencyRequest[]>(this.data);

  constructor() { }

  getAllEmergencyRequests(): Observable<EmergencyRequest[]> {
    return this.dataSubject.asObservable();
  }

  addEmergencyRequest(request: EmergencyRequest): void {
    request.id = this.data.length + 1;
    this.data.push(request);
    this.dataSubject.next(this.data);
  }

  updateEmergencyRequest(request: EmergencyRequest): void {
    const index = this.data.findIndex(r => r.id === request.id);
    if (index !== -1) {
      this.data[index] = request;
      this.dataSubject.next(this.data);
    }
  }

  deleteEmergencyRequest(id: number): void {
    const index = this.data.findIndex(r => r.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
