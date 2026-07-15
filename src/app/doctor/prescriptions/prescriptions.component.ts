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
import { PrescriptionsService } from './prescriptions.service';
import { Prescription } from './prescriptions.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { PrescriptionFormComponent } from './dialog/form-dialog/form-dialog.component';
import { PrescriptionDeleteComponent } from './dialog/delete/delete.component';

import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true,
})
export class PrescriptionsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  prescriptionsService = inject(PrescriptionsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    {
      def: 'prescriptionId',
      label: 'Prescription ID',
      type: 'text',
      visible: true,
    },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'medications', label: 'Medications', type: 'text', visible: true },
    {
      def: 'prescriptionDate',
      label: 'Date',
      type: 'date',
      visible: true,
    },
    { def: 'dosage', label: 'Dosage', type: 'text', visible: true },
    { def: 'frequency', label: 'Frequency', type: 'text', visible: true },
    { def: 'duration', label: 'Duration', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge-solid-green',
        Completed: 'badge-solid-blue',
        Cancelled: 'badge-solid-red',
      },
    },
    { def: 'doctor', label: 'Doctor', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Prescription>([]);
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
    this.prescriptionsService.getAllPrescriptions().subscribe({
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

  handleEdit(row: Prescription) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Prescription) {
    const dialogRef = this.dialog.open(PrescriptionDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.prescriptionsService.deletePrescription(row.id);
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

  handleBulkDelete(selectedRows: Prescription[]) {
    selectedRows.forEach((row) =>
      this.prescriptionsService.deletePrescription(row.id)
    );
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: Prescription) {
    const dialogRef = this.dialog.open(PrescriptionFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { prescription: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.prescriptionsService.addPrescription(result);
        } else {
          this.prescriptionsService.updatePrescription(result);
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
