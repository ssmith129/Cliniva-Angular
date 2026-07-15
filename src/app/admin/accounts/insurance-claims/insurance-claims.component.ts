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

interface InsuranceClaim {
  claimId: string;
  patientName: string;
  insuranceProvider: string;
  policyNumber: string;
  claimAmount: string;
  approvedAmount?: string;
  status: 'Approved' | 'Submitted' | 'Rejected' | 'Under Review';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-insurance-claims',
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
  templateUrl: './insurance-claims.component.html',
  styleUrls: ['./insurance-claims.component.scss'],
})
export class InsuranceClaimsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  searchText = signal('');
  statusFilter = signal('All');
  isLoading = false;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'claimId', label: 'Claim ID', type: 'text', visible: true, sortable: true },
    { def: 'patientName', label: 'Patient Name', type: 'text', visible: true, sortable: true },
    { def: 'insuranceProvider', label: 'Insurance Provider', type: 'text', visible: true, sortable: true },
    { def: 'policyNumber', label: 'Policy Number', type: 'text', visible: true, sortable: true },
    { def: 'claimAmount', label: 'Claim Amount', type: 'text', visible: true, sortable: true },
    { def: 'approvedAmount', label: 'Approved Amount', type: 'text', visible: true, sortable: true },
    { 
      def: 'status', 
      label: 'Status', 
      type: 'status', 
      visible: true, 
      sortable: true,
      statusBadgeMap: {
        'Approved': 'badge-solid-green',
        'Submitted': 'badge-solid-blue',
        'Under Review': 'badge-solid-orange',
        'Rejected': 'badge-solid-red'
      }
    }
  ];

  dataSource = new MatTableDataSource<InsuranceClaim>([]);

  private initialData: InsuranceClaim[] = [
    { claimId: 'CLM-0982', patientName: 'Martha Williams', insuranceProvider: 'Blue Cross Shield', policyNumber: 'BCS-7829-X8', claimAmount: '$1,250.00', approvedAmount: '$1,250.00', status: 'Approved' },
    { claimId: 'CLM-0983', patientName: 'William Smith', insuranceProvider: 'Aetna Health', policyNumber: 'AET-2894-P2', claimAmount: '$350.00', approvedAmount: '$350.00', status: 'Approved' },
    { claimId: 'CLM-0984', patientName: 'Nancy Taylor', insuranceProvider: 'Cigna Health', policyNumber: 'CIG-9041-A9', claimAmount: '$850.00', approvedAmount: '-', status: 'Under Review' },
    { claimId: 'CLM-0985', patientName: 'Jane Brown', insuranceProvider: 'United Healthcare', policyNumber: 'UHC-2918-B5', claimAmount: '$620.00', approvedAmount: '-', status: 'Rejected' },
    { claimId: 'CLM-0986', patientName: 'Eliza Johnson', insuranceProvider: 'Humana Inc.', policyNumber: 'HUM-8012-H1', claimAmount: '$1,100.00', approvedAmount: '-', status: 'Submitted' },
    { claimId: 'CLM-0987', patientName: 'Margaret Wilson', insuranceProvider: 'Blue Cross Shield', policyNumber: 'BCS-2831-Y9', claimAmount: '$150.00', approvedAmount: '$120.00', status: 'Approved' }
  ];

  ngOnInit() {
    this.dataSource.data = this.initialData;
  }

  onFilterChange() {
    let list = this.initialData;
    const query = this.searchText().toLowerCase().trim();
    const status = this.statusFilter();

    if (query) {
      list = list.filter(c => 
        c.claimId.toLowerCase().includes(query) || 
        c.patientName.toLowerCase().includes(query) ||
        c.insuranceProvider.toLowerCase().includes(query)
      );
    }

    if (status !== 'All') {
      list = list.filter(c => c.status === status);
    }

    this.dataSource.data = list;
  }

  fileClaim() {
    this.snackBar.open('Filing new insurance claim. Redirecting to Patient Claims Form...', 'Close', { duration: 3000 });
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
