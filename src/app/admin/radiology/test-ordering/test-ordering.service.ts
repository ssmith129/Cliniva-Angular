import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TestOrder } from './test-ordering.model';

@Injectable({
  providedIn: 'root',
})
export class TestOrderingService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<TestOrder[]> = new BehaviorSubject<TestOrder[]>([]);
  dialogData: TestOrder | null = null;

  get data(): TestOrder[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllTestOrders(): Observable<TestOrder[]> {
    const mockData: TestOrder[] = [
      new TestOrder({
        id: 1,
        orderId: 'ORD-001',
        patientName: 'John Doe',
        testName: 'Chest X-Ray',
        orderingPhysician: 'Dr. Smith',
        orderDate: '2023-12-01',
        status: 'Ordered',
        priority: 'Routine',
        notes: 'Cough and fever',
      }),
      new TestOrder({
        id: 2,
        orderId: 'ORD-002',
        patientName: 'Jane Smith',
        testName: 'MRI Brain',
        orderingPhysician: 'Dr. Jones',
        orderDate: '2023-12-02',
        status: 'Scheduled',
        priority: 'Urgent',
        notes: 'Headache',
      }),
      new TestOrder({
        id: 3,
        orderId: 'ORD-003',
        patientName: 'Mike Johnson',
        testName: 'CT Abdomen',
        orderingPhysician: 'Dr. Brown',
        orderDate: '2023-12-03',
        status: 'Completed',
        priority: 'Routine',
        notes: 'Abdominal pain',
      }),
      new TestOrder({
        id: 4,
        orderId: 'ORD-004',
        patientName: 'Sarah Davis',
        testName: 'Ultrasound KUB',
        orderingPhysician: 'Dr. White',
        orderDate: '2023-12-04',
        status: 'Ordered',
        priority: 'Routine',
        notes: 'Flank pain',
      }),
      new TestOrder({
        id: 5,
        orderId: 'ORD-005',
        patientName: 'David Wilson',
        testName: 'X-Ray Knee',
        orderingPhysician: 'Dr. Green',
        orderDate: '2023-12-05',
        status: 'Completed',
        priority: 'Routine',
        notes: 'Fall injury',
      }),
       new TestOrder({
        id: 6,
        orderId: 'ORD-006',
        patientName: 'Emily Taylor',
        testName: 'MRI Spine',
        orderingPhysician: 'Dr. Black',
        orderDate: '2023-12-06',
        status: 'Scheduled',
        priority: 'Urgent',
        notes: 'Back pain',
      }),
      new TestOrder({
        id: 7,
        orderId: 'ORD-007',
        patientName: 'Robert Martinez',
        testName: 'CT Head',
        orderingPhysician: 'Dr. Lee',
        orderDate: '2023-12-07',
        status: 'Ordered',
        priority: 'Stat',
        notes: 'Trauma',
      }),
      new TestOrder({
        id: 8,
        orderId: 'ORD-008',
        patientName: 'Linda Anderson',
        testName: 'Mammogram',
        orderingPhysician: 'Dr. Hall',
        orderDate: '2023-12-08',
        status: 'Completed',
        priority: 'Routine',
        notes: 'Screening',
      }),
      new TestOrder({
        id: 9,
        orderId: 'ORD-009',
        patientName: 'William Thomas',
        testName: 'X-Ray Shoulder',
        orderingPhysician: 'Dr. Young',
        orderDate: '2023-12-09',
        status: 'Ordered',
        priority: 'Routine',
        notes: 'Pain',
      }),
      new TestOrder({
        id: 10,
        orderId: 'ORD-010',
        patientName: 'Elizabeth Moore',
        testName: 'Ultrasound Doppler',
        orderingPhysician: 'Dr. King',
        orderDate: '2023-12-10',
        status: 'Scheduled',
        priority: 'Urgent',
        notes: 'DVT check',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addTestOrder(testOrder: TestOrder): Observable<TestOrder> {
    this.dialogData = testOrder;
    return of(testOrder);
  }

  updateTestOrder(testOrder: TestOrder): Observable<TestOrder> {
    this.dialogData = testOrder;
    return of(testOrder);
  }

  deleteTestOrder(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
