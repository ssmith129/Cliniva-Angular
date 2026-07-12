import { Component, ChangeDetectionStrategy, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface PaymentReceipt {
  receiptNo: string;
  patientName: string;
  date: string;
  amount: string;
  paymentMethod: 'Cash' | 'Credit Card' | 'Insurance' | 'Bank Transfer';
  status: 'Cleared' | 'Pending' | 'Failed';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-payment-receipts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BreadcrumbComponent,
    MasterTableComponent
  ],
  templateUrl: './payment-receipts.component.html',
  styleUrls: ['./payment-receipts.component.scss'],
})
export class PaymentReceiptsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  searchText = signal('');
  statusFilter = signal('All');
  isLoading = false;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'receiptNo', label: 'Receipt No', type: 'text', visible: true, sortable: true },
    { def: 'patientName', label: 'Patient Name', type: 'text', visible: true, sortable: true },
    { def: 'date', label: 'Date', type: 'date', visible: true, sortable: true },
    { def: 'amount', label: 'Amount', type: 'text', visible: true, sortable: true },
    { def: 'paymentMethod', label: 'Payment Method', type: 'text', visible: true, sortable: true },
    { 
      def: 'status', 
      label: 'Status', 
      type: 'status', 
      visible: true, 
      sortable: true,
      statusBadgeMap: {
        'Cleared': 'badge-solid-green',
        'Pending': 'badge-solid-orange',
        'Failed': 'badge-solid-red'
      }
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true }
  ];

  dataSource = new MatTableDataSource<PaymentReceipt>([]);

  private initialData: PaymentReceipt[] = [
    { receiptNo: 'REC-2026-001', patientName: 'William Smith', date: '2026-06-08', amount: '$350.00', paymentMethod: 'Credit Card', status: 'Cleared' },
    { receiptNo: 'REC-2026-002', patientName: 'Martha Williams', date: '2026-06-07', amount: '$1,250.00', paymentMethod: 'Insurance', status: 'Cleared' },
    { receiptNo: 'REC-2026-003', patientName: 'Joseph Clark', date: '2026-06-06', amount: '$80.00', paymentMethod: 'Cash', status: 'Cleared' },
    { receiptNo: 'REC-2026-004', patientName: 'Nancy Taylor', date: '2026-06-05', amount: '$450.00', paymentMethod: 'Bank Transfer', status: 'Pending' },
    { receiptNo: 'REC-2026-005', patientName: 'Margaret Wilson', date: '2026-06-04', amount: '$150.00', paymentMethod: 'Credit Card', status: 'Cleared' },
    { receiptNo: 'REC-2026-006', patientName: 'Jane Brown', date: '2026-06-03', amount: '$620.00', paymentMethod: 'Insurance', status: 'Failed' },
    { receiptNo: 'REC-2026-007', patientName: 'John Deo', date: '2026-06-02', amount: '$95.00', paymentMethod: 'Cash', status: 'Cleared' },
    { receiptNo: 'REC-2026-008', patientName: 'Eliza Johnson', date: '2026-06-01', amount: '$1,100.00', paymentMethod: 'Bank Transfer', status: 'Cleared' }
  ];

  ngOnInit() {
    this.dataSource.data = this.initialData;
  }

  onFilterChange() {
    let list = this.initialData;
    const query = this.searchText().toLowerCase().trim();
    const status = this.statusFilter();

    if (query) {
      list = list.filter(r => 
        r.receiptNo.toLowerCase().includes(query) || 
        r.patientName.toLowerCase().includes(query)
      );
    }

    if (status !== 'All') {
      list = list.filter(r => r.status === status);
    }

    this.dataSource.data = list;
  }

  printReceipt(receipt: PaymentReceipt) {
    this.snackBar.open(`Generating printable view for Receipt No: ${receipt.receiptNo}`, 'Close', { duration: 3000 });
  }

  handleRefresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.dataSource.data = [...this.initialData];
      this.searchText.set('');
      this.statusFilter.set('All');
      this.isLoading = false;
    }, 500);
  }
}
