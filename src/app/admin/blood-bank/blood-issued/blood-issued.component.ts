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
import { BloodIssuedDeleteComponent } from './dialogs/delete/delete.component';
import { BloodIssuedFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { BloodIssued } from './blood-issued.model';
import { BloodIssuedService } from './blood-issued.service';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-blood-issued',
  templateUrl: './blood-issued.component.html',
  styleUrl: './blood-issued.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class BloodIssuedComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  bloodIssuedService = inject(BloodIssuedService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'issueId', label: 'Issue ID', type: 'text', visible: true },
    { def: 'patientId', label: 'Patient ID', type: 'text', visible: true },
    { def: 'patientName', label: 'Patient Name', type: 'nameWithImage', visible: true },
    { def: 'patientAge', label: 'Patient Age', type: 'text', visible: true },
    {
      def: 'patientGender',
      label: 'Patient Gender',
      type: 'text',
      visible: true,
    },
    {
      def: 'bloodProductId',
      label: 'Blood Product ID',
      type: 'text',
      visible: true,
    },
    { def: 'bloodType', label: 'Blood Type', type: 'text', visible: true },
    {
      def: 'componentType',
      label: 'Component Type',
      type: 'text',
      visible: true,
    },
    {
      def: 'quantityIssued',
      label: 'Quantity Issued',
      type: 'text',
      visible: true,
    },
    { def: 'issueDate', label: 'Issue Date', type: 'date', visible: true },
    { def: 'batchNumber', label: 'Batch Number', type: 'text', visible: false },
    { def: 'issuedBy', label: 'Issued By', type: 'text', visible: true },
    { def: 'issueReason', label: 'Issue Reason', type: 'text', visible: true },
    {
      def: 'patientBloodGroup',
      label: 'Patient Blood Group',
      type: 'text',
      visible: true,
    },
    { def: 'doctorId', label: 'Doctor ID', type: 'text', visible: false },
    { def: 'doctorName', label: 'Doctor Name', type: 'text', visible: true },
    {
      def: 'unitOfMeasure',
      label: 'Unit of Measure',
      type: 'text',
      visible: false,
    },
    { def: 'bloodStatus', label: 'Blood Status', type: 'text', visible: false },
    {
      def: 'bloodTransfusionDate',
      label: 'Blood Transfusion Date',
      type: 'date',
      visible: false,
    },
    { def: 'remarks', label: 'Remarks', type: 'text', visible: false },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<BloodIssued>([]);
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
    this.bloodIssuedService.getAllBloodIssued().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: BloodIssued, filter: string) =>
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

  handleEdit(row: BloodIssued) {
    this.openDialog('edit', row);
  }

  handleDelete(row: BloodIssued) {
    const dialogRef = this.dialog.open(BloodIssuedDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.issueId !== row.issueId
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

  handleBulkDelete(selectedRows: BloodIssued[]) {
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

  openDialog(action: 'add' | 'edit', data?: BloodIssued) {
    const dialogRef = this.dialog.open(BloodIssuedFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { bloodIssued: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.issueId === result.issueId
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
