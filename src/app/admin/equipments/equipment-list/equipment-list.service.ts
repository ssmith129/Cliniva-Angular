import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Equipment } from './equipment-list.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentListService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>([]);
  dialogData: Equipment | null = null;

  get data(): Equipment[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllEquipment(): Observable<Equipment[]> {
    const mockData: Equipment[] = [
      new Equipment({
        id: 1,
        equipment_id: 'EQ-001',
        equipment_name: 'MRI Scanner',
        category: 'Diagnostic',
        department: 'Radiology',
        manufacturer: 'Siemens',
        model_number: 'Magnetom Aera',
        serial_number: 'SN-123456',
        purchase_date: '2023-01-15',
        purchase_cost: '$1,200,000',
        warranty_expiry: '2026-01-15',
        status: 'Operational',
        location: 'Room 101',
        notes: 'Annual maintenance required.',
      }),
      new Equipment({
        id: 2,
        equipment_id: 'EQ-002',
        equipment_name: 'Ventilator',
        category: 'Life Support',
        department: 'ICU',
        manufacturer: 'Philips',
        model_number: 'Trilogy Evo',
        serial_number: 'SN-789012',
        purchase_date: '2023-05-20',
        purchase_cost: '$25,000',
        warranty_expiry: '2025-05-20',
        status: 'Under Maintenance',
        location: 'ICU Bed 1',
        notes: 'Filter replacement due.',
      }),
      new Equipment({
        id: 3,
        equipment_id: 'EQ-003',
        equipment_name: 'Anesthesia Machine',
        category: 'Surgical',
        department: 'Operation Theatre',
        manufacturer: 'GE Healthcare',
        model_number: 'Aisys CS2',
        serial_number: 'SN-345678',
        purchase_date: '2022-11-10',
        purchase_cost: '$50,000',
        warranty_expiry: '2025-11-10',
        status: 'Operational',
        location: 'OT 1',
        notes: '',
      }),
      new Equipment({
        id: 4,
        equipment_id: 'EQ-004',
        equipment_name: 'Defibrillator',
        category: 'Life Support',
        department: 'Emergency',
        manufacturer: 'Zoll',
        model_number: 'R Series',
        serial_number: 'SN-901234',
        purchase_date: '2023-08-05',
        purchase_cost: '$15,000',
        warranty_expiry: '2026-08-05',
        status: 'Operational',
        location: 'ER Triage',
        notes: 'Battery check daily.',
      }),
      new Equipment({
        id: 5,
        equipment_id: 'EQ-005',
        equipment_name: 'X-Ray Machine',
        category: 'Diagnostic',
        department: 'Radiology',
        manufacturer: 'Fujifilm',
        model_number: 'FCR Capsula',
        serial_number: 'SN-567890',
        purchase_date: '2022-03-25',
        purchase_cost: '$80,000',
        warranty_expiry: '2025-03-25',
        status: 'Out of Service',
        location: 'Room 102',
        notes: 'Waiting for parts.',
      }),
      new Equipment({
        id: 6,
        equipment_id: 'EQ-006',
        equipment_name: 'Patient Monitor',
        category: 'Monitoring',
        department: 'General Ward',
        manufacturer: 'Mindray',
        model_number: 'uMEC12',
        serial_number: 'SN-234567',
        purchase_date: '2023-10-12',
        purchase_cost: '$2,500',
        warranty_expiry: '2025-10-12',
        status: 'Operational',
        location: 'Ward A',
        notes: '',
      }),
      new Equipment({
        id: 7,
        equipment_id: 'EQ-007',
        equipment_name: 'Ultrasound',
        category: 'Diagnostic',
        department: 'Cardiology',
        manufacturer: 'Samsung',
        model_number: 'HS40',
        serial_number: 'SN-890123',
        purchase_date: '2023-06-30',
        purchase_cost: '$45,000',
        warranty_expiry: '2026-06-30',
        status: 'Operational',
        location: 'Echo Lab',
        notes: '',
      }),
      new Equipment({
        id: 8,
        equipment_id: 'EQ-008',
        equipment_name: 'Centrifuge',
        category: 'Laboratory',
        department: 'Laboratory',
        manufacturer: 'Thermo Fisher',
        model_number: 'Sorvall',
        serial_number: 'SN-456789',
        purchase_date: '2022-09-15',
        purchase_cost: '$5,000',
        warranty_expiry: '2024-09-15',
        status: 'Retired',
        location: 'Lab Room 2',
        notes: 'Replaced by newer model.',
      }),
      new Equipment({
        id: 9,
        equipment_id: 'EQ-009',
        equipment_name: 'Infusion Pump',
        category: 'Therapeutic',
        department: 'ICU',
        manufacturer: 'B. Braun',
        model_number: 'Infusomat',
        serial_number: 'SN-012345',
        purchase_date: '2023-04-18',
        purchase_cost: '$1,800',
        warranty_expiry: '2025-04-18',
        status: 'Operational',
        location: 'ICU Bed 2',
        notes: '',
      }),
      new Equipment({
        id: 10,
        equipment_id: 'EQ-010',
        equipment_name: 'Wheelchair',
        category: 'Mobility',
        department: 'General Ward',
        manufacturer: 'Invacare',
        model_number: 'Tracer SX5',
        serial_number: 'SN-678901',
        purchase_date: '2023-02-28',
        purchase_cost: '$500',
        warranty_expiry: '2024-02-28',
        status: 'Operational',
        location: 'Reception',
        notes: '',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    this.dialogData = equipment;
    return of(equipment);
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    this.dialogData = equipment;
    return of(equipment);
  }

  deleteEquipment(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
