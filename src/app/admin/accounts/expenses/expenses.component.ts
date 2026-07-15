import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Expenses } from '../expenses/expenses.model';
import { ExpensesService } from '../expenses/expenses.service';
import { ExpensesDeleteComponent } from './dialog/delete/delete.component';
import { ExpensesFormComponent } from './dialog/form-dialog/form-dialog.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class ExpensesComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  expensesService = inject(ExpensesService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'expense_id', label: 'Expenses ID', type: 'text', visible: false },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'category', label: 'Category', type: 'text', visible: true },
    { def: 'description', label: 'Description', type: 'text', visible: true },
    { def: 'amount', label: 'Amount', type: 'text', visible: true },
    { def: 'vendor', label: 'Vendor', type: 'text', visible: true },
    {
      def: 'invoice_number',
      label: 'Invoice Number',
      type: 'text',
      visible: true,
    },
    {
      def: 'payment_method',
      label: 'Payment Method',
      type: 'text',
      visible: true,
    },
    { def: 'department', label: 'Department', type: 'text', visible: true },
    { def: 'budget_code', label: 'Budget Code', type: 'text', visible: false },
    {
      def: 'employee_responsible',
      label: 'Employee Responsible',
      type: 'text',
      visible: false,
    },
    {
      def: 'approval_status',
      label: 'Approval Status',
      type: 'text',
      visible: true,
    },
    {
      def: 'payment_status',
      label: 'Payment Status',
      type: 'text',
      visible: true,
    },
    { def: 'notes', label: 'Notes', type: 'text', visible: false },
    { def: 'tax', label: 'Tax', type: 'text', visible: true },
    { def: 'total_cost', label: 'Total Cost', type: 'text', visible: true },
    { def: 'currency', label: 'Currency', type: 'text', visible: false },
    { def: 'created_by', label: 'Created By', type: 'text', visible: false },
    { def: 'created_at', label: 'Created At', type: 'date', visible: false },
    { def: 'updated_by', label: 'Updated By', type: 'text', visible: false },
    { def: 'updated_at', label: 'Updated At', type: 'date', visible: false },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Expenses>([]);
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
    this.expensesService.getAllExpensesRecords().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: Expenses, filter: string) =>
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

  handleEdit(row: Expenses) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Expenses) {
    const dialogRef = this.dialog.open(ExpensesDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.expense_id !== row.expense_id
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

  handleBulkDelete(selectedRows: Expenses[]) {
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

  openDialog(action: 'add' | 'edit', data?: Expenses) {
    const dialogRef = this.dialog.open(ExpensesFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { expenses: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.expense_id === result.expense_id
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
