import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { LeavesService } from './leaves.service';
import { MatDialog } from '@angular/material/dialog';
import { Leaves } from './leaves.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { LeaveRequestFormComponent } from './form/form.component';
import { LeaveRequestDeleteComponent } from './delete/delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.scss'],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class LeaveRequestsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  leavesService = inject(LeavesService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    {
      def: 'name',
      label: 'Employee Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'employeeId', label: 'Employee ID', type: 'text', visible: true },
    { def: 'department', label: 'Department', type: 'text', visible: true },
    { def: 'type', label: 'Leave Type', type: 'text', visible: true },
    { def: 'from', label: 'Leave From', type: 'date', visible: true },
    { def: 'leaveTo', label: 'Leave To', type: 'date', visible: true },
    { def: 'noOfDays', label: 'Number of Days', type: 'text', visible: true },
    {
      def: 'durationType',
      label: 'Duration Type',
      type: 'text',
      visible: true,
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Approved: 'badge badge-solid-green',
        Pending: 'badge badge-solid-purple',
        Rejected: 'badge badge-solid-orange',
      },
    },
    { def: 'reason', label: 'Reason', type: 'text', visible: true },
    { def: 'note', label: 'Note', type: 'text', visible: false },
    { def: 'requestedOn', label: 'Requested On', type: 'date', visible: true },
    { def: 'approvedBy', label: 'Approved By', type: 'text', visible: true },
    {
      def: 'approvalDate',
      label: 'Approval Date',
      type: 'date',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Leaves>([]);
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
    this.leavesService.getAllLeaves().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: Leaves, filter: string) =>
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

  handleEdit(row: Leaves) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Leaves) {
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

  handleBulkDelete(selectedRows: Leaves[]) {
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

  openDialog(action: 'add' | 'edit', data?: Leaves) {
    const dialogRef = this.dialog.open(LeaveRequestFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { leaves: data, action },
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
