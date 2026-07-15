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
import { PatientService } from './patient.service';
import { Patient } from './patient.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AllPatientDeleteComponent } from './dialog/delete/delete.component';
import { AllPatientFormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-allpatients',
  templateUrl: './allpatients.component.html',
  styleUrls: ['./allpatients.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class AllpatientsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  patientService = inject(PatientService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'name', label: 'Name', type: 'nameWithImage', visible: true },
    { def: 'treatment', label: 'Treatment', type: 'text', visible: true },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    {
      def: 'admissionDate',
      label: 'Admission Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'doctorAssigned',
      label: 'Doctor Assigned',
      type: 'text',
      visible: true,
    },
    { def: 'address', label: 'Address', type: 'address', visible: true },
    { def: 'bGroup', label: 'Blood Group', type: 'text', visible: true },
    { def: 'age', label: 'Age', type: 'text', visible: false },
    { def: 'email', label: 'Email', type: 'email', visible: false },
    {
      def: 'dischargeDate',
      label: 'Discharge Date',
      type: 'date',
      visible: true,
    },
    { def: 'status', label: 'Status', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Patient>([]);
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
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: Patient, filter: string) =>
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

  handleEdit(row: Patient) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Patient) {
    const dialogRef = this.dialog.open(AllPatientDeleteComponent, {
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

  handleBulkDelete(selectedRows: Patient[]) {
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

  openDialog(action: 'add' | 'edit', data?: Patient) {
    const dialogRef = this.dialog.open(AllPatientFormDialogComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { patient: data, action },
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
