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
import { AppointmentsService } from './appointments.service';
import { Appointments } from './appointments.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { DoctorAppointmentFormComponent } from './form/form.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  appointmentsService = inject(AppointmentsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'patientName', label: 'Patient Name', type: 'nameWithImage', visible: true },
    {
      def: 'appointmentDate',
      label: 'Appointment Date',
      type: 'date',
      visible: true,
    },
    { def: 'appointmentTime', label: 'Time', type: 'time', visible: true },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'status', label: 'Status', type: 'text', visible: true },
    { def: 'address', label: 'Address', type: 'address', visible: true },
    { def: 'disease', label: 'Disease', type: 'text', visible: true },
    {
      def: 'lastVisitDate',
      label: 'Last Visit Date',
      type: 'date',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Appointments>([]);
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
    this.appointmentsService.getAllAppointments().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: Appointments,
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

  handleDetails(row: Appointments) {
    this.dialog.open(DoctorAppointmentFormComponent, {
      data: {
        appointments: row,
        action: 'details',
      },
      height: '70%',
      width: '35%',
    });
  }

  handleRefresh() {
    this.loadData();
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
