import { Component, ChangeDetectionStrategy, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

interface TaxRecord {
  quarter: string;
  grossRevenue: string;
  taxableAmount: string;
  taxRatePercent: string;
  taxDue: string;
  status: 'Paid' | 'Filed' | 'Pending';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tax-reports',
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
  templateUrl: './tax-reports.component.html',
  styleUrls: ['./tax-reports.component.scss'],
})
export class TaxReportsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  statusFilter = signal('All');
  isLoading = false;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'quarter', label: 'Quarterly Period', type: 'text', visible: true, sortable: true },
    { def: 'grossRevenue', label: 'Gross Revenue', type: 'text', visible: true, sortable: true },
    { def: 'taxableAmount', label: 'Taxable Amount', type: 'text', visible: true, sortable: true },
    { def: 'taxRatePercent', label: 'Tax Rate (%)', type: 'text', visible: true, sortable: true },
    { def: 'taxDue', label: 'Tax Due', type: 'text', visible: true, sortable: true },
    { 
      def: 'status', 
      label: 'Status', 
      type: 'status', 
      visible: true, 
      sortable: true,
      statusBadgeMap: {
        'Paid': 'badge-solid-green',
        'Filed': 'badge-solid-blue',
        'Pending': 'badge-solid-orange'
      }
    }
  ];

  dataSource = new MatTableDataSource<TaxRecord>([]);

  private initialData: TaxRecord[] = [
    { quarter: '2026 - Q1 (Jan - Mar)', grossRevenue: '$64,200.00', taxableAmount: '$58,000.00', taxRatePercent: '8.5%', taxDue: '$4,930.00', status: 'Paid' },
    { quarter: '2025 - Q4 (Oct - Dec)', grossRevenue: '$71,000.00', taxableAmount: '$64,000.00', taxRatePercent: '8.5%', taxDue: '$5,440.00', status: 'Paid' },
    { quarter: '2025 - Q3 (Jul - Sep)', grossRevenue: '$59,000.00', taxableAmount: '$52,000.00', taxRatePercent: '8.0%', taxDue: '$4,160.00', status: 'Paid' },
    { quarter: '2025 - Q2 (Apr - Jun)', grossRevenue: '$61,500.00', taxableAmount: '$55,000.00', taxRatePercent: '8.0%', taxDue: '$4,400.00', status: 'Paid' },
    { quarter: '2025 - Q1 (Jan - Mar)', grossRevenue: '$54,000.00', taxableAmount: '$48,000.00', taxRatePercent: '8.0%', taxDue: '$3,840.00', status: 'Paid' },
    { quarter: '2026 - Q2 (Apr - Jun)', grossRevenue: '$78,200.00', taxableAmount: '$71,000.00', taxRatePercent: '8.5%', taxDue: '$6,035.00', status: 'Pending' }
  ];

  ngOnInit() {
    this.dataSource.data = this.initialData;
  }

  onFilterChange(event: string) {
    this.statusFilter.set(event);
    if (event === 'All') {
      this.dataSource.data = this.initialData;
    } else {
      this.dataSource.data = this.initialData.filter(r => r.status === event);
    }
  }

  exportTaxReport() {
    this.snackBar.open('Exporting tax records to Excel/PDF sheet formats...', 'Close', { duration: 3000 });
  }

  handleRefresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.dataSource.data = [...this.initialData];
      this.statusFilter.set('All');
      this.isLoading = false;
    }, 500);
  }
}
