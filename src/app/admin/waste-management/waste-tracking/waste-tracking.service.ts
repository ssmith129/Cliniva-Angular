import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { WasteTracking } from './waste-tracking.model';

@Injectable({
  providedIn: 'root',
})
export class WasteTrackingService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<WasteTracking[]> = new BehaviorSubject<WasteTracking[]>([]);
  dialogData: WasteTracking | null = null;

  get data(): WasteTracking[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllWasteTrackings(): Observable<WasteTracking[]> {
    const mockData: WasteTracking[] = [
      new WasteTracking({
        id: 1,
        waste_id: 'WST-001',
        waste_type: 'Biomedical Waste',
        category: 'Yellow Bag',
        quantity: '5.2',
        department: 'ICU',
        collection_date: '2023-12-01',
        collection_time: '09:00 AM',
        collected_by: 'John Doe',
        status: 'Collected',
        storage_location: 'Storage A',
        notes: 'Infectious waste',
      }),
      new WasteTracking({
        id: 2,
        waste_id: 'WST-002',
        waste_type: 'Sharps',
        category: 'White Bag',
        quantity: '1.5',
        department: 'Operation Theatre',
        collection_date: '2023-12-02',
        collection_time: '10:30 AM',
        collected_by: 'Jane Smith',
        status: 'Pending Disposal',
        storage_location: 'Storage B',
        notes: 'Needles and scalpel blades',
      }),
      new WasteTracking({
        id: 3,
        waste_id: 'WST-003',
        waste_type: 'Pharmaceutical Waste',
        category: 'Black Bag',
        quantity: '3.0',
        department: 'Pharmacy',
        collection_date: '2023-12-03',
        collection_time: '11:00 AM',
        collected_by: 'Mike Johnson',
        status: 'Awaiting Collection',
        storage_location: 'Storage C',
        notes: 'Expired medicines',
      }),
      new WasteTracking({
        id: 4,
        waste_id: 'WST-004',
        waste_type: 'Chemical Waste',
        category: 'Red Bag',
        quantity: '2.5',
        department: 'Laboratory',
        collection_date: '2023-12-04',
        collection_time: '02:00 PM',
        collected_by: 'Sarah Davis',
        status: 'Disposed',
        storage_location: 'Storage A',
        notes: 'Lab reagents',
      }),
      new WasteTracking({
        id: 5,
        waste_id: 'WST-005',
        waste_type: 'General Waste',
        category: 'Black Bag',
        quantity: '10.0',
        department: 'General Ward',
        collection_date: '2023-12-05',
        collection_time: '04:00 PM',
        collected_by: 'David Wilson',
        status: 'Collected',
        storage_location: 'Storage D',
        notes: 'Paper and plastic',
      }),
      new WasteTracking({
        id: 6,
        waste_id: 'WST-006',
        waste_type: 'Recyclable Waste',
        category: 'Blue Bag',
        quantity: '8.0',
        department: 'Admin Block',
        collection_date: '2023-12-06',
        collection_time: '09:30 AM',
        collected_by: 'Emily Taylor',
        status: 'Pending Disposal',
        storage_location: 'Storage E',
        notes: 'Cardboard boxes',
      }),
      new WasteTracking({
        id: 7,
        waste_id: 'WST-007',
        waste_type: 'Radioactive Waste',
        category: 'Yellow Bag',
        quantity: '0.5',
        department: 'Radiology',
        collection_date: '2023-12-07',
        collection_time: '11:30 AM',
        collected_by: 'Robert Martinez',
        status: 'Awaiting Collection',
        storage_location: 'Storage F',
        notes: 'Low-level radioactive waste',
      }),
       new WasteTracking({
        id: 8,
        waste_id: 'WST-008',
        waste_type: 'Biomedical Waste',
        category: 'Yellow Bag',
        quantity: '6.0',
        department: 'Emergency',
        collection_date: '2023-12-08',
        collection_time: '10:00 AM',
        collected_by: 'Linda Anderson',
        status: 'Disposed',
        storage_location: 'Storage A',
        notes: 'Blood-soaked cotton',
      }),
      new WasteTracking({
        id: 9,
        waste_id: 'WST-009',
        waste_type: 'Sharps',
        category: 'White Bag',
        quantity: '2.0',
        department: 'Laboratory',
        collection_date: '2023-12-09',
        collection_time: '12:00 PM',
        collected_by: 'William Thomas',
        status: 'Collected',
        storage_location: 'Storage B',
        notes: 'Broken glass slides',
      }),
      new WasteTracking({
        id: 10,
        waste_id: 'WST-010',
        waste_type: 'General Waste',
        category: 'Black Bag',
        quantity: '12.0',
        department: 'Canteen',
        collection_date: '2023-12-10',
        collection_time: '05:00 PM',
        collected_by: 'Elizabeth Moore',
        status: 'Pending Disposal',
        storage_location: 'Storage D',
        notes: 'Food waste',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addWasteTracking(waste: WasteTracking): Observable<WasteTracking> {
    this.dialogData = waste;
    return of(waste);
  }

  updateWasteTracking(waste: WasteTracking): Observable<WasteTracking> {
    this.dialogData = waste;
    return of(waste);
  }

  deleteWasteTracking(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
