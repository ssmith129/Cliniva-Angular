import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DisposalLog } from './disposal-logs.model';

@Injectable({
  providedIn: 'root',
})
export class DisposalLogsService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<DisposalLog[]> = new BehaviorSubject<DisposalLog[]>([]);
  dialogData: unknown;

  get data(): DisposalLog[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllDisposalLogs(): Observable<DisposalLog[]> {
    const mockData: DisposalLog[] = [
      new DisposalLog({
        id: 1,
        disposal_id: 'DISP-001',
        waste_id: 'WST-001',
        waste_type: 'Biomedical Waste',
        quantity: '5.2',
        disposal_date: '2023-12-05',
        disposal_time: '14:30',
        disposal_method: 'Incineration',
        vendor_name: 'MedWaste Solutions',
        vendor_license: 'LIC-12345',
        transport_vehicle: 'TV-001',
        authorized_by: 'Dr. Smith',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-001',
        notes: 'Safely incinerated',
      }),
      new DisposalLog({
        id: 2,
        disposal_id: 'DISP-002',
        waste_id: 'WST-002',
        waste_type: 'Sharps',
        quantity: '1.5',
        disposal_date: '2023-12-06',
        disposal_time: '10:00',
        disposal_method: 'Autoclaving',
        vendor_name: 'CleanEarth Inc.',
        vendor_license: 'LIC-67890',
        transport_vehicle: 'TV-002',
        authorized_by: 'Dr. Jones',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-002',
        notes: 'Sterilized and shredded',
      }),
      new DisposalLog({
        id: 3,
        disposal_id: 'DISP-003',
        waste_id: 'WST-004',
        waste_type: 'Chemical Waste',
        quantity: '2.5',
        disposal_date: '2023-12-07',
        disposal_time: '11:15',
        disposal_method: 'Chemical Treatment',
        vendor_name: 'ChemSafe Disposal',
        vendor_license: 'LIC-11223',
        transport_vehicle: 'TV-003',
        authorized_by: 'Dr. Brown',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-003',
        notes: 'Neutralized and verified',
      }),
      new DisposalLog({
        id: 4,
        disposal_id: 'DISP-004',
        waste_id: 'WST-005',
        waste_type: 'General Waste',
        quantity: '10.0',
        disposal_date: '2023-12-08',
        disposal_time: '16:00',
        disposal_method: 'Landfill',
        vendor_name: 'City Municipal Corp',
        vendor_license: 'LIC-33445',
        transport_vehicle: 'TV-004',
        authorized_by: 'Mr. White',
        compliance_status: 'Non-Compliant',
        certificate_number: '',
        notes: 'Sent to landfill, pending audit',
      }),
      new DisposalLog({
        id: 5,
        disposal_id: 'DISP-005',
        waste_id: 'WST-006',
        waste_type: 'Recyclable Waste',
        quantity: '8.0',
        disposal_date: '2023-12-09',
        disposal_time: '09:00',
        disposal_method: 'Recycling',
        vendor_name: 'Green Recycle Ltd.',
        vendor_license: 'LIC-55667',
        transport_vehicle: 'TV-005',
        authorized_by: 'Ms. Green',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-005',
        notes: 'Sorted and recycled',
      }),
      new DisposalLog({
        id: 6,
        disposal_id: 'DISP-006',
        waste_id: 'WST-007',
        waste_type: 'Radioactive Waste',
        quantity: '0.5',
        disposal_date: '2023-12-10',
        disposal_time: '13:45',
        disposal_method: 'Microwave Treatment',
        vendor_name: 'RadSafe Co.',
        vendor_license: 'LIC-99887',
        transport_vehicle: 'TV-006',
        authorized_by: 'Dr. Atom',
        compliance_status: 'Under Review',
        certificate_number: '',
        notes: 'Stored for decay, then treated',
      }),
      new DisposalLog({
        id: 7,
        disposal_id: 'DISP-007',
        waste_id: 'WST-008',
        waste_type: 'Biomedical Waste',
        quantity: '6.0',
        disposal_date: '2023-12-11',
        disposal_time: '15:20',
        disposal_method: 'Incineration',
        vendor_name: 'MedWaste Solutions',
        vendor_license: 'LIC-12345',
        transport_vehicle: 'TV-001',
        authorized_by: 'Dr. Smith',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-007',
        notes: 'Routine collection',
      }),
      new DisposalLog({
        id: 8,
        disposal_id: 'DISP-008',
        waste_id: 'WST-009',
        waste_type: 'Sharps',
        quantity: '2.0',
        disposal_date: '2023-12-12',
        disposal_time: '11:00',
        disposal_method: 'Autoclaving',
        vendor_name: 'CleanEarth Inc.',
        vendor_license: 'LIC-67890',
        transport_vehicle: 'TV-002',
        authorized_by: 'Dr. Jones',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-008',
        notes: 'No issues reported',
      }),
       new DisposalLog({
        id: 9,
        disposal_id: 'DISP-009',
        waste_id: 'WST-010',
        waste_type: 'General Waste',
        quantity: '12.0',
        disposal_date: '2023-12-13',
        disposal_time: '17:30',
        disposal_method: 'Landfill',
        vendor_name: 'City Municipal Corp',
        vendor_license: 'LIC-33445',
        transport_vehicle: 'TV-004',
        authorized_by: 'Mr. White',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-009',
        notes: 'Disposed at designated site',
      }),
      new DisposalLog({
        id: 10,
        disposal_id: 'DISP-010',
        waste_id: 'WST-003',
        waste_type: 'Pharmaceutical Waste',
        quantity: '3.0',
        disposal_date: '2023-12-14',
        disposal_time: '10:45',
        disposal_method: 'Incineration',
        vendor_name: 'MedWaste Solutions',
        vendor_license: 'LIC-12345',
        transport_vehicle: 'TV-001',
        authorized_by: 'Dr. Smith',
        compliance_status: 'Compliant',
        certificate_number: 'CERT-010',
        notes: 'Witnessed destruction',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addDisposalLog(log: DisposalLog): Observable<DisposalLog> {
    this.dialogData = log;
    return of(log);
  }

  updateDisposalLog(log: DisposalLog): Observable<DisposalLog> {
    this.dialogData = log;
    return of(log);
  }

  deleteDisposalLog(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
