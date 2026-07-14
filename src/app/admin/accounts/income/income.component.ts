import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { IncomeDeleteComponent } from './dialog/delete/delete.component';
import { IncomeFormComponent } from './dialog/form-dialog/form-dialog.component';
import { Income } from './income.model';
import { IncomeService } from './income.service';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class IncomeComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  incomeService = inject(IncomeService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'incomeId', label: 'Income ID', type: 'text', visible: false },
    { def: 'patientId', label: 'Patient ID', type: 'text', visible: true },
    { def: 'patientName', label: 'Patient Name', type: 'nameWithImage', visible: true },
    { def: 'serviceType', label: 'Service Type', type: 'text', visible: true },
    { def: 'serviceDate', label: 'Service Date', type: 'date', visible: true },
    {
      def: 'amountBilled',
      label: 'Amount Billed',
      type: 'text',
      visible: true,
    },
    { def: 'amountPaid', label: 'Amount Paid', type: 'text', visible: true },
    {
      def: 'paymentMethod',
      label: 'Payment Method',
      type: 'text',
      visible: true,
    },
    {
      def: 'insuranceAmount',
      label: 'Insurance Amount',
      type: 'text',
      visible: true,
    },
    {
      def: 'outstandingAmount',
      label: 'Outstanding Amount',
      type: 'text',
      visible: true,
    },
    { def: 'paymentDate', label: 'Payment Date', type: 'date', visible: true },
    {
      def: 'paymentStatus',
      label: 'Payment Status',
      type: 'text',
      visible: true,
    },
    { def: 'doctorId', label: 'Doctor ID', type: 'text', visible: false },
    { def: 'doctorFee', label: 'Doctor Fee', type: 'text', visible: false },
    { def: 'createdBy', label: 'Created By', type: 'text', visible: false },
    { def: 'createdAt', label: 'Created At', type: 'date', visible: false },
    { def: 'updatedBy', label: 'Updated By', type: 'text', visible: false },
    { def: 'updatedAt', label: 'Updated At', type: 'date', visible: false },
    { def: 'incomeType', label: 'Income Type', type: 'text', visible: true },
    { def: 'notes', label: 'Notes', type: 'text', visible: false },
    {
      def: 'invoiceNumber',
      label: 'Invoice Number',
      type: 'text',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Income>([]);
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
    this.incomeService.getAllIncomeRecords().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: Income, filter: string) =>
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

  handleEdit(row: Income) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Income) {
    const dialogRef = this.dialog.open(IncomeDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.incomeId !== row.incomeId
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

  handleBulkDelete(selectedRows: Income[]) {
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

  openDialog(action: 'add' | 'edit', data?: Income) {
    const dialogRef = this.dialog.open(IncomeFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { income: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.incomeId === result.incomeId
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
