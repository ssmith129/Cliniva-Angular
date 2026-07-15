import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { PatientDocument } from './patient-documents.model';
import { PatientDocumentsService } from './patient-documents.service';
import { PatientDocumentsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { PatientDocumentsDeleteComponent } from './dialogs/delete/delete.component';

import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-documents',
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
  templateUrl: './patient-documents.component.html',
  styleUrl: './patient-documents.component.scss',
})
export class PatientDocumentsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private patientDocumentsService = inject(PatientDocumentsService);

  breadscrums = [
    {
      title: 'Patient Documents',
      items: ['EMR'],
      active: 'Patient Documents',
    },
  ];

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'docId', label: 'Document ID', type: 'text', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    {
      def: 'docType',
      label: 'Document Type',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        'Lab Report': 'badge badge-solid-blue',
        'X-Ray': 'badge badge-solid-purple',
        'MRI Scan': 'badge badge-solid-cyan',
        'CT Scan': 'badge badge-solid-orange',
        'Discharge Summary': 'badge badge-solid-green',
        Prescription: 'badge badge-solid-pink',
        'Consent Form': 'badge badge-solid-brown',
        'Blood Test': 'badge badge-solid-red',
        'ECG Report': 'badge badge-solid-red',
        'Physical Therapy Notes': 'badge badge-solid-green',
      },
    },
    { def: 'uploadedBy', label: 'Uploaded By', type: 'text', visible: true },
    { def: 'uploadDate', label: 'Upload Date', type: 'date', visible: true },
    { def: 'fileSize', label: 'File Size', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Uploaded: 'badge badge-solid-blue',
        Verified: 'badge badge-solid-green',
        Pending: 'badge badge-solid-orange',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PatientDocument>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.patientDocumentsService.getAllPatientDocuments().subscribe({
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

  handleEdit(row: PatientDocument) {
    this.openDialog('edit', row);
  }

  handleRefresh() {
    this.loadData();
  }

  openDialog(action: 'add' | 'edit', data?: PatientDocument) {
    const dialogRef = this.dialog.open(PatientDocumentsFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { patientDocument: data, action },
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

  handleDelete(row: PatientDocument) {
    const dialogRef = this.dialog.open(PatientDocumentsDeleteComponent, {
      width: '400px',
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

  showNotification(
    colorName: string,
    text: string,
    placementFrom: 'top' | 'bottom',
    placementAlign: 'start' | 'center' | 'end'
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
