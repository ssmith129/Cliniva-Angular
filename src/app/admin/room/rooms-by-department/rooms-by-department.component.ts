import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { LocalStorageService } from '@shared/services/storage.service';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { RoomsByDepartmentDeleteComponent } from './dialog/delete/delete.component';
import { RoomsByDepartmentFormComponent } from './dialog/form-dialog/form-dialog.component';
import { RoomsByDepartment } from './rooms-by-department.model';
import { RoomsByDepartmentService } from './rooms-by-department.service';

import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-rooms-by-department',
  templateUrl: './rooms-by-department.component.html',
  styleUrl: './rooms-by-department.component.scss',
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class RoomsByDepartmentComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  roomsByDepartmentService = inject(RoomsByDepartmentService);
  private snackBar = inject(MatSnackBar);
  private localStorageService = inject(LocalStorageService);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'room_id', label: 'Room ID', type: 'text', visible: false },
    { def: 'room_number', label: 'Room Number', type: 'text', visible: true },
    {
      def: 'department_name',
      label: 'Department',
      type: 'text',
      visible: true,
    },
    { def: 'room_type', label: 'Room Type', type: 'text', visible: true },
    { def: 'floor', label: 'Floor', type: 'text', visible: true },
    {
      def: 'bed_capacity',
      label: 'Bed Capacity',
      type: 'text',
      visible: true,
    },
    {
      def: 'occupied_beds',
      label: 'Occupied Beds',
      type: 'text',
      visible: true,
    },
    { def: 'room_status', label: 'Room Status', type: 'text', visible: true },
    {
      def: 'assigned_staff',
      label: 'Assigned Staff',
      type: 'text',
      visible: true,
    },
    { def: 'patient_id', label: 'Patient ID', type: 'text', visible: true },
    {
      def: 'room_features',
      label: 'Room Features',
      type: 'text',
      visible: true,
    },
    {
      def: 'admission_date',
      label: 'Admission Date',
      type: 'date',
      visible: false,
    },
    {
      def: 'discharge_date',
      label: 'Discharge Date',
      type: 'date',
      visible: false,
    },
    { def: 'room_rate', label: 'Room Rate', type: 'text', visible: true },
    {
      def: 'last_cleaned',
      label: 'Last Cleaned',
      type: 'date',
      visible: false,
    },
    {
      def: 'room_category',
      label: 'Room Category',
      type: 'text',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<RoomsByDepartment>([]);
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
    this.roomsByDepartmentService.getAllRoomsByDepartment().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: RoomsByDepartment,
          filter: string
        ) =>
          Object.values(data).some((value) =>
            String(value).toLowerCase().includes(filter)
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

  handleEdit(row: RoomsByDepartment) {
    this.openDialog('edit', row);
  }

  handleDelete(row: RoomsByDepartment) {
    const dialogRef = this.dialog.open(RoomsByDepartmentDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.room_id !== row.room_id
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

  handleBulkDelete(selectedRows: RoomsByDepartment[]) {
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

  openDialog(action: 'add' | 'edit', data?: RoomsByDepartment) {
    // const _varDirection: Direction =
      // this.localStorageService.get('isRtl') === 'true' ? 'rtl' : 'ltr';
    const dialogRef = this.dialog.open(RoomsByDepartmentFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { roomsByDepartment: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.room_id === result.room_id
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
