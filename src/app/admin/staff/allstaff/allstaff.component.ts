import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { StaffService } from './staff.service';
import { Staff } from './staff.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AllStaffFormDialog } from './dialog/form-dialog/form-dialog.component';
import { AllStaffDeleteDialogComponent } from './dialog/delete/delete.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-allstaff',
  templateUrl: './allstaff.component.html',
  styleUrls: ['./allstaff.component.scss'],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class AllstaffComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  staffService = inject(StaffService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'name', label: 'Name', type: 'nameWithImage', visible: true },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'designation', label: 'Designation', type: 'text', visible: true },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    {
      def: 'joiningDate',
      label: 'Date of Joining',
      type: 'date',
      visible: true,
    },
    { def: 'address', label: 'Address', type: 'address', visible: true },
    { def: 'salary', label: 'Salary', type: 'text', visible: true },
    { def: 'status', label: 'Status', type: 'text', visible: false },
    { def: 'shift', label: 'Shift', type: 'text', visible: true },
    {
      def: 'experienceYears',
      label: 'Experience (Years)',
      type: 'text',
      visible: false,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Staff>([]);
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
    this.staffService.getAllStaffs().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: Staff, filter: string) =>
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

  handleEdit(row: Staff) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Staff) {
    const dialogRef = this.dialog.open(AllStaffDeleteDialogComponent, {
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

  handleBulkDelete(selectedRows: Staff[]) {
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

  openDialog(action: 'add' | 'edit', data?: Staff) {
    const dialogRef = this.dialog.open(AllStaffFormDialog, {
      width: '60vw',
      maxWidth: '100vw',
      data: { staff: data, action },
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
