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
import { ConsultationsService } from './consultations.service';
import { Consultation } from './consultations.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ConsultationFormComponent } from './dialog/form-dialog/form-dialog.component';
import { ConsultationDeleteComponent } from './dialog/delete/delete.component';

import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true
})
export class ConsultationsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  consultationsService = inject(ConsultationsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'consultationId', label: 'Consultation ID', type: 'text', visible: true },
    { def: 'patientName', label: 'Patient Name', type: 'nameWithImage', visible: true },
    { def: 'consultationDate', label: 'Date', type: 'date', visible: true },
    { def: 'consultationTime', label: 'Time', type: 'text', visible: true },
    { def: 'chiefComplaint', label: 'Complaint', type: 'text', visible: true },
    { def: 'diagnosis', label: 'Diagnosis', type: 'text', visible: true },
    { def: 'doctor', label: 'Doctor', type: 'text', visible: true },
    { def: 'status', label: 'Status', type: 'status', visible: true, statusBadgeMap: { 'Completed': 'badge-solid-green', 'In Progress': 'badge-solid-orange', 'Scheduled': 'badge-solid-blue' } },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Consultation>([]);
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
    this.consultationsService.getAllConsultations().subscribe({
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

  handleEdit(row: Consultation) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Consultation) {
    const dialogRef = this.dialog.open(ConsultationDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.consultationsService.deleteConsultation(row.id);
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

  handleBulkDelete(selectedRows: Consultation[]) {
    selectedRows.forEach(row => this.consultationsService.deleteConsultation(row.id));
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: Consultation) {
    const dialogRef = this.dialog.open(ConsultationFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { consultation: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.consultationsService.addConsultation(result);
        } else {
          this.consultationsService.updateConsultation(result);
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
