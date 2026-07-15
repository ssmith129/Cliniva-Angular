import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Visit } from './visit-logs.model';

@Injectable({
  providedIn: 'root',
})
export class VisitLogsService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<Visit[]> = new BehaviorSubject<Visit[]>([]);
  dialogData: unknown;

  get data(): Visit[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllVisits(): Observable<Visit[]> {
    const mockData: Visit[] = [
      new Visit({
        id: 1,
        visitorName: 'Robert Johnson',
        visitorPhone: '+1 234-567-8901',
        visitorEmail: 'robert.j@email.com',
        purpose: 'Patient Visit',
        personToMeet: 'Dr. Sarah Johnson',
        department: 'Cardiology',
        checkInTime: '09:30 AM',
        checkOutTime: '10:45 AM',
        visitDate: '2024-11-26',
        status: 'Checked Out',
        idProofType: 'Aadhar Card',
        idProofNumber: 'XXXX-XXXX-1234',
        vehicleNumber: 'MH-12-AB-1234',
        remarks: 'Wife admitted',
      }),
      new Visit({
        id: 2,
        visitorName: 'Jennifer Smith',
        visitorPhone: '+1 234-567-8902',
        visitorEmail: 'jennifer.s@email.com',
        purpose: 'Meeting',
        personToMeet: 'John Smith',
        department: 'Administration',
        checkInTime: '11:00 AM',
        checkOutTime: '',
        visitDate: '2024-11-26',
        status: 'Checked In',
        idProofType: 'Driving License',
        idProofNumber: 'DL-1234567890',
        vehicleNumber: 'MH-14-CD-5678',
        remarks: 'Vendor contract',
      }),
      new Visit({
        id: 3,
        visitorName: 'Michael Davis',
        visitorPhone: '+1 234-567-8903',
        visitorEmail: 'michael.d@email.com',
        purpose: 'Delivery',
        personToMeet: 'David Wilson',
        department: 'Pharmacy',
        checkInTime: '08:15 AM',
        checkOutTime: '08:30 AM',
        visitDate: '2024-11-26',
        status: 'Checked Out',
        idProofType: 'Voter ID',
        idProofNumber: 'VID-1234567890',
        vehicleNumber: 'MH-01-EF-9012',
        remarks: 'Medicine delivery',
      }),
      new Visit({
        id: 4,
        visitorName: 'Emily Wilson',
        visitorPhone: '+1 234-567-8904',
        visitorEmail: 'emily.w@email.com',
        purpose: 'Consultation',
        personToMeet: 'Dr. Michael Brown',
        department: 'Neurology',
        checkInTime: '02:00 PM',
        checkOutTime: '',
        visitDate: '2024-11-26',
        status: 'Checked In',
        idProofType: 'Passport',
        idProofNumber: 'P-1234567',
        vehicleNumber: '',
        remarks: 'Follow up',
      }),
      new Visit({
        id: 5,
        visitorName: 'James Anderson',
        visitorPhone: '+1 234-567-8905',
        visitorEmail: 'james.a@email.com',
        purpose: 'Interview',
        personToMeet: 'Emily Davis',
        department: 'Administration',
        checkInTime: '10:00 AM',
        checkOutTime: '',
        visitDate: '2024-11-26',
        status: 'Pending',
        idProofType: 'Aadhar Card',
        idProofNumber: 'XXXX-XXXX-5678',
        vehicleNumber: 'MH-02-GH-3456',
        remarks: 'HR Interview',
      }),
      new Visit({
        id: 6,
        visitorName: 'Sarah Martinez',
        visitorPhone: '+1 234-567-8906',
        visitorEmail: 'sarah.m@email.com',
        purpose: 'Patient Visit',
        personToMeet: 'Dr. Lisa Anderson',
        department: 'Pediatrics',
        checkInTime: '03:30 PM',
        checkOutTime: '04:15 PM',
        visitDate: '2024-11-25',
        status: 'Checked Out',
        idProofType: 'Driving License',
        idProofNumber: 'DL-9876543210',
        vehicleNumber: 'MH-03-IJ-7890',
        remarks: 'Child checkup',
      }),
      new Visit({
        id: 7,
        visitorName: 'David Taylor',
        visitorPhone: '+1 234-567-8907',
        visitorEmail: 'david.t@email.com',
        purpose: 'Meeting',
        personToMeet: 'Robert Wilson',
        department: 'IT',
        checkInTime: '09:00 AM',
        checkOutTime: '10:00 AM',
        visitDate: '2024-11-25',
        status: 'Checked Out',
        idProofType: 'Voter ID',
        idProofNumber: 'VID-9876543210',
        vehicleNumber: 'MH-04-KL-1234',
        remarks: 'Software update',
      }),
      new Visit({
        id: 8,
        visitorName: 'Jessica Thomas',
        visitorPhone: '+1 234-567-8908',
        visitorEmail: 'jessica.t@email.com',
        purpose: 'Guest Lecture',
        personToMeet: 'Dr. James White',
        department: 'Education',
        checkInTime: '11:00 AM',
        checkOutTime: '01:00 PM',
        visitDate: '2024-11-25',
        status: 'Checked Out',
        idProofType: 'Aadhar Card',
        idProofNumber: 'XXXX-XXXX-9012',
        vehicleNumber: '',
        remarks: 'Medical students seminar',
      }),
      new Visit({
        id: 9,
        visitorName: 'Christopher White',
        visitorPhone: '+1 234-567-8909',
        visitorEmail: 'chris.w@email.com',
        purpose: 'Maintenance',
        personToMeet: 'Facility Manager',
        department: 'Maintenance',
        checkInTime: '02:00 PM',
        checkOutTime: '05:00 PM',
        visitDate: '2024-11-25',
        status: 'Checked Out',
        idProofType: 'Passport',
        idProofNumber: 'P-9876543',
        vehicleNumber: 'MH-05-MN-5678',
        remarks: 'AC Repair',
      }),
      new Visit({
        id: 10,
        visitorName: 'Amanda Harris',
        visitorPhone: '+1 234-567-8910',
        visitorEmail: 'amanda.h@email.com',
        purpose: 'Meeting',
        personToMeet: 'Marketing Head',
        department: 'Marketing',
        checkInTime: '04:00 PM',
        checkOutTime: '05:00 PM',
        visitDate: '2024-11-25',
        status: 'Checked Out',
        idProofType: 'Driving License',
        idProofNumber: 'DL-5432109876',
        vehicleNumber: 'MH-06-OP-9012',
        remarks: 'Campaign discussion',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addVisit(visit: Visit): Observable<Visit> {
    this.dialogData = visit;
    return of(visit);
  }

  updateVisit(visit: Visit): Observable<Visit> {
    this.dialogData = visit;
    return of(visit);
  }

  deleteVisit(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
