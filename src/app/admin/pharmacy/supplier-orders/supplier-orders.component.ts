import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface SupplierOrder {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  totalCost: string;
  status: 'Pending Approval' | 'Sent' | 'Received' | 'Cancelled';
}

@Component({
  selector: 'app-supplier-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MasterTableComponent,
  ],
  templateUrl: './supplier-orders.component.html',
  styleUrls: ['./supplier-orders.component.scss'],
})
export class SupplierOrdersComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  breadscrums = [
    {
      title: 'Supplier Orders',
      items: ['Pharmacy'],
      active: 'Supplier Orders',
    },
  ];

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'poNumber', label: 'PO Number', type: 'text', visible: true, sortable: true },
    { def: 'supplier', label: 'Supplier', type: 'text', visible: true, sortable: true },
    { def: 'orderDate', label: 'Order Date', type: 'text', visible: true, sortable: true },
    { def: 'totalCost', label: 'Total Cost', type: 'text', visible: true, sortable: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      sortable: true,
      statusBadgeMap: {
        'Pending Approval': 'badge col-orange',
        'Sent': 'badge col-blue',
        'Received': 'badge col-green',
        'Cancelled': 'badge col-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<SupplierOrder>([]);
  isLoading = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.dataSource.data = [
        { id: '1', poNumber: 'PO-9901', supplier: 'BioPharma Inc.', orderDate: '2026-06-08', totalCost: '$1,200.00', status: 'Sent' },
        { id: '2', poNumber: 'PO-9902', supplier: 'Global Meds Ltd.', orderDate: '2026-06-09', totalCost: '$850.00', status: 'Pending Approval' },
        { id: '3', poNumber: 'PO-9903', supplier: 'HealthCorp Pharmacy', orderDate: '2026-06-05', totalCost: '$2,400.00', status: 'Received' },
        { id: '4', poNumber: 'PO-9904', supplier: 'BioPharma Inc.', orderDate: '2026-06-03', totalCost: '$450.00', status: 'Cancelled' },
      ];
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 600);
  }

  handleAddOrder() {
    const nextPoNum = 'PO-' + Math.floor(9900 + Math.random() * 100).toString();
    const newOrder: SupplierOrder = {
      id: (this.dataSource.data.length + 1).toString(),
      poNumber: nextPoNum,
      supplier: 'MedLife Distributors',
      orderDate: new Date().toISOString().split('T')[0],
      totalCost: '$950.00',
      status: 'Pending Approval',
    };
    this.dataSource.data = [newOrder, ...this.dataSource.data];
    this.showNotification(`New purchase order ${nextPoNum} generated.`, 'snackbar-success');
    this.cdr.markForCheck();
  }

  handleReceive(row: SupplierOrder) {
    if (row.status === 'Received') {
      this.showNotification('Order is already marked as received.', 'snackbar-warning');
      return;
    }
    if (row.status === 'Cancelled') {
      this.showNotification('Cannot receive a cancelled order.', 'snackbar-danger');
      return;
    }

    row.status = 'Received';
    this.dataSource.data = [...this.dataSource.data];
    this.showNotification(`Order ${row.poNumber} marked as Received. Inventory updated.`, 'snackbar-success');
    this.cdr.markForCheck();
  }

  handleCancel(row: SupplierOrder) {
    if (row.status === 'Cancelled') {
      this.showNotification('Order is already cancelled.', 'snackbar-warning');
      return;
    }
    if (row.status === 'Received') {
      this.showNotification('Cannot cancel an order that has already been received.', 'snackbar-danger');
      return;
    }

    row.status = 'Cancelled';
    this.dataSource.data = [...this.dataSource.data];
    this.showNotification(`Purchase order ${row.poNumber} has been cancelled.`, 'snackbar-danger');
    this.cdr.markForCheck();
  }

  handleRefresh() {
    this.loadData();
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
