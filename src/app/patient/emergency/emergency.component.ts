import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EmergencyService } from './emergency.service';
import { EmergencyRequest } from './emergency.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { EmergencyFormComponent } from './dialog/form-dialog/form-dialog.component';
import { EmergencyDeleteComponent } from './dialog/delete/delete.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class EmergencyComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  emergencyService = inject(EmergencyService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'requestId', label: 'Request ID', type: 'text', visible: true },
    { def: 'type', label: 'Type', type: 'text', visible: true },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'time', label: 'Time', type: 'text', visible: true },
    { def: 'location', label: 'Location', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Resolved: 'badge-solid-green',
        Dispatched: 'badge-solid-blue',
        Pending: 'badge-solid-orange',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<EmergencyRequest>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRequestAmbulance() {
    this.showNotification(
      'snackbar-danger',
      'Ambulance Request Dispatched...!!!',
      'bottom',
      'center'
    );
  }

  onContactDoctor() {
    this.showNotification(
      'snackbar-info',
      'Connecting to Emergency Doctor...!!!',
      'bottom',
      'center'
    );
  }

  onViewHealthCard() {
    this.showNotification(
      'snackbar-success',
      'Digital Health Card Opened...!!!',
      'bottom',
      'center'
    );
  }

  loadData() {
    this.isLoading = true;
    this.emergencyService.getAllEmergencyRequests()
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

  handleEdit(row: EmergencyRequest) {
    this.openDialog('edit', row);
  }

  handleDelete(row: EmergencyRequest) {
    const dialogRef = this.dialog.open(EmergencyDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emergencyService.deleteEmergencyRequest(row.id);
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

  handleBulkDelete(selectedRows: EmergencyRequest[]) {
    selectedRows.forEach(row => this.emergencyService.deleteEmergencyRequest(row.id));
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: EmergencyRequest) {
    const dialogRef = this.dialog.open(EmergencyFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { request: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.emergencyService.addEmergencyRequest(result);
        } else {
          this.emergencyService.updateEmergencyRequest(result);
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
