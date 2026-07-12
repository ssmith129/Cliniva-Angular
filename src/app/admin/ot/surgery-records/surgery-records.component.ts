import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { SurgeryRecordsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { SurgeryRecordsDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { SurgeryRecordsService } from './surgery-records.service';
import { SurgeryRecord } from './surgery-records.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-surgery-records',
  templateUrl: './surgery-records.component.html',
  styleUrls: ['./surgery-records.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class SurgeryRecordsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  surgeryRecordsService = inject(SurgeryRecordsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'surgeryId', label: 'Surgery ID', type: 'text', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'surgeryType', label: 'Surgery Type', type: 'text', visible: true },
    { def: 'surgeonName', label: 'Surgeon', type: 'text', visible: true },
    { def: 'surgeryDate', label: 'Date', type: 'date', visible: true },
    { def: 'startTime', label: 'Start Time', type: 'text', visible: true },
    { def: 'endTime', label: 'End Time', type: 'text', visible: true },
    {
      def: 'outcome',
      label: 'Outcome',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Successful: 'badge badge-solid-green',
        Complicated: 'badge badge-solid-orange',
        Failed: 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<SurgeryRecord>([]);
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
    this.surgeryRecordsService.getAllSurgeryRecords().subscribe({
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

  handleEdit(row: SurgeryRecord) {
    this.openDialog('edit', row);
  }

  handleDelete(row: SurgeryRecord) {
    const dialogRef = this.dialog.open(SurgeryRecordsDeleteComponent, {
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

  handleBulkDelete(selectedRows: SurgeryRecord[]) {
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

  openDialog(action: 'add' | 'edit', data?: SurgeryRecord) {
    const dialogRef = this.dialog.open(SurgeryRecordsFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { surgeryRecord: data, action },
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
