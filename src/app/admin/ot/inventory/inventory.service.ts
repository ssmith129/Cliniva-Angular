import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { InventoryItem } from './inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/inventory.json';
  dataChange: BehaviorSubject<InventoryItem[]> = new BehaviorSubject<InventoryItem[]>([]);
  dialogData: InventoryItem | null = null;

  get data(): InventoryItem[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllInventory(): Observable<InventoryItem[]> {
    const mockData: InventoryItem[] = [
      new InventoryItem({
        id: 1,
        itemId: 'INV-001',
        itemName: 'Surgical Gloves (Size 7)',
        category: 'Consumables',
        quantity: 500,
        unit: 'pairs',
        reorderLevel: 100,
        supplier: 'MedSupply Co.',
        expiryDate: '2025-12-31',
        status: 'In Stock',
        notes: 'Latex-free',
      }),
      new InventoryItem({
        id: 2,
        itemId: 'INV-002',
        itemName: 'Scalpel Blades #10',
        category: 'Instruments',
        quantity: 200,
        unit: 'pcs',
        reorderLevel: 50,
        supplier: 'Surgical Instruments Inc.',
        expiryDate: '2026-06-30',
        status: 'In Stock',
        notes: 'Stainless steel',
      }),
      new InventoryItem({
        id: 3,
        itemId: 'INV-003',
        itemName: 'Anesthesia Mask',
        category: 'Equipment',
        quantity: 15,
        unit: 'pcs',
        reorderLevel: 20,
        supplier: 'RespiraCare',
        expiryDate: '2025-09-15',
        status: 'Low Stock',
        notes: 'Adult size',
      }),
      new InventoryItem({
        id: 4,
        itemId: 'INV-004',
        itemName: 'Sutures (Vicryl 3-0)',
        category: 'Consumables',
        quantity: 300,
        unit: 'packets',
        reorderLevel: 50,
        supplier: 'MedSuture',
        expiryDate: '2025-11-20',
        status: 'In Stock',
        notes: 'Absorbable',
      }),
      new InventoryItem({
        id: 5,
        itemId: 'INV-005',
        itemName: 'Sterile Drapes',
        category: 'Linens',
        quantity: 40,
        unit: 'packs',
        reorderLevel: 50,
        supplier: 'CleanTex',
        expiryDate: '2025-05-10',
        status: 'Low Stock',
        notes: 'Large size',
      }),
      new InventoryItem({
        id: 6,
        itemId: 'INV-006',
        itemName: 'Foley Catheter (14Fr)',
        category: 'Consumables',
        quantity: 0,
        unit: 'pcs',
        reorderLevel: 20,
        supplier: 'UroMed',
        expiryDate: '2025-08-01',
        status: 'Out of Stock',
        notes: 'Latex',
      }),
      new InventoryItem({
        id: 7,
        itemId: 'INV-007',
        itemName: 'Propofol (20ml)',
        category: 'Medications',
        quantity: 100,
        unit: 'vials',
        reorderLevel: 30,
        supplier: 'PharmaPlus',
        expiryDate: '2024-12-31',
        status: 'In Stock',
        notes: 'Refrigerate',
      }),
      new InventoryItem({
        id: 8,
        itemId: 'INV-008',
        itemName: 'Cautery Pencil',
        category: 'Instruments',
        quantity: 45,
        unit: 'pcs',
        reorderLevel: 50,
        supplier: 'ElectroSurg',
        expiryDate: '2025-10-15',
        status: 'Low Stock',
        notes: 'Disposable button switch',
      }),
      new InventoryItem({
        id: 9,
        itemId: 'INV-009',
        itemName: 'Laryngoscope Blade (Mac 3)',
        category: 'Equipment',
        quantity: 5,
        unit: 'pcs',
        reorderLevel: 5,
        supplier: 'AirwayTech',
        expiryDate: '2030-01-01',
        status: 'Low Stock',
        notes: 'Fiber optic',
      }),
      new InventoryItem({
        id: 10,
        itemId: 'INV-010',
        itemName: 'Suction Canister (2L)',
        category: 'Disposables',
        quantity: 150,
        unit: 'pcs',
        reorderLevel: 40,
        supplier: 'VacuMed',
        expiryDate: '2026-03-20',
        status: 'In Stock',
        notes: 'Single use',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addInventoryItem(item: InventoryItem): Observable<InventoryItem> {
    this.dialogData = item;
    return of(item);
  }

  updateInventoryItem(item: InventoryItem): Observable<InventoryItem> {
    this.dialogData = item;
    return of(item);
  }

  deleteInventoryItem(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
