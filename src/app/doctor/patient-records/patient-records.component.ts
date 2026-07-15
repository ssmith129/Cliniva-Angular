import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PatientRecordsService } from './patient-records.service';
import { PatientRecord } from './patient-records.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { PatientRecordFormComponent } from './dialog/form-dialog/form-dialog.component';
import { PatientRecordDeleteComponent } from './dialog/delete/delete.component';

import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true,
})
export class PatientRecordsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  patientRecordsService = inject(PatientRecordsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'patientId', label: 'Patient ID', type: 'text', visible: true },
    {
      def: 'name',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    { def: 'age', label: 'Age', type: 'text', visible: true },
    { def: 'bloodGroup', label: 'Blood Group', type: 'text', visible: true },
    { def: 'city', label: 'City', type: 'text', visible: true },
    {
      def: 'registrationDate',
      label: 'Registration Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'lastVisitDate',
      label: 'Last Visit',
      type: 'date',
      visible: true,
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge-solid-green',
        Inactive: 'badge-solid-red',
        Critical: 'badge-solid-orange',
      },
    },
    { def: 'totalVisits', label: 'Total Visit', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PatientRecord>([]);
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
    this.patientRecordsService.getAllPatientRecords().subscribe({
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

  handleEdit(row: PatientRecord) {
    this.openDialog('edit', row);
  }

  handleDelete(row: PatientRecord) {
    const dialogRef = this.dialog.open(PatientRecordDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.patientRecordsService.deletePatientRecord(row.id);
        this.loadData();
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

  handleBulkDelete(selectedRows: PatientRecord[]) {
    selectedRows.forEach((row) =>
      this.patientRecordsService.deletePatientRecord(row.id)
    );
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: PatientRecord) {
    const dialogRef = this.dialog.open(PatientRecordFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { patientRecord: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.patientRecordsService.addPatientRecord(result);
        } else {
          this.patientRecordsService.updatePatientRecord(result);
        }
        this.loadData();
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
