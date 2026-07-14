import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { LeaveTypesService } from './leave-types.service';
import { MatDialog } from '@angular/material/dialog';
import { LeaveTypes } from './leave-types.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { LeaveTypesFormComponent } from './form/form.component';
import { LeaveRequestDeleteComponent } from './delete/delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-leave-types',
  templateUrl: './leave-types.component.html',
  styleUrls: ['./leave-types.component.scss'],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class LeaveTypesComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  leaveTypesService = inject(LeaveTypesService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'leave_name', label: 'Leave Name', type: 'text', visible: true },
    { def: 'type', label: 'Leave Type', type: 'text', visible: true },
    { def: 'leave_unit', label: 'Leave Unit', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge badge-solid-green',
        Deactive: 'badge badge-solid-orange',
      },
    },
    { def: 'note', label: 'Note', type: 'text', visible: false },
    {
      def: 'duration',
      label: 'Duration (Days)',
      type: 'text',
      visible: true,
    },
    { def: 'created_by', label: 'Created By', type: 'text', visible: true },
    {
      def: 'carry_over',
      label: 'Carry Over Policy',
      type: 'text',
      visible: false,
    },
    {
      def: 'notification_period',
      label: 'Notification Period',
      type: 'text',
      visible: true,
    },
    {
      def: 'max_leaves',
      label: 'Maximum Leaves',
      type: 'text',
      visible: false,
    },
    {
      def: 'annual_limit',
      label: 'Annual Limit',
      type: 'text',
      visible: false,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<LeaveTypes>([]);
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
    this.leaveTypesService.getAllLeaveTypes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: LeaveTypes, filter: string) =>
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

  handleEdit(row: LeaveTypes) {
    this.openDialog('edit', row);
  }

  handleDelete(row: LeaveTypes) {
    const dialogRef = this.dialog.open(LeaveRequestDeleteComponent, {
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

  handleBulkDelete(selectedRows: LeaveTypes[]) {
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

  openDialog(action: 'add' | 'edit', data?: LeaveTypes) {
    const dialogRef = this.dialog.open(LeaveTypesFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { leaveTypes: data, action },
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
