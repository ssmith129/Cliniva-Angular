import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { OTSchedulingFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { OTSchedulingDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { OTSchedulingService } from './scheduling.service';
import { OTSchedule } from './scheduling.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ot-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class OTSchedulingComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  otSchedulingService = inject(OTSchedulingService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'scheduleId', label: 'Schedule ID', type: 'text', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'surgeryType', label: 'Surgery Type', type: 'text', visible: true },
    { def: 'surgeonName', label: 'Surgeon', type: 'text', visible: true },
    { def: 'otRoom', label: 'OT Room', type: 'text', visible: true },
    { def: 'scheduledDate', label: 'Date', type: 'date', visible: true },
    { def: 'scheduledTime', label: 'Time', type: 'text', visible: true },
    { def: 'duration', label: 'Duration', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Scheduled: 'badge badge-solid-blue',
        'In Progress': 'badge badge-solid-orange',
        Completed: 'badge badge-solid-green',
        Cancelled: 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<OTSchedule>([]);
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
    this.otSchedulingService.getAllOTSchedules().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (_err) => {
        this.isLoading = false;
      },
    });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: OTSchedule) {
    this.openDialog('edit', row);
  }

  handleDelete(row: OTSchedule) {
    const dialogRef = this.dialog.open(OTSchedulingDeleteComponent, {
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

  openDialog(action: 'add' | 'edit', data?: OTSchedule) {
    const dialogRef = this.dialog.open(OTSchedulingFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { otSchedule: data, action },
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

  handleBulkDelete(selectedRows: OTSchedule[]) {
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
