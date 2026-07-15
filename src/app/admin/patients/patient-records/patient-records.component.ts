import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AllPatientDeleteComponent } from './dialog/delete/delete.component';
import { AllPatientFormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { PatientRecords } from './patient-records.model';
import { PatientRecordsService } from './patient-records.service';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-records-records',
  templateUrl: './patient-records.component.html',
  styleUrl: './patient-records.component.scss',
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class PatientRecordsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  patientRecordsService = inject(PatientRecordsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'patientId', label: 'Patient ID', type: 'text', visible: true },
    {
      def: 'fullName',
      label: 'Full Name',
      type: 'nameWithImage',
      visible: true,
    },
    {
      def: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      visible: false,
    },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    {
      def: 'dateOfAdmission',
      label: 'Date of Admission',
      type: 'date',
      visible: true,
    },
    { def: 'diagnosis', label: 'Diagnosis', type: 'text', visible: true },
    { def: 'labReports', label: 'Lab Reports', type: 'file', visible: true },
    {
      def: 'treatmentPlan',
      label: 'Treatment Plan',
      type: 'text',
      visible: false,
    },
    { def: 'medications', label: 'Medications', type: 'file', visible: true },
    {
      def: 'medicationHistory',
      label: 'Medication History',
      type: 'text',
      visible: false,
    },
    {
      def: 'nextFollowUp',
      label: 'Next Follow-Up',
      type: 'date',
      visible: true,
    },
    {
      def: 'doctorsNotes',
      label: "Doctor's Notes",
      type: 'text',
      visible: false,
    },
    { def: 'status', label: 'Status', type: 'text', visible: true },
    {
      def: 'emergencyContact',
      label: 'Emergency Contact',
      type: 'phone',
      visible: false,
    },
    {
      def: 'insuranceProvider',
      label: 'Insurance Provider',
      type: 'text',
      visible: false,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PatientRecords>([]);
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
        this.dataSource.filterPredicate = (
          data: PatientRecords,
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

  handleEdit(row: PatientRecords) {
    this.openDialog('edit', row);
  }

  handleDelete(row: PatientRecords) {
    const dialogRef = this.dialog.open(AllPatientDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.patientId !== row.patientId
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

  handleBulkDelete(selectedRows: PatientRecords[]) {
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

  openDialog(action: 'add' | 'edit', data?: PatientRecords) {
    const dialogRef = this.dialog.open(AllPatientFormDialogComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { patientRecords: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.patientId === result.patientId
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
