import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TelemedicineService } from './telemedicine.service';
import { TelemedicineSession } from './telemedicine.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { TelemedicineFormComponent } from './dialog/form-dialog/form-dialog.component';
import { TelemedicineDeleteComponent } from './dialog/delete/delete.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-telemedicine',
  templateUrl: './telemedicine.component.html',
  styleUrls: ['./telemedicine.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class TelemedicineComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  telemedicineService = inject(TelemedicineService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'doctorName', label: 'Doctor', type: 'nameWithImage', visible: true },
    { def: 'specialty', label: 'Specialty', type: 'text', visible: true },
    { def: 'scheduledDate', label: 'Date', type: 'date', visible: true },
    { def: 'scheduledTime', label: 'Time', type: 'text', visible: true },
    { def: 'consultationType', label: 'Type', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Scheduled: 'badge-solid-blue',
        Completed: 'badge-solid-green',
        Cancelled: 'badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<TelemedicineSession>([]);
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
    this.telemedicineService.getAllSessions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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

  handleEdit(row: TelemedicineSession) {
    this.openDialog('edit', row);
  }

  handleDelete(row: TelemedicineSession) {
    const dialogRef = this.dialog.open(TelemedicineDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.telemedicineService.deleteSession(row.id);
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

  handleBulkDelete(selectedRows: TelemedicineSession[]) {
    selectedRows.forEach(row => this.telemedicineService.deleteSession(row.id));
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: TelemedicineSession) {
    const dialogRef = this.dialog.open(TelemedicineFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { session: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.telemedicineService.addSession(result);
        } else {
          this.telemedicineService.updateSession(result);
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
