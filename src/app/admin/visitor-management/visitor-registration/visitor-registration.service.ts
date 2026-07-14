import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Visitor } from './visitor-registration.model';

@Injectable({
  providedIn: 'root',
})
export class VisitorRegistrationService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<Visitor[]> = new BehaviorSubject<Visitor[]>([]);
  dialogData: unknown;

  get data(): Visitor[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllVisitors(): Observable<Visitor[]> {
    const mockData: Visitor[] = [
      new Visitor({
        id: 1,
        img: 'assets/images/user/user1.jpg',
        visitorName: 'Robert Johnson',
        visitorPhone: '+1 234-567-8901',
        visitorEmail: 'robert.j@email.com',
        visitorAddress: '123 Main St',
        visitorCity: 'New York',
        visitorState: 'NY',
        idProofType: 'Aadhar Card',
        idProofNumber: 'XXXX-XXXX-1234',
        vehicleNumber: 'MH-12-AB-1234',
        vehicleType: 'Car',
        numberOfVisitors: 1,
        remarks: 'Frequent visitor',
      }),
      new Visitor({
        id: 2,
        img: 'assets/images/user/user2.jpg',
        visitorName: 'Jennifer Smith',
        visitorPhone: '+1 234-567-8902',
        visitorEmail: 'jennifer.s@email.com',
        visitorAddress: '456 Oak Ave',
        visitorCity: 'Los Angeles',
        visitorState: 'CA',
        idProofType: 'Driving License',
        idProofNumber: 'DL-1234567890',
        vehicleNumber: 'MH-14-CD-5678',
        vehicleType: 'Car',
        numberOfVisitors: 2,
        remarks: 'Family visit',
      }),
      new Visitor({
        id: 3,
        img: 'assets/images/user/user3.jpg',
        visitorName: 'Michael Davis',
        visitorPhone: '+1 234-567-8903',
        visitorEmail: 'michael.d@email.com',
        visitorAddress: '789 Pine Ln',
        visitorCity: 'San Francisco',
        visitorState: 'CA',
        idProofType: 'Voter ID',
        idProofNumber: 'VID-1234567890',
        vehicleNumber: 'MH-01-EF-9012',
        vehicleType: 'Bike',
        numberOfVisitors: 1,
        remarks: 'Delivery person',
      }),
      new Visitor({
        id: 4,
        img: 'assets/images/user/user4.jpg',
        visitorName: 'Emily Wilson',
        visitorPhone: '+1 234-567-8904',
        visitorEmail: 'emily.w@email.com',
        visitorAddress: '101 Maple Dr',
        visitorCity: 'Seattle',
        visitorState: 'WA',
        idProofType: 'Passport',
        idProofNumber: 'P-1234567',
        vehicleNumber: '',
        vehicleType: '',
        numberOfVisitors: 1,
        remarks: 'Medical consultation',
      }),
      new Visitor({
        id: 5,
        img: 'assets/images/user/user5.jpg',
        visitorName: 'James Anderson',
        visitorPhone: '+1 234-567-8905',
        visitorEmail: 'james.a@email.com',
        visitorAddress: '202 Cedar St',
        visitorCity: 'Chicago',
        visitorState: 'IL',
        idProofType: 'Aadhar Card',
        idProofNumber: 'XXXX-XXXX-5678',
        vehicleNumber: 'MH-02-GH-3456',
        vehicleType: 'Car',
        numberOfVisitors: 1,
        remarks: 'Job Interview',
      }),
      new Visitor({
        id: 6,
        img: 'assets/images/user/user6.jpg',
        visitorName: 'Sarah Martinez',
        visitorPhone: '+1 234-567-8906',
        visitorEmail: 'sarah.m@email.com',
        visitorAddress: '303 Birch Rd',
        visitorCity: 'Houston',
        visitorState: 'TX',
        idProofType: 'Driving License',
        idProofNumber: 'DL-9876543210',
        vehicleNumber: 'MH-03-IJ-7890',
        vehicleType: 'Bike',
        numberOfVisitors: 3,
        remarks: 'Parents visiting',
      }),
      new Visitor({
        id: 7,
        img: 'assets/images/user/user7.jpg',
        visitorName: 'David Taylor',
        visitorPhone: '+1 234-567-8907',
        visitorEmail: 'david.t@email.com',
        visitorAddress: '404 Elm St',
        visitorCity: 'Phoenix',
        visitorState: 'AZ',
        idProofType: 'Voter ID',
        idProofNumber: 'VID-9876543210',
        vehicleNumber: 'MH-04-KL-1234',
        vehicleType: 'Car',
        numberOfVisitors: 1,
        remarks: 'Sales representative',
      }),
      new Visitor({
        id: 8,
        img: 'assets/images/user/user8.jpg',
        visitorName: 'Jessica Thomas',
        visitorPhone: '+1 234-567-8908',
        visitorEmail: 'jessica.t@email.com',
        visitorAddress: '505 Walnut Ave',
        visitorCity: 'Philadelphia',
        visitorState: 'PA',
        idProofType: 'Aadhar Card',
        idProofNumber: 'XXXX-XXXX-9012',
        vehicleNumber: '',
        vehicleType: '',
        numberOfVisitors: 1,
        remarks: 'Guest lecture',
      }),
      new Visitor({
        id: 9,
        img: 'assets/images/user/user9.jpg',
        visitorName: 'Christopher White',
        visitorPhone: '+1 234-567-8909',
        visitorEmail: 'chris.w@email.com',
        visitorAddress: '606 Ash Ln',
        visitorCity: 'San Antonio',
        visitorState: 'TX',
        idProofType: 'Passport',
        idProofNumber: 'P-9876543',
        vehicleNumber: 'MH-05-MN-5678',
        vehicleType: 'Bike',
        numberOfVisitors: 1,
        remarks: 'Contractor',
      }),
      new Visitor({
        id: 10,
        img: 'assets/images/user/user10.jpg',
        visitorName: 'Amanda Harris',
        visitorPhone: '+1 234-567-8910',
        visitorEmail: 'amanda.h@email.com',
        visitorAddress: '707 Spruce Dr',
        visitorCity: 'San Diego',
        visitorState: 'CA',
        idProofType: 'Driving License',
        idProofNumber: 'DL-5432109876',
        vehicleNumber: 'MH-06-OP-9012',
        vehicleType: 'Car',
        numberOfVisitors: 2,
        remarks: 'Vendor meeting',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addVisitor(visitor: Visitor): Observable<Visitor> {
    this.dialogData = visitor;
    return of(visitor);
  }

  updateVisitor(visitor: Visitor): Observable<Visitor> {
    this.dialogData = visitor;
    return of(visitor);
  }

  deleteVisitor(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
