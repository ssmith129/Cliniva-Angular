import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PharmacyReport } from './pharmacy-reports.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class PharmacyReportsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<PharmacyReport[]> = new BehaviorSubject<PharmacyReport[]>([]);
  dialogData!: PharmacyReport;

  get data(): PharmacyReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllPharmacyReports(): Observable<PharmacyReport[]> {
    const mockData: PharmacyReport[] = [
      { id: 1, medicineName: 'Paracetamol 500mg', category: 'Analgesic', unitsSold: 1240, revenue: 6200, stockMovement: -1240, expiryDate: '2025-06-30', status: 'In Stock', date: '2024-11-30', getRandomID: () => 0 },
      { id: 2, medicineName: 'Amoxicillin 250mg', category: 'Antibiotic', unitsSold: 680, revenue: 8840, stockMovement: -680, expiryDate: '2025-03-15', status: 'Low Stock', date: '2024-11-30', getRandomID: () => 0 },
      { id: 3, medicineName: 'Metformin 500mg', category: 'Antidiabetic', unitsSold: 920, revenue: 11500, stockMovement: -920, expiryDate: '2025-08-20', status: 'In Stock', date: '2024-11-30', getRandomID: () => 0 },
      { id: 4, medicineName: 'Atorvastatin 10mg', category: 'Statin', unitsSold: 560, revenue: 16800, stockMovement: -560, expiryDate: '2025-05-10', status: 'In Stock', date: '2024-11-30', getRandomID: () => 0 },
      { id: 5, medicineName: 'Omeprazole 20mg', category: 'PPI', unitsSold: 740, revenue: 5920, stockMovement: -740, expiryDate: '2024-12-31', status: 'Near Expiry', date: '2024-11-30', getRandomID: () => 0 },
      { id: 6, medicineName: 'Ibuprofen 400mg', category: 'NSAID', unitsSold: 1100, revenue: 4400, stockMovement: -1100, expiryDate: '2025-07-25', status: 'In Stock', date: '2024-11-30', getRandomID: () => 0 },
      { id: 7, medicineName: 'Amlodipine 5mg', category: 'Antihypertensive', unitsSold: 430, revenue: 6450, stockMovement: -430, expiryDate: '2025-09-14', status: 'In Stock', date: '2024-11-30', getRandomID: () => 0 },
      { id: 8, medicineName: 'Cetirizine 10mg', category: 'Antihistamine', unitsSold: 820, revenue: 3280, stockMovement: -820, expiryDate: '2024-12-05', status: 'Near Expiry', date: '2024-11-30', getRandomID: () => 0 },
      { id: 9, medicineName: 'Azithromycin 500mg', category: 'Antibiotic', unitsSold: 310, revenue: 9300, stockMovement: -310, expiryDate: '2025-04-18', status: 'Low Stock', date: '2024-11-30', getRandomID: () => 0 },
      { id: 10, medicineName: 'Insulin Glargine', category: 'Insulin', unitsSold: 180, revenue: 54000, stockMovement: -180, expiryDate: '2025-02-28', status: 'Low Stock', date: '2024-11-30', getRandomID: () => 0 },
    ];
    return of(mockData);
  }

  addPharmacyReport(report: PharmacyReport): Observable<PharmacyReport> {
    this.dialogData = report;
    return of(report);
  }

  updatePharmacyReport(report: PharmacyReport): Observable<PharmacyReport> {
    this.dialogData = report;
    return of(report);
  }

  deletePharmacyReport(id: number): Observable<number> {
    return of(id);
  }
}
