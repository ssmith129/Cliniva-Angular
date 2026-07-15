import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { RoomService } from './room.service';
import { Room } from './room.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AllRoomFormComponent } from './dialog/form-dialog/form-dialog.component';
import { AllRoomDeleteComponent } from './dialog/delete/delete.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-allroom',
  templateUrl: './allroom.component.html',
  styleUrls: ['./allroom.component.scss'],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class AllroomComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  roomService = inject(RoomService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'roomNo', label: 'Room No', type: 'text', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'roomType', label: 'Room Type', type: 'text', visible: true },
    { def: 'bedNo', label: 'Bed No', type: 'text', visible: true },
    { def: 'admitDate', label: 'Admission Date', type: 'date', visible: true },
    {
      def: 'dischargeDate',
      label: 'Discharge Date',
      type: 'date',
      visible: false,
    },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'age', label: 'Age', type: 'text', visible: false },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    { def: 'email', label: 'Email', type: 'email', visible: false },
    {
      def: 'doctorAssigned',
      label: 'Doctor Assigned',
      type: 'text',
      visible: true,
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Available: 'badge badge-solid-green',
        Discharged: 'badge badge-solid-orange',
        Reserved: 'badge badge-solid-purple',
        Maintenance: 'badge badge-solid-red',
      },
    },
    {
      def: 'amountCharged',
      label: 'Amount Charged',
      type: 'text',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Room>([]);
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
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: Room, filter: string) =>
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

  handleEdit(row: Room) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Room) {
    const dialogRef = this.dialog.open(AllRoomDeleteComponent, {
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

  handleBulkDelete(selectedRows: Room[]) {
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

  openDialog(action: 'add' | 'edit', data?: Room) {
    const dialogRef = this.dialog.open(AllRoomFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { room: data, action },
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
