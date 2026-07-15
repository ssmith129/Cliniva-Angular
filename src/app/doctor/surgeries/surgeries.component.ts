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
import { SurgeriesService } from './surgeries.service';
import { Surgery } from './surgeries.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { SurgeryFormComponent } from './dialog/form-dialog/form-dialog.component';
import { SurgeryDeleteComponent } from './dialog/delete/delete.component';

import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-surgeries',
  templateUrl: './surgeries.component.html',
  styleUrls: ['./surgeries.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true,
})
export class SurgeriesComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  surgeriesService = inject(SurgeriesService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'surgeryId', label: 'Surgery ID', type: 'text', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'procedureName', label: 'Procedure', type: 'text', visible: true },
    { def: 'surgeryDate', label: 'Date', type: 'date', visible: true },
    { def: 'surgeryTime', label: 'Time', type: 'text', visible: true },
    { def: 'surgeon', label: 'Surgeon', type: 'text', visible: true },
    { def: 'operatingRoom', label: 'Room', type: 'text', visible: true },
    {
      def: 'priority',
      label: 'Priority',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Routine: 'badge-solid-blue',
        Urgent: 'badge-solid-orange',
        Emergency: 'badge-solid-red',
        Elective: 'badge-solid-green',
      },
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Scheduled: 'badge-solid-blue',
        'In Progress': 'badge-solid-orange',
        Completed: 'badge-solid-green',
        Cancelled: 'badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Surgery>([]);
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
    this.surgeriesService.getAllSurgeries().subscribe({
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

  handleEdit(row: Surgery) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Surgery) {
    const dialogRef = this.dialog.open(SurgeryDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.surgeriesService.deleteSurgery(row.id);
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

  handleBulkDelete(selectedRows: Surgery[]) {
    selectedRows.forEach((row) => this.surgeriesService.deleteSurgery(row.id));
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: Surgery) {
    const dialogRef = this.dialog.open(SurgeryFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { surgery: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.surgeriesService.addSurgery(result);
        } else {
          this.surgeriesService.updateSurgery(result);
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
