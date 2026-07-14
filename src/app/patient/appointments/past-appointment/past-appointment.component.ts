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
import { PastAppointmentService } from './past-appointment.service';
import { PastAppointment } from './past-appointment.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { PastAppointmentDeleteComponent } from './dialogs/delete/delete.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-past-appointment',
  templateUrl: './past-appointment.component.html',
  styleUrls: ['./past-appointment.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class PastAppointmentComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  pastAppointmentService = inject(PastAppointmentService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'doctor', label: 'Doctor', type: 'nameWithImage', visible: true },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'time', label: 'Time', type: 'time', visible: true },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    { def: 'mobile', label: 'Mobile', type: 'phone', visible: true },
    { def: 'injury', label: 'Injury', type: 'text', visible: true },
    {
      def: 'appointmentType',
      label: 'Appointment Type',
      type: 'text',
      visible: true,
    },
    { def: 'status', label: 'Status', type: 'text', visible: false },
    { def: 'location', label: 'Location', type: 'text', visible: false },
    { def: 'notes', label: 'Notes', type: 'text', visible: false },
    {
      def: 'prescriptions',
      label: 'Prescriptions',
      type: 'text',
      visible: false,
    },
    {
      def: 'nextAppointment',
      label: 'Next Appointment',
      type: 'date',
      visible: true,
    },
    { def: 'createdAt', label: 'Created At', type: 'date', visible: false },
    {
      def: 'modifiedAt',
      label: 'Modified At',
      type: 'date',
      visible: false,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PastAppointment>([]);
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
    this.pastAppointmentService.getAllPastAppointments().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: PastAppointment,
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

  handleDelete(row: PastAppointment) {
    const dialogRef = this.dialog.open(PastAppointmentDeleteComponent, {
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
