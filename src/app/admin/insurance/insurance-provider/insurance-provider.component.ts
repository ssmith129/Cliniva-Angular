import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { InsuranceProviderDeleteComponent } from './dialogs/delete/delete.component';
import { AllInsuranceProviderFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { InsuranceProvider } from './insurance-provider.model';
import { InsuranceProviderService } from './insurance-provider.service';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-insurance-provider',
  templateUrl: './insurance-provider.component.html',
  styleUrl: './insurance-provider.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class InsuranceProviderComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  insuranceProviderService = inject(InsuranceProviderService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    {
      def: 'insuranceProviderId',
      label: 'Provider ID',
      type: 'text',
      visible: false,
    },
    {
      def: 'providerName',
      label: 'Provider Name',
      type: 'text',
      visible: true,
    },
    {
      def: 'providerCode',
      label: 'Provider Code',
      type: 'text',
      visible: true,
    },
    {
      def: 'contactPhone',
      label: 'Contact Phone',
      type: 'phone',
      visible: true,
    },
    {
      def: 'contactEmail',
      label: 'Contact Email',
      type: 'email',
      visible: true,
    },
    { def: 'address', label: 'Address', type: 'address', visible: true },
    { def: 'websiteUrl', label: 'Website URL', type: 'text', visible: true },
    {
      def: 'customerSupportNumber',
      label: 'Customer Support Number',
      type: 'phone',
      visible: true,
    },
    {
      def: 'paymentTerms',
      label: 'Payment Terms',
      type: 'text',
      visible: false,
    },
    {
      def: 'contractStartDate',
      label: 'Contract Start Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'contractEndDate',
      label: 'Contract End Date',
      type: 'date',
      visible: false,
    },
    {
      def: 'reimbursementRate',
      label: 'Reimbursement Rate',
      type: 'text',
      visible: true,
    },
    {
      def: 'coverageTypes',
      label: 'Coverage Types',
      type: 'text',
      visible: true,
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge badge-solid-green',
        Inactive: 'badge badge-solid-orange',
      },
    },
    {
      def: 'contractNotes',
      label: 'Contract Notes',
      type: 'text',
      visible: false,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<InsuranceProvider>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.isLoading = true;
    this.insuranceProviderService.getAllInsuranceProviders().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: InsuranceProvider,
          filter: string
        ) =>
          Object.values(data).some((value) =>
            value.toString().toLowerCase().includes(filter)
          );
      },
      error: (_err) => {
        this.isLoading = false;
      },
    });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: InsuranceProvider) {
    this.openDialog('edit', row);
  }

  handleDelete(row: InsuranceProvider) {
    const dialogRef = this.dialog.open(InsuranceProviderDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.insuranceProviderId !== row.insuranceProviderId
        );
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: InsuranceProvider[]) {
    this.dataSource.data = this.dataSource.data.filter(
      (item) => !selectedRows.includes(item)
    );
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: InsuranceProvider) {
    const dialogRef = this.dialog.open(AllInsuranceProviderFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { insuranceProvider: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) =>
              record.insuranceProviderId === result.insuranceProviderId
          );
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource._updateChangeSubscription();
          }
        }
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`,
          'bottom',
          'center'
        );
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
