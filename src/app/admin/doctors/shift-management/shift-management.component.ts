import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { Subject } from 'rxjs';
import { ShiftManagementDeleteComponent } from './dialogs/delete/delete.component';
import { ShiftManagement } from './shift-management.model';
import { ShiftManagementService } from './shift-management.service';
import { ShiftManagementFormComponent } from './dialogs/form-dialog/form-dialog.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shift-management',
  templateUrl: './shift-management.component.html',
  styleUrl: './shift-management.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class ShiftManagementComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  shiftManagementService = inject(ShiftManagementService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'doctorName', label: 'Name', type: 'nameWithImage', visible: true },
    { def: 'department', label: 'Department', type: 'text', visible: true },
    { def: 'specialty', label: 'Specialization', type: 'text', visible: true },
    {
      def: 'shiftStartDate',
      label: 'Shift Start Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'shiftEndDate',
      label: 'Shift End Date',
      type: 'date',
      visible: true,
    },
    { def: 'workDays', label: 'Work Days', type: 'text', visible: true },
    { def: 'shiftHours', label: 'Shift Hours', type: 'text', visible: true },
    { def: 'shiftType', label: 'Shift Type', type: 'text', visible: true },
    {
      def: 'availabilityStatus',
      label: 'Availability Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Available: 'badge badge-solid-green',
        Unavailable: 'badge badge-solid-orange',
        'On Leave': 'badge badge-solid-purple',
      },
    },
    {
      def: 'totalHoursPerWeek',
      label: 'Total Hours/Week',
      type: 'text',
      visible: false,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<ShiftManagement>([]);
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
    this.shiftManagementService.getAllShiftDetails().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: ShiftManagement,
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

  handleEdit(row: ShiftManagement) {
    this.openDialog('edit', row);
  }

  handleDelete(row: ShiftManagement) {
    const dialogRef = this.dialog.open(ShiftManagementDeleteComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.shiftManagementService
          .deleteShiftManagement(row.doctorId)
          .subscribe({
            next: () => {
              this.dataSource.data = this.dataSource.data.filter(
                (record) => record.doctorId !== row.doctorId
              );
              this.showNotification(
                'snackbar-danger',
                'Deleted Record Successfully...!!!',
                'bottom',
                'center'
              );
            },
            error: () => { },
          });
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: ShiftManagement[]) {
    selectedRows.forEach((row) => {
      this.shiftManagementService
        .deleteShiftManagement(row.doctorId)
        .subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(
              (record) => record.doctorId !== row.doctorId
            );
          },
          error: () => { },
        });
    });
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: ShiftManagement) {
    const dialogRef = this.dialog.open(ShiftManagementFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { shiftManagement: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.shiftManagementService.addShiftManagement(result).subscribe({
            next: (newShift) => {
              this.dataSource.data = [newShift, ...this.dataSource.data];
              this.showNotification(
                'snackbar-success',
                'Added Record Successfully...!!!',
                'bottom',
                'center'
              );
            },
            error: () => { },
          });
        } else {
          this.shiftManagementService.updateShiftManagement(result).subscribe({
            next: (updatedShift) => {
              const index = this.dataSource.data.findIndex(
                (record) => record.doctorId === updatedShift.doctorId
              );
              if (index !== -1) {
                this.dataSource.data[index] = updatedShift;
                this.dataSource._updateChangeSubscription();
              }
              this.showNotification(
                'black',
                'Edited Record Successfully...!!!',
                'bottom',
                'center'
              );
            },
            error: () => { },
          });
        }
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
