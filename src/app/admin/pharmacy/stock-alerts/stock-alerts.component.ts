import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface LowStockItem {
  id: string;
  medId: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
}

interface ExpiryItem {
  id: string;
  medId: string;
  name: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'Expired' | 'Critical (30d)' | 'Warning (90d)';
}

@Component({
  selector: 'app-stock-alerts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTabsModule,
    BreadcrumbComponent,
    MasterTableComponent,
  ],
  templateUrl: './stock-alerts.component.html',
  styleUrls: ['./stock-alerts.component.scss'],
})
export class StockAlertsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  breadscrums = [
    {
      title: 'Stock Alerts',
      items: ['Pharmacy'],
      active: 'Stock Alerts',
    },
  ];

  lowStockCols: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'medId', label: 'Medicine ID', type: 'text', visible: true, sortable: true },
    { def: 'name', label: 'Medicine Name', type: 'text', visible: true, sortable: true },
    { def: 'category', label: 'Category', type: 'text', visible: true, sortable: true },
    { def: 'stock', label: 'Current Stock', type: 'text', visible: true, sortable: true },
    { def: 'threshold', label: 'Min Threshold', type: 'text', visible: true, sortable: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  expiryCols: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'medId', label: 'Medicine ID', type: 'text', visible: true, sortable: true },
    { def: 'name', label: 'Medicine Name', type: 'text', visible: true, sortable: true },
    { def: 'expiryDate', label: 'Expiry Date', type: 'date', visible: true, sortable: true },
    { def: 'daysRemaining', label: 'Days Left', type: 'text', visible: true, sortable: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      sortable: true,
      statusBadgeMap: {
        'Expired': 'badge col-red',
        'Critical (30d)': 'badge col-orange',
        'Warning (90d)': 'badge col-blue',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  lowStockDataSource = new MatTableDataSource<LowStockItem>([]);
  expiryDataSource = new MatTableDataSource<ExpiryItem>([]);

  isLoadingLow = true;
  isLoadingExpiry = true;

  ngOnInit() {
    this.loadLowStock();
    this.loadExpiryData();
  }

  loadLowStock() {
    this.isLoadingLow = true;
    setTimeout(() => {
      this.lowStockDataSource.data = [
        { id: '1', medId: 'M007', name: 'Insulin Glargine', category: 'Diabetology', stock: 15, threshold: 30 },
        { id: '2', medId: 'M003', name: 'Atorvastatin 20mg', category: 'Cardiology', stock: 43, threshold: 50 },
        { id: '3', medId: 'M012', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 8, threshold: 40 },
        { id: '4', medId: 'M018', name: 'Loperamide 2mg', category: 'Gastroenterology', stock: 5, threshold: 25 },
      ];
      this.isLoadingLow = false;
      this.cdr.markForCheck();
    }, 500);
  }

  loadExpiryData() {
    this.isLoadingExpiry = true;
    setTimeout(() => {
      this.expiryDataSource.data = [
        { id: '1', medId: 'M090', name: 'Erythromycin 250mg', expiryDate: '2026-05-15', daysRemaining: -26, status: 'Expired' },
        { id: '2', medId: 'M034', name: 'Doxycycline 100mg', expiryDate: '2026-06-25', daysRemaining: 15, status: 'Critical (30d)' },
        { id: '3', medId: 'M044', name: 'Prednisolone 5mg', expiryDate: '2026-08-10', daysRemaining: 61, status: 'Warning (90d)' },
        { id: '4', medId: 'M022', name: 'Metoprolol 50mg', expiryDate: '2026-08-30', daysRemaining: 81, status: 'Warning (90d)' },
      ];
      this.isLoadingExpiry = false;
      this.cdr.markForCheck();
    }, 600);
  }

  handleReorder(row: LowStockItem) {
    this.showNotification(`Reorder request submitted for ${row.name}. Supplier notified.`, 'snackbar-success');
  }

  handleDismissLow(row: LowStockItem) {
    this.lowStockDataSource.data = this.lowStockDataSource.data.filter(item => item.id !== row.id);
    this.showNotification(`Dismissed alert for ${row.name}`, 'black');
    this.cdr.markForCheck();
  }

  handleDispose(row: ExpiryItem) {
    this.expiryDataSource.data = this.expiryDataSource.data.filter(item => item.id !== row.id);
    this.showNotification(`Expired batch of ${row.name} marked for proper medical disposal.`, 'snackbar-success');
    this.cdr.markForCheck();
  }

  handleDismissExpiry(row: ExpiryItem) {
    this.expiryDataSource.data = this.expiryDataSource.data.filter(item => item.id !== row.id);
    this.showNotification(`Dismissed alert for ${row.name}`, 'black');
    this.cdr.markForCheck();
  }

  private showNotification(message: string, styleClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: styleClass,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
