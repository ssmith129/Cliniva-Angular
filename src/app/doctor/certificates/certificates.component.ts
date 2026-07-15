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
import { CertificatesService } from './certificates.service';
import { Certificate } from './certificates.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CertificateFormComponent } from './dialog/form-dialog/form-dialog.component';
import { CertificateDeleteComponent } from './dialog/delete/delete.component';

import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true,
})
export class CertificatesComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  certificatesService = inject(CertificatesService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    {
      def: 'certificateId',
      label: 'Certificate ID',
      type: 'text',
      visible: true,
    },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'certificateType', label: 'Type', type: 'text', visible: true },
    { def: 'issueDate', label: 'Issue Date', type: 'date', visible: true },
    { def: 'validUntil', label: 'Valid Until', type: 'date', visible: true },
    { def: 'purpose', label: 'Purpose', type: 'text', visible: true },
    { def: 'issuedBy', label: 'Issued By', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Issued: 'badge-solid-green',
        Pending: 'badge-solid-orange',
        Rejected: 'badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Certificate>([]);
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
    this.certificatesService.getAllCertificates().subscribe({
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

  handleEdit(row: Certificate) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Certificate) {
    const dialogRef = this.dialog.open(CertificateDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.certificatesService.deleteCertificate(row.id);
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

  handleBulkDelete(selectedRows: Certificate[]) {
    selectedRows.forEach((row) =>
      this.certificatesService.deleteCertificate(row.id)
    );
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: Certificate) {
    const dialogRef = this.dialog.open(CertificateFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { certificate: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.certificatesService.addCertificate(result);
        } else {
          this.certificatesService.updateCertificate(result);
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
