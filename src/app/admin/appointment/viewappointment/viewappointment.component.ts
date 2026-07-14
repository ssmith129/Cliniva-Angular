import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ViewAppointmentFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { ViewAppointmentDeleteComponent } from './dialogs/delete/delete.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.model';
import { formatDate } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@shared/services';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class ViewappointmentComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  appointmentService = inject(AppointmentService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private localStorageService = inject(LocalStorageService);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'name', label: 'Name', type: 'nameWithImage', visible: true },
    { def: 'doctor', label: 'Doctor', type: 'text', visible: true },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'startTime', label: 'Time', type: 'time', visible: true },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    { def: 'injury', label: 'Injury', type: 'text', visible: false },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    {
      def: 'appointmentStatus',
      label: 'Appointment Status',
      type: 'text',
      visible: true,
    },
    {
      def: 'aiRisk',
      label: 'AI Risk',
      type: 'status',
      visible: true,
      tooltipField: 'aiReason',
      statusBadgeMap: {
        'Low': 'badge-solid-green',
        'Medium': 'badge-solid-orange',
        'High': 'badge-solid-red'
      }
    },
    { def: 'visitType', label: 'Visit Type', type: 'text', visible: true },
    {
      def: 'paymentStatus',
      label: 'Payment Status',
      type: 'text',
      visible: false,
    },
    {
      def: 'insuranceProvider',
      label: 'Insurance Provider',
      type: 'text',
      visible: false,
    },
    { def: 'notes', label: 'Notes', type: 'text', visible: false },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Appointment>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();
  eventDetails: Record<string, string | undefined> | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.eventDetails = params;
    });
    this.loadData(this.eventDetails?.['start']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(filterDate?: string) {
    this.isLoading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        if (filterDate) {
          const filteredData = data.filter((appointment) => {
            const appointmentDate = formatDate(
              new Date(appointment.date),
              'yyyy-MM-dd',
              'en'
            );
            const selectedDate = formatDate(
              new Date(filterDate),
              'yyyy-MM-dd',
              'en'
            );
            return appointmentDate === selectedDate;
          });
          this.dataSource.data = filteredData;
        } else {
          this.dataSource.data = data;
        }
        
        // Calculate AI Risk Levels for the loaded data
        this.calculateRiskLevels(this.dataSource.data);

        this.isLoading = false;
        this.dataSource.filterPredicate = (data: Appointment, filter: string) =>
          Object.values(data).some((value) =>
            value.toString().toLowerCase().includes(filter)
          );
      },
      error: (_err) => {
        this.isLoading = false;
      },
    });
  }

  private calculateRiskLevels(data: Appointment[]) {
    data.forEach(appointment => {
      // Simulate AI Predictive Logic
      if (appointment.visitType === 'Emergency') {
        appointment.aiRisk = 'High';
        appointment.aiReason = 'High risk due to critical condition and potential for immediate surgical requirement.';
      } else if (appointment.paymentStatus === 'Unpaid' || appointment.visitType === 'Follow-up') {
        appointment.aiRisk = 'Medium';
        appointment.aiReason = 'Moderate no-show risk based on previous unpaid status or routine nature of follow-up.';
      } else {
        appointment.aiRisk = 'Low';
        appointment.aiReason = 'Low risk based on patient history and confirmed pre-payment.';
      }
    });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: Appointment) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Appointment) {
    const dialogRef = this.dialog.open(ViewAppointmentDeleteComponent, {
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

  handleBulkDelete(selectedRows: Appointment[]) {
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

  openDialog(action: 'add' | 'edit', data?: Appointment) {
    const dialogRef = this.dialog.open(ViewAppointmentFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { appointment: data, action },
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
