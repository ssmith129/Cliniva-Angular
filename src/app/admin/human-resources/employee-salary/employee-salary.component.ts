import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { EmployeeSalaryService } from './employee-salary.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeSalary } from './employee-salary.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { EmployeeSalaryFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { EmployeeSalaryDeleteComponent } from './dialogs/delete/delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss'],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class EmployeeSalaryComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  employeeSalaryService = inject(EmployeeSalaryService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'empID', label: 'Employee ID', type: 'text', visible: false },
    {
      def: 'name',
      label: 'Employee Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    { def: 'role', label: 'Role', type: 'text', visible: false },
    { def: 'department', label: 'Department', type: 'text', visible: true },
    { def: 'salary', label: 'Salary', type: 'text', visible: true },
    { def: 'bonus', label: 'Bonus', type: 'text', visible: true },
    { def: 'deductions', label: 'Deductions', type: 'text', visible: true },
    { def: 'netSalary', label: 'Net Salary', type: 'text', visible: true },
    { def: 'payslip', label: 'Payslip', type: 'file', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<EmployeeSalary>([]);
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
    this.employeeSalaryService.getAllEmployeeSalaries().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: EmployeeSalary,
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

  handleEdit(row: EmployeeSalary) {
    this.openDialog('edit', row);
  }

  handleDelete(row: EmployeeSalary) {
    const dialogRef = this.dialog.open(EmployeeSalaryDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.id !== row.id
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

  handleBulkDelete(selectedRows: EmployeeSalary[]) {
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

  openDialog(action: 'add' | 'edit', data?: EmployeeSalary) {
    const dialogRef = this.dialog.open(EmployeeSalaryFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { employeeSalary: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.id === result.id
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
