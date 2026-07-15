import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { AssignDepartmentDeleteComponent } from './dialogs/delete/delete.component';
import { AssignDepartmentService } from './assign-department.service';
import { AssignDepartment } from './assign-department.model';

import { AssignDepartmentsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-assign-department',
  templateUrl: './assign-department.component.html',
  styleUrl: './assign-department.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class AssignDepartmentComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  assignDepartmentService = inject(AssignDepartmentService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'doctorName', label: 'Name', type: 'nameWithImage', visible: true },
    { def: 'department', label: 'Department', type: 'text', visible: true },
    { def: 'specialty', label: 'Specialization', type: 'text', visible: true },
    {
      def: 'shiftSchedule',
      label: 'Shift Schedule',
      type: 'text',
      visible: true,
    },
    {
      def: 'experienceLevel',
      label: 'Experience Level',
      type: 'text',
      visible: true,
    },
    {
      def: 'currentAssignmentStatus',
      label: 'Assignment Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge badge-solid-green',
        Inactive: 'badge badge-solid-orange',
        Pending: 'badge badge-solid-purple',
      },
    },
    {
      def: 'assignedDate',
      label: 'Assigned Date',
      type: 'date',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<AssignDepartment>([]);
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
    this.assignDepartmentService.getAllAssignedDoctors().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: AssignDepartment,
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

  handleEdit(row: AssignDepartment) {
    this.openDialog('edit', row);
  }

  handleDelete(row: AssignDepartment) {
    const dialogRef = this.dialog.open(AssignDepartmentDeleteComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignDepartmentService
          .deleteAssignDepartment(row.doctorId)
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
            error: (_error) => { },
          });
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: AssignDepartment[]) {
    selectedRows.forEach((row) => {
      this.assignDepartmentService
        .deleteAssignDepartment(row.doctorId)
        .subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(
              (record) => record.doctorId !== row.doctorId
            );
          },
          error: (_error) => { },
        });
    });
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: AssignDepartment) {
    const dialogRef = this.dialog.open(AssignDepartmentsFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { assignDepartment: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.assignDepartmentService.addAssignDepartment(result).subscribe({
            next: (newDoctor) => {
              this.dataSource.data = [newDoctor, ...this.dataSource.data];
              this.showNotification(
                'snackbar-success',
                'Added Record Successfully...!!!',
                'bottom',
                'center'
              );
            },
            error: (_error) => { },
          });
        } else {
          this.assignDepartmentService.updateAssignedDoctor(result).subscribe({
            next: (updatedDoctor) => {
              const index = this.dataSource.data.findIndex(
                (record) => record.doctorId === updatedDoctor.doctorId
              );
              if (index !== -1) {
                this.dataSource.data[index] = updatedDoctor;
                this.dataSource._updateChangeSubscription();
              }
              this.showNotification(
                'black',
                'Edited Record Successfully...!!!',
                'bottom',
                'center'
              );
            },
            error: (_error) => { },
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
