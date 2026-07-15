import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InventoryReport } from './inventory-reports.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class InventoryReportsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<InventoryReport[]> = new BehaviorSubject<InventoryReport[]>([]);
  dialogData!: InventoryReport;

  get data(): InventoryReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllInventoryReports(): Observable<InventoryReport[]> {
    const mockData: InventoryReport[] = [
      {
        id: 1,
        itemName: 'Paracetamol 500mg',
        category: 'Tablets',
        stockLevel: 500,
        unit: 'Strips',
        status: 'In Stock',
        lastUpdated: '2024-11-25',
        getRandomID: () => 0
      },
      {
        id: 2,
        itemName: 'Amoxicillin 250mg',
        category: 'Capsules',
        stockLevel: 50,
        unit: 'Strips',
        status: 'Low Stock',
        lastUpdated: '2024-11-24',
        getRandomID: () => 0
      },
      {
        id: 3,
        itemName: 'Cough Syrup',
        category: 'Syrups',
        stockLevel: 0,
        unit: 'Bottles',
        status: 'Out of Stock',
        lastUpdated: '2024-11-23',
        getRandomID: () => 0
      },
      {
        id: 4,
        itemName: 'Insulin Injection',
        category: 'Injections',
        stockLevel: 100,
        unit: 'Vials',
        status: 'In Stock',
        lastUpdated: '2024-11-22',
        getRandomID: () => 0
      },
      {
        id: 5,
        itemName: 'Bandages',
        category: 'Surgicals',
        stockLevel: 200,
        unit: 'Rolls',
        status: 'In Stock',
        lastUpdated: '2024-11-21',
        getRandomID: () => 0
      },
      {
        id: 6,
        itemName: 'Disposable Syringes',
        category: 'Surgicals',
        stockLevel: 1000,
        unit: 'pcs',
        status: 'In Stock',
        lastUpdated: '2024-11-20',
        getRandomID: () => 0
      },
      {
        id: 7,
        itemName: 'Vitamin C',
        category: 'Tablets',
        stockLevel: 30,
        unit: 'Strips',
        status: 'Low Stock',
        lastUpdated: '2024-11-19',
        getRandomID: () => 0
      },
      {
        id: 8,
        itemName: 'Cotton Wool',
        category: 'Surgicals',
        stockLevel: 5,
        unit: 'Rolls',
        status: 'Low Stock',
        lastUpdated: '2024-11-18',
        getRandomID: () => 0
      },
      {
        id: 9,
        itemName: 'Antiseptic Solution',
        category: 'Liquids',
        stockLevel: 150,
        unit: 'Bottles',
        status: 'In Stock',
        lastUpdated: '2024-11-17',
        getRandomID: () => 0
      },
      {
        id: 10,
        itemName: 'Face Masks',
        category: 'Consumables',
        stockLevel: 2000,
        unit: 'pcs',
        status: 'In Stock',
        lastUpdated: '2024-11-16',
        getRandomID: () => 0
      }
    ];
    return of(mockData);
  }

  addInventoryReport(inventoryReport: InventoryReport): Observable<InventoryReport> {
    this.dialogData = inventoryReport;
    return of(inventoryReport);
  }

  updateInventoryReport(inventoryReport: InventoryReport): Observable<InventoryReport> {
    this.dialogData = inventoryReport;
    return of(inventoryReport);
  }

  deleteInventoryReport(id: number): Observable<number> {
    return of(id);
  }
}
