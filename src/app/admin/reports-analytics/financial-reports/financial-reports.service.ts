import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FinancialReport } from './financial-reports.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class FinancialReportsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<FinancialReport[]> = new BehaviorSubject<FinancialReport[]>([]);
  dialogData!: FinancialReport;

  get data(): FinancialReport[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllFinancialReports(): Observable<FinancialReport[]> {
    const mockData: FinancialReport[] = [
      {
        id: 1,
        transactionId: 'TRX-001',
        description: 'Patient Consultation Fee',
        amount: '$150.00',
        type: 'Income',
        date: '2024-11-25',
        status: 'Completed',
        getRandomID: () => 0
      },
      {
        id: 2,
        transactionId: 'TRX-002',
        description: 'Medical Supplies Purchase',
        amount: '$500.00',
        type: 'Expense',
        date: '2024-11-24',
        status: 'Completed',
        getRandomID: () => 0
      },
      {
        id: 3,
        transactionId: 'TRX-003',
        description: 'Lab Test Revenue',
        amount: '$300.00',
        type: 'Income',
        date: '2024-11-23',
        status: 'Completed',
        getRandomID: () => 0
      },
      {
        id: 4,
        transactionId: 'TRX-004',
        description: 'Utility Bill Payment',
        amount: '$200.00',
        type: 'Expense',
        date: '2024-11-22',
        status: 'Pending',
        getRandomID: () => 0
      },
      {
        id: 5,
        transactionId: 'TRX-005',
        description: 'Pharmacy Sales',
        amount: '$450.00',
        type: 'Income',
        date: '2024-11-21',
        status: 'Completed',
        getRandomID: () => 0
      },
      {
        id: 6,
        transactionId: 'TRX-006',
        description: 'Equipment Maintenance',
        amount: '$800.00',
        type: 'Expense',
        date: '2024-11-20',
        status: 'Completed',
        getRandomID: () => 0
      },
      {
        id: 7,
        transactionId: 'TRX-007',
        description: 'Surgery Charge',
        amount: '$1200.00',
        type: 'Income',
        date: '2024-11-19',
        status: 'Pending',
        getRandomID: () => 0
      },
      {
        id: 8,
        transactionId: 'TRX-008',
        description: 'Office Cleaning',
        amount: '$100.00',
        type: 'Expense',
        date: '2024-11-18',
        status: 'Completed',
        getRandomID: () => 0
      },
      {
        id: 9,
        transactionId: 'TRX-009',
        description: 'Ambulance Service',
        amount: '$250.00',
        type: 'Income',
        date: '2024-11-17',
        status: 'Completed',
        getRandomID: () => 0
      },
      {
        id: 10,
        transactionId: 'TRX-010',
        description: 'Staff Salary Advance',
        amount: '$5000.00',
        type: 'Expense',
        date: '2024-11-16',
        status: 'Pending',
        getRandomID: () => 0
      }
    ];
    return of(mockData);
  }

  addFinancialReport(financialReport: FinancialReport): Observable<FinancialReport> {
    this.dialogData = financialReport;
    return of(financialReport);
  }

  updateFinancialReport(financialReport: FinancialReport): Observable<FinancialReport> {
    this.dialogData = financialReport;
    return of(financialReport);
  }

  deleteFinancialReport(id: number): Observable<number> {
    return of(id);
  }
}
