import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ScanTracking } from './scans-tracking.model';

@Injectable({
  providedIn: 'root',
})
export class ScansTrackingService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<ScanTracking[]> = new BehaviorSubject<ScanTracking[]>([]);
  dialogData: ScanTracking | null = null;

  get data(): ScanTracking[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllScansTracking(): Observable<ScanTracking[]> {
    const mockData: ScanTracking[] = [
      new ScanTracking({
        id: 1,
        scanId: 'SCN-001',
        patientName: 'John Doe',
        scanType: 'Chest',
        modality: 'X-Ray',
        technicianName: 'Tech. Sarah',
        scanDate: '2023-12-01',
        duration: '15 mins',
        status: 'Completed',
        notes: '',
      }),
      new ScanTracking({
        id: 2,
        scanId: 'SCN-002',
        patientName: 'Jane Smith',
        scanType: 'Brain',
        modality: 'MRI',
        technicianName: 'Tech. Mike',
        scanDate: '2023-12-02',
        duration: '45 mins',
        status: 'InProgress',
        notes: 'Sedation required',
      }),
      new ScanTracking({
        id: 3,
        scanId: 'SCN-003',
        patientName: 'Mike Johnson',
        scanType: 'Abdomen',
        modality: 'CT Scan',
        technicianName: 'Tech. Lisa',
        scanDate: '2023-12-03',
        duration: '30 mins',
        status: 'Scheduled',
        notes: '',
      }),
      new ScanTracking({
        id: 4,
        scanId: 'SCN-004',
        patientName: 'Sarah Davis',
        scanType: 'Kidney',
        modality: 'Ultrasound',
        technicianName: 'Tech. Tom',
        scanDate: '2023-12-04',
        duration: '20 mins',
        status: 'Completed',
        notes: '',
      }),
      new ScanTracking({
        id: 5,
        scanId: 'SCN-005',
        patientName: 'David Wilson',
        scanType: 'Knee',
        modality: 'X-Ray',
        technicianName: 'Tech. Sarah',
        scanDate: '2023-12-05',
        duration: '10 mins',
        status: 'Scheduled',
        notes: '',
      }),
      new ScanTracking({
        id: 6,
        scanId: 'SCN-006',
        patientName: 'Emily Taylor',
        scanType: 'Spine',
        modality: 'MRI',
        technicianName: 'Tech. Mike',
        scanDate: '2023-12-06',
        duration: '60 mins',
        status: 'Cancelled',
        notes: 'Patient refused',
      }),
      new ScanTracking({
        id: 7,
        scanId: 'SCN-007',
        patientName: 'Robert Martinez',
        scanType: 'Head',
        modality: 'CT Scan',
        technicianName: 'Tech. Lisa',
        scanDate: '2023-12-07',
        duration: '25 mins',
        status: 'Completed',
        notes: '',
      }),
      new ScanTracking({
        id: 8,
        scanId: 'SCN-008',
        patientName: 'Linda Anderson',
        scanType: 'Breast',
        modality: 'Mammogram',
        technicianName: 'Tech. Anna',
        scanDate: '2023-12-08',
        duration: '20 mins',
        status: 'Scheduled',
        notes: '',
      }),
      new ScanTracking({
        id: 9,
        scanId: 'SCN-009',
        patientName: 'William Thomas',
        scanType: 'Shoulder',
        modality: 'X-Ray',
        technicianName: 'Tech. Sarah',
        scanDate: '2023-12-09',
        duration: '15 mins',
        status: 'InProgress',
        notes: '',
      }),
      new ScanTracking({
        id: 10,
        scanId: 'SCN-010',
        patientName: 'Elizabeth Moore',
        scanType: 'Carotid',
        modality: 'Ultrasound',
        technicianName: 'Tech. Tom',
        scanDate: '2023-12-10',
        duration: '30 mins',
        status: 'Completed',
        notes: '',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addScanTracking(scanTracking: ScanTracking): Observable<ScanTracking> {
    this.dialogData = scanTracking;
    return of(scanTracking);
  }

  updateScanTracking(scanTracking: ScanTracking): Observable<ScanTracking> {
    this.dialogData = scanTracking;
    return of(scanTracking);
  }

  deleteScanTracking(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
